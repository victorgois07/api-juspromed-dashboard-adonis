'use strict'

const PaymentStatus = use('App/Models/PaymentStatus')

class PaymentStatusController {
  async index ({ response }) {
    try {
      return await PaymentStatus.all()
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async store ({ request, response }) {
    try {
      const data = request.all()
      return await PaymentStatus.create(data)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async show ({ params, response }) {
    try {
      return await PaymentStatus.find(params.id)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async update ({ params, request, response }) {
    try {
      const data = request.all()
      const paymentstatus = await PaymentStatus.find(params.id)
      paymentstatus.merge(data)
      paymentstatus.save()
      return response.status(200).send(paymentstatus)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async destroy ({ params, response }) {
    try {
      const paymentstatus = await PaymentStatus.find(params.id)
      return paymentstatus.delete()
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }
}

module.exports = PaymentStatusController
