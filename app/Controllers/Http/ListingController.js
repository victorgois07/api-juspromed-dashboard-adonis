'use strict'

const Env = use('Env')
const req = require('request')
const config = use('App/Require')
const { paginator } = use('App/Helpers')
const moment = require('moment')

class ListingController {
  constructor () {
    this.baseurl = 'subscriptions'
  }

  async listClient ({ request }) {
    return new Promise(async (resolve, reject) => {
      const params = request.all()
      req(
        {
          method: 'GET',
          url: `${Env.get(
            'BASEURL'
          )}/customers?page=1&sort_by=created_at&sort_order=desc`,
          headers: config.header
        },
        (error, response, body) => {
          if (error) throw new Error(error)
          const customers = JSON.parse(body).customers
          const promise = new Promise(async (resolve, reject) => {
            let list = []
            let i = 0
            customers.map(async client => {
              req(
                {
                  method: 'GET',
                  url: `${Env.get(
                    'BASEURL'
                  )}/bills?page=1&per_page=1&query=customer_id:${
                    client.id
                  }&sort_by=created_at&sort_order=desc`,
                  headers: config.header
                },
                (err, resp, value) => {
                  if (err) throw new Error(err)
                  const bills = JSON.parse(value).bills
                  let listclient = {}
                  listclient.id = client.id
                  listclient.username = client.email
                  listclient.name = client.name
                  listclient.status = client.status
                  listclient.vendedor = null
                  listclient.plano = bills[0].subscription.plan.name
                  listclient.valor = bills[0].charges[0].amount
                  listclient.ultima =
                    bills[0].charges[0].last_transaction.created_at
                  list.push(listclient)
                  if (i === (customers.length - 1)) {
                    resolve(
                      paginator(list, params.filter.page || 1, params.filter.limit || 10)
                    )
                  }
                  i++
                }
              )
            })
          })
          resolve(promise)
        }
      )
    })
  }

  async chargesState () {
    return new Promise(async (resolve, reject) => {
      req(
        {
          method: 'GET',
          url: `${Env.get(
            'BASEURL'
          )}/subscriptions?page=1&query=status%3A%22active%22&sort_by=created_at&sort_order=desc`,
          headers: config.header
        },
        (error, response, body) => {
          if (error) throw new Error(error)
          const client = JSON.parse(body).subscriptions
          let list = []
          let i = 0
          client.map(async data => {
            req(
              {
                method: 'GET',
                url: `${Env.get('BASEURL')}/customers/${data.customer.id}`,
                headers: config.header
              },
              (error, response, body) => {
                if (error) throw new Error(error)
                const customer = JSON.parse(body).customer
                list.push(customer.address.state)
                i++
                if (i === client.length - 1) resolve(this.count(list))
              }
            )
          })
        }
      )
    })
  }

  // eslint-disable-next-line camelcase
  async count (array_elements) {
    return new Promise(async (resolve, reject) => {
      let counts = {}
      array_elements.forEach(x => {
        counts[x] = (counts[x] || 0) + 1
      })
      resolve(counts)
    })
  }

  async countactive () {
    return new Promise(async (resolve, reject) => {
      let options = {
        method: 'GET',
        url: `${Env.get('BASEURL')}/customers`,
        headers: config.header
      }
      req(options, (error, response, body) => {
        if (error) throw new Error(error)
        const client = JSON.parse(body).customers
        let active = 0
        let inactive = 0
        client.map(async data => {
          if (data.status === 'inactive') {
            inactive++
          } else {
            active++
          }
        })
        resolve({ active: active, inactive: inactive })
      })
    })
  }

  async totPaid () {
    return new Promise(async (resolve, reject) => {
      let options = {
        method: 'GET',
        url: `${Env.get('BASEURL')}/bills`,
        headers: config.header
      }
      req(options, (error, response, body) => {
        if (error) throw new Error(error)
        const client = JSON.parse(body).bills
        let paid = 0
        let pending = 0
        let total = 0
        client.map(async data => {
          let a = moment(data.charges[0].due_at)
          let b = moment()
          if (data.charges[0].status !== 'paid' && a.diff(b, 'days') < 0) {
            pending++
          } else {
            total += parseFloat(data.amount)
            paid++
          }
        })
        resolve({ pago: paid, pedente: pending, total: total })
      })
    })
  }
}

module.exports = ListingController
