'use strict'

const Env = use('Env')
const req = require('request')

class ClientController {
  constructor () {
    this.header = {
      'cache-control': 'no-cache',
      Connection: 'keep-alive',
      'accept-encoding': 'gzip, deflate',
      Host: Env.get('HOSTVINDIAPI'),
      'Postman-Token':
        'd17cf374-4d15-49d2-b67e-8b283a14eebf,eb33579c-ca55-4d3c-96b2-6ca60a91d52e',
      'Cache-Control': 'no-cache',
      Accept: '*/*',
      'User-Agent': 'PostmanRuntime/7.13.0',
      Authorization: `Basic ${
        Env.get('NODE_ENV') === 'development'
          ? Env.get('TOKEN_HOMOLOGACAO_VINDI')
          : Env.get('TOKEN_PRODUCAO_VINDI')
      }`
    }
  }

  async index ({ request, response, view }) {
    return new Promise(async (resolve, reject) => {
      const filter = request.all()
      let options = {
        method: 'GET',
        url: `${Env.get('BASEURL')}/customers`,
        headers: this.header
      }
      if (filter.filter) {
        options.qs = {
          query: filter.filter.query,
          sort_by: 'created_at',
          sort_order: 'desc'
        }
      } else {
        options.qs = { sort_by: 'created_at', sort_order: 'desc' }
      }
      req(options, (error, response, body) => {
        if (error) throw new Error(error)
        resolve(JSON.parse(body))
      })
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
