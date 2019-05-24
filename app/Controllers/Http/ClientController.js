'use strict'

const axios = require('axios')
const Env = use('Env')
const req = require('request')

class ClientController {
  constructor () {
    this.req = axios.create({
      baseURL: Env.get('BASEURL'),
      headers: {
        Authorization: `Basic ${
          Env.get('NODE_ENV') === 'development'
            ? Env.get('TOKEN_HOMOLOGACAO_VINDI')
            : Env.get('TOKEN_PRODUCAO_VINDI')
        }`,
        'Content-Type': 'application/json'
      }
    })
  }

  async index ({ request, response, view }) {
    return new Promise(async (resolve, reject) => {
      const filter = request.all()
      if (filter.filter) {
        this.req
          .get(
            `/customers?query=${
              filter.filter.query
            }&sort_by=created_at&sort_order=desc`
          )
          .then(async data => {
            resolve(data.data.customers)
          })
          .catch(error => {
            reject(error)
          })
      } else {
        const options = { method: 'GET',
          url: 'https://sandbox-app.vindi.com.br:443/api/v1/customers',
          qs: { sort_by: 'created_at', sort_order: 'desc' },
          headers:
            { 'cache-control': 'no-cache',
              Connection: 'keep-alive',
              'accept-encoding': 'gzip, deflate',
              Host: 'sandbox-app.vindi.com.br:443',
              'Postman-Token': 'd17cf374-4d15-49d2-b67e-8b283a14eebf,eb33579c-ca55-4d3c-96b2-6ca60a91d52e',
              'Cache-Control': 'no-cache',
              Accept: '*/*',
              'User-Agent': 'PostmanRuntime/7.13.0',
              Authorization: 'Basic X3hROHFjbkRHMy1JNE1aZXZaRjJMSmpJNGh1NUZOTkNhV2x0OWp6amlLazo=' } }

        req(options, function (error, response, body) {
          if (error) throw new Error(error)
          console.log(body)
          resolve(JSON.parse(body))
        })

        /* this.req
          .get('/customers?sort_by=created_at&sort_order=desc')
          .then(async data => {
            resolve(CircularJSON.stringify(data.data.customers))
          })
          .catch(error => {
            reject(error)
          }) */
      }
    })
  }

  async create ({ request, response, view }) {}

  async store ({ request, response }) {}

  async show ({ params, request, response, view }) {}

  async edit ({ params, request, response, view }) {}

  async update ({ params, request, response }) {}

  async destroy ({ params, request, response }) {}
}

module.exports = ClientController
