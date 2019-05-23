'use strict'

const Plan = use('App/Models/Plan')

class PlanController {
  async index ({ response }) {
    try {
      return await Plan.all()
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async store ({ request, response }) {
    try {
      const data = request.all()
      return await Plan.create(data)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async show ({ params, response }) {
    try {
      return await Plan.find(params.id)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async update ({ params, request, response }) {
    try {
      const data = request.all()
      const plan = await Plan.find(params.id)
      plan.merge(data)
      plan.save()
      return response.status(200).send(plan)
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }

  async destroy ({ params, response }) {
    try {
      const plan = await Plan.find(params.id)
      return plan.delete()
    } catch (e) {
      return response.status(e.status).send(e)
    }
  }
}

module.exports = PlanController
