'use strict'

const axios = require('axios')
const Env = use('Env')

class NotificationController {
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
      if(filter.filter){
        this.req.get(`/notifications?query=${filter.filter.query}&sort_by=created_at&sort_order=desc`).then(async (data) => {
          resolve(data.data.notifications)
        }).catch((error) => {
          reject(error)
        })
      } else {
        this.req.get('/notifications?sort_by=created_at&sort_order=desc').then(async (data) => {
          resolve(data.data.notifications)
        }).catch((error) => {
          reject(error)
        })
      }
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
