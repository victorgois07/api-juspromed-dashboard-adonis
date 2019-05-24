'use strict'

const Env = use('Env')
const req = require('request')
const config = use('App/Require')

class ProductController {
  constructor () {
    this.baseurl = 'products'
  }

  async index ({ request }) {
    return new Promise(async (resolve, reject) => {
      const filter = request.all()
      let options = {
        method: 'GET',
        url: `${Env.get('BASEURL')}/${this.baseurl}`,
        headers: config.header
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
}

module.exports = ProductController
