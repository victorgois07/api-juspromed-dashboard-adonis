'use strict'

const Env = use('Env')
const req = require('request')
const config = use('App/Require')
const { paginator } = use('App/Helpers')

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
          url: `${Env.get('BASEURL')}/${this.baseurl}?sort_by=${params.filter
            .sort_by || 'created_at'}&sort_order=${params.filter.sort_order ||
            'desc'}`,
          headers: config.header
        },
        (error, response, body) => {
          if (error) throw new Error(error)
          const client = JSON.parse(body).subscriptions
          let list = []
          client.map(async data => {
            let listclient = {}
            listclient.id = data.customer.id
            listclient.username = data.customer.email
            listclient.name = data.customer.name
            listclient.vendedor = null
            listclient.plano = data.plan.name
            listclient.valor =
              data.product_items[0].pricing_schema.short_format
            listclient.ultima = data.product_items[0].pricing_schema.created_at
            list.push(listclient)
          })
          resolve(
            paginator(list, params.filter.page || 1, params.filter.limit || 10)
          )
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
        const client = (JSON.parse(body)).customers
        let active = 0
        let inactive = 0
        client.map(async (data) => {
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
}

module.exports = ListingController
