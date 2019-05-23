'use strict'

const State = use('App/Models/State')

class StateController {
  async index ({ response }) {
    try {
      return await State.all()
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async store ({ request, response }) {
    try {
      const data = request.all()
      return await State.create(data)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async show ({ params, response }) {
    try {
      return await State.find(params.id)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async update ({ params, request, response }) {
    try {
      const data = request.all()
      const state = await State.find(params.id)
      state.merge(data)
      state.save()
      return response.status(200).send(state)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async destroy ({ params, response }) {
    try {
      const state = await State.find(params.id)
      return state.delete()
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }
}

module.exports = StateController
