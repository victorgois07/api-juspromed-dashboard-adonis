'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('cpf_cnpj', 18).notNullable().unique()
      table.string('name', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('phone', 50)
      table.string('social_reason', 80)
      table.integer('vindi_client_id')
      table.string('description', 254)
      table.integer('active').notNullable()

      table.integer('plan_id').unsigned().references('id').inTable('plans')
      table.integer('user_type_id').unsigned().references('id').inTable('user_types')
      table.integer('address_id').unsigned().references('id').inTable('addresses')

      table.timestamps()
    })
  }

  down () {
    this.table('users', function (table) {
      table.dropForeign('plan_id')
      table.dropForeign('user_type_id')
      table.dropForeign('address_id')
    })
    this.drop('users')
  }
}

module.exports = UserSchema
