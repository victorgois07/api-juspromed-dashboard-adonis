'use strict'

const User = use('App/Models/User')
const City = use('App/Models/City')
const State = use('App/Models/State')
const UserType = use('App/Models/UserType')

class UserController {
  async index ({ response }) {
    try {
      return await User.all()
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async create ({ request, response, view }) {}

  async store ({ request, response }) {
    try {
      const data = request.all()

      let state = null
      let city = null

      if (data.address || data.address !== null) {
        state = (await State.create({ description: data.address.state, country: data.address.country })).toJSON()
        city = (await City.create({ state_id: state.id, description: data.address.city })).toJSON()
      }

      const userType = (await UserType.create({ description: data.usertype.description })).toJSON()

      data.user.city_id = city.id
      data.user.state_id = state.id
      data.user.user_type_id = userType.id

      const user = await User.create(data.user)

      return response.status(200).send({ user: user, state: state, city: city, userType: userType })
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async show ({ params, request, response, view }) {
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

  async destroy ({ params, request, response }) {
    try {
      const user = await User.findBy('id', params.id)
      user.delete()
      return response.status(200).send(user)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }
}

module.exports = UserController
