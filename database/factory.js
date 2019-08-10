'use strict'

const Factory = use('Factory')

Factory.blueprint('App/Models/User', faker => {
  return {
    username: faker.username(),
    email: faker.username() + '@teste.com',
    password: '123',
    cpf_cnpj: '618.049.087-20',
    active: true,
    name: 'Teste',
    user_type_id: 1,
    address_id: 1
  }
})

Factory.blueprint('App/Models/State', (faker) => {
  return {
    description: 'Distrito Federal',
    country: 'Brasil'
  }
})

Factory.blueprint('App/Models/City', (faker) => {
  return {
    description: 'Brasília'
  }
})

Factory.blueprint('App/Models/UserType', (faker) => {
  return {
    description: 'sytem-user'
  }
})

Factory.blueprint('App/Models/Address', (faker) => {
  return {
    'zipcode': '72465-370',
    'number': 2,
    'additional_details': '',
    'street': '',
    'neighborhood': ''
  }
})
