'use strict'

const axios = require('axios')
const Env = use('Env')

class ClientController {
  constructor () {
    this.req = axios.create({
      baseURL: 'https://sandbox-app.vindi.com.br:443/api/v1',
      headers: {
        'Authorization': `Basic ${Env.get('NODE_ENV') === 'development' ? Env.get('TOKEN_HOMOLOGACAO_VINDI') : Env.get('TOKEN_PRODUCAO_VINDI')}`,
        'Content-Type': 'application/json'
      }
    })
  }

  async index ({ request, response, view }) {
    return new Promise(async (resolve, reject) => {
      const filter = request.all()
      console.log(filter)
      // if(filter.filter){
      //   this.req.get(`/customers?query=${filter.filter.query}&sort_by=created_at&sort_order=desc`).then(async (data) => {
      //     resolve(data.data.customers)
      //   }).catch((error) => {
      //     reject(error)
      //   })
      // } else {
      //   this.req.get('/customers?sort_by=created_at&sort_order=desc').then(async (data) => {
      //     console.log('CHEGOU')
      //     console.log(data.data)
      //     resolve(data.data.customers)
      //   }).catch((error) => {
      //     reject(error)
      //   })
      // }
    })
  }

  async create ({ request, response, view }) {
  }

  async store ({ request, response }) {
  }

  async show ({ params, request, response, view }) {
  }

  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = ClientController
