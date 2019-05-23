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
