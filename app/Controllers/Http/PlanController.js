'use strict'

const axios = require('axios')
const Env = use('Env')

class PlanController {
  constructor () {
    this.req = axios.create({
      baseURL: 'https://sandbox-app.vindi.com.br:443/api/v1',
      headers: {
        'Authorization': `Basic ${Env.get('NODE_ENV') === 'development' ? Env.get('TOKEN_HOMOLOGACAO_VINDI') : Env.get('TOKEN_PRODUCAO_VINDI')}`,
        'Content-Type': 'application/json'
      }
    })
  }

  async index ({ response }) {
    return new Promise(async (resolve, reject) => {
      const filter = request.all()
      if(filter.filter){
        this.req.get(`/plans?query=${filter.filter.query}&sort_by=created_at&sort_order=desc`).then(async (data) => {
          resolve(data.data.plans)
        }).catch((error) => {
          reject(error)
        })
      } else {
        this.req.get('/plans?sort_by=created_at&sort_order=desc').then(async (data) => {
          resolve(data.data.plans)
        }).catch((error) => {
          reject(error)
        })
      }
    })
  }

  async store ({ request, response }) {}

  async show ({ params, response }) {}

  async update ({ params, request, response }) {}

  async destroy ({ params, response }) {}
}

module.exports = PlanController
