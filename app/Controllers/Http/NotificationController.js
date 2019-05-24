'use strict'

const Env = use('Env')
const req = require('request')

class NotificationController {
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
      Authorization: `Basic ${Env.get('TOKEN_HOMOLOGACAO_VINDI')}`
    }
  }

  async index ({ request, response, view }) {
    return new Promise(async (resolve, reject) => {
      const filter = request.all()
      let options = {
        method: 'GET',
        url: `${Env.get('BASEURL')}/notifications`,
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

  /**
   * Render a form to be used for creating a new notification.
   * GET notifications/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new notification.
   * POST notifications
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single notification.
   * GET notifications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing notification.
   * GET notifications/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update notification details.
   * PUT or PATCH notifications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a notification with id.
   * DELETE notifications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = NotificationController
