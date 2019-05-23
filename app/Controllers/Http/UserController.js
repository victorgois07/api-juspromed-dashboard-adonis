'use strict'

const User = use('App/Models/User')

class UserController {
  async index ({ response }) {
    try {
      return await User.all()
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async store ({ request, response }) {
    try {
      const data = request.all()
      return await User.create(data)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async show ({ params, response }) {
    try {
      return await User.find(params.id)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async update ({ params, request, response }) {
    try {
      const { email, password, username } = request.all()
      const user = await User.findBy('id', params.id)
      if (password === '' || password === null) {
        user.merge({ email: email, username: username })
        user.save()
        return user
      }
      user.merge({ email: email, username: username, password: password })
      user.save()
      return response.status(200).send(user)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async destroy ({ params, response }) {
    try {
      const user = await User.find(params.id)
      return user.delete()
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }
}

module.exports = UserController
