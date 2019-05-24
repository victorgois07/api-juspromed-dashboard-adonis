'use strict'

const Env = use('Env')
const Youch = require('youch')
const BaseExceptionHandler = use('BaseExceptionHandler')

class ExceptionHandler extends BaseExceptionHandler {
  async handle (error, { request, response }) {
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages)
    }

    if (Env.get('NODE_ENV') === 'development') {
      const younch = new Youch(error, request.request)
      const errorJSON = await younch.toJSON()
      return response.status(error.status).send(errorJSON)
    }

    return response.status(error.status).send(error)
  }

  // eslint-disable-next-line handle-callback-err
  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler
