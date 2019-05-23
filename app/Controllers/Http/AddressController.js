'use strict'

const Address = use('App/Models/Address')
// eslint-disable-next-line camelcase
const { endpoint_filter } = use('App/Helpers')

class AddressController {
  async index ({ response, request }) {
    try {
      const req = request.all()
      return req.filter ? endpoint_filter(req.filter, 'addresses', 'id') : await Address.all()
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async store ({ request, response }) {
    try {
      const data = request.all()
      return await Address.create(data)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async show ({ params, response }) {
    try {
      return await Address.query()
        .where('id', params.id)
        .with('address_city')
        .fetch()
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async update ({ params, request, response }) {
    try {
      const data = request.all()
      const address = await Address.find(params.id)
      address.merge(data)
      address.save()
      return response.status(200).send(address)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async destroy ({ params, response }) {
    try {
      const address = await Address.find(params.id)
      return address.delete()
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }
}

module.exports = AddressController
