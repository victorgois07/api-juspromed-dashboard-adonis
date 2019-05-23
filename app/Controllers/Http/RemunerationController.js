'use strict'

const Renuneration = use('App/Models/Renuneration')

class RemunerationController {
  async index ({ response }) {
    try {
      return await Renuneration.all()
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async store ({ request, response }) {
    try {
      const data = request.all()
      return await Renuneration.create(data)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async show ({ params, response }) {
    try {
      return await Renuneration.find(params.id)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async update ({ params, request, response }) {
    try {
      const data = request.all()
      const renuneration = await Renuneration.find(params.id)
      renuneration.merge(data)
      renuneration.save()
      return response.status(200).send(renuneration)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async destroy ({ params, response }) {
    try {
      const renuneration = await Renuneration.find(params.id)
      return renuneration.delete()
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }
}

module.exports = RemunerationController
