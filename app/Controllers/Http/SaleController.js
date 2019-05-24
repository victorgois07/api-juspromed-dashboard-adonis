'use strict'

const Sale = use('App/Models/Sale')

class SaleController {
  async index ({ response }) {
    try {
      return await Sale.all()
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async store ({ request, response }) {
    try {
      const data = request.all()
      return await Sale.create(data)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async show ({ params, response }) {
    try {
      return await Sale.find(params.id)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async update ({ params, request, response }) {
    try {
      const data = request.all()
      const sale = await Sale.find(params.id)
      sale.merge(data)
      sale.save()
      return response.status(200).send(sale)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async destroy ({ params, response }) {
    try {
      const sale = await Sale.find(params.id)
      return sale.delete()
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }
}

module.exports = SaleController
