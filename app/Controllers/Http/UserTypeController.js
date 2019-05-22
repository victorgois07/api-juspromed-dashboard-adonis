'use strict'

const UserType = use('App/Models/UserType')

class UserTypeController {
  async index ({ request, response, view }) {
    try {
      return await UserType.all()
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }
  async create ({ request, response, view }) {}

  async store ({ request, response }) {
    try {
      const data = request.all()
      const usertype = await UserType.create(data)
      return response.status(200).send(usertype)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  /**
   * Display a single usertype.
   * GET usertypes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing usertype.
   * GET usertypes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update usertype details.
   * PUT or PATCH usertypes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a usertype with id.
   * DELETE usertypes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = UserTypeController
