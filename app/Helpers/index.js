'use strict'

const axios = require('axios')

// eslint-disable-next-line camelcase
const api_vindi = async () => {
  return new Promise(async (resolve, reject) => {
    const instance = axios.create({
      baseURL: 'https://sandbox-app.vindi.com.br:443/api/v1',
      headers: {
        'Authorization': 'Basic X3hROHFjbkRHMy1JNE1aZXZaRjJMSmpJNGh1NUZOTkNhV2x0OWp6amlLazo=',
        'Content-Type': 'application/json'
      }
    })
    resolve(instance)
  })
}

module.exports = {
  api_vindi
}
