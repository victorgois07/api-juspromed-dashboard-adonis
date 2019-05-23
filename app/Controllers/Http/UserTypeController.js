'use strict'

const UserType = use('App/Models/UserType')

class UserTypeController {
  async index ({ response }) {
    try {
      return await UserType.all()
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async store ({ request, response }) {
    try {
      const data = request.all()
      return await UserType.create(data)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async show ({ params, response }) {
    try {
      return await UserType.find(params.id)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async update ({ params, request, response }) {
    try {
      const data = request.all()
      const usertype = await UserType.find(params.id)
      usertype.merge(data)
      usertype.save()
      return response.status(200).send(usertype)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async destroy ({ params, response }) {
    try {
      const usertype = await UserType.find(params.id)
      return usertype.delete()
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }
}

module.exports = UserTypeController
