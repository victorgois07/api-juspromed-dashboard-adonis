'use strict'

const Env = use('Env')
const req = require('request')
const config = use('App/Require')

class ClientController {
  constructor () {
    this.baseurl = 'customers'
  }

  async index ({ request }) {
    return new Promise(async (resolve, reject) => {
      const filter = request.all()
      let options = {
        method: 'GET',
        url: `${Env.get('BASEURL')}/${this.baseurl}?page=${filter.filter.page ||
          1}&per_page=${filter.filter.limit || 10}&sort_by=${filter.filter
          .sort_by || 'created_at'}&sort_order=${filter.filter.sort_order ||
          'desc'}`,
        headers: config.header
      }
      if (filter.filter) {
        options.qs = {
          query: filter.filter.query
        }
      }
      req(options, (error, response, body) => {
        if (error) throw new Error(error)
        resolve(JSON.parse(body))
      })
    })
  }

  async store ({ request }) {
    return new Promise(async (resolve, reject) => {
      config.header['Content-Type'] = 'application/json'
      const data = request.all()
      let options = {
        method: 'POST',
        url: `${Env.get('BASEURL')}/${this.baseurl}`,
        headers: config.header,
        body: JSON.stringify(data)
      }
      req(options, (error, response, body) => {
        if (error) throw new Error(error)
        resolve(JSON.parse(body))
      })
    })
  }

  async show ({ params }) {
    return new Promise(async (resolve, reject) => {
      let options = {
        method: 'GET',
        url: `${Env.get('BASEURL')}/${this.baseurl}/${params.id}`,
        headers: config.header
      }
      req(options, (error, response, body) => {
        if (error) throw new Error(error)
        resolve(JSON.parse(body))
      })
    })
  }

  async update ({ params, request }) {
    return new Promise(async (resolve, reject) => {
      config.header['Content-Type'] = 'application/json'
      const data = request.all()
      let options = {
        method: 'PUT',
        url: `${Env.get('BASEURL')}/${this.baseurl}/${params.id}`,
        headers: config.header,
        body: JSON.stringify(data)
      }
      req(options, (error, response, body) => {
        if (error) throw new Error(error)
        resolve(JSON.parse(body))
      })
    })
  }

  async destroy ({ params }) {
    return new Promise(async (resolve, reject) => {
      config.header['Content-Type'] = 'application/json'
      let options = {
        method: 'DELETE',
        url: `${Env.get('BASEURL')}/${this.baseurl}/${params.id}`,
        headers: config.header
      }
      req(options, (error, response, body) => {
        if (error) throw new Error(error)
        resolve(JSON.parse(body))
      })
    })
  }
}

module.exports = ClientController
