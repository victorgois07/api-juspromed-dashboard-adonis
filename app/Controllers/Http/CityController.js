'use strict'

const City = use('App/Models/City')

class CityController {
  async index ({ response }) {
    try {
      return await City.all()
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async store ({ request, response }) {
    try {
      const data = request.all()
      return await City.create(data)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async show ({ params, response }) {
    try {
      return await City.find(params.id)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async update ({ params, request, response }) {
    try {
      const data = request.all()
      const city = await City.find(params.id)
      city.merge(data)
      city.save()
      return response.status(200).send(city)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async destroy ({ params, response }) {
    try {
      const city = await City.find(params.id)
      return city.delete()
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }
}

module.exports = CityController
