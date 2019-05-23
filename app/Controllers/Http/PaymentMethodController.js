'use strict'

const PaymentMethod = use('App/Models/PaymentMethod')

class PaymentMethodController {
  async index ({ response }) {
    try {
      return await PaymentMethod.all()
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async store ({ request, response }) {
    try {
      const data = request.all()
      return await PaymentMethod.create(data)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async show ({ params, response }) {
    try {
      return await PaymentMethod.find(params.id)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async update ({ params, request, response }) {
    try {
      const data = request.all()
      const paymentmethod = await PaymentMethod.find(params.id)
      paymentmethod.merge(data)
      paymentmethod.save()
      return response.status(200).send(paymentmethod)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async destroy ({ params, response }) {
    try {
      const paymentmethod = await PaymentMethod.find(params.id)
      return paymentmethod.delete()
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }
}

module.exports = PaymentMethodController
