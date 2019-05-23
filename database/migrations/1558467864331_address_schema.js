'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressSchema extends Schema {
  up () {
    this.create('addresses', (table) => {
      table.increments()
      table.string('zipcode', 9).notNullable().unique()
      table.integer('number', 254).notNullable()
      table.string('additional_details', 254).notNullable()
      table.string('street', 254).notNullable()
      table.string('neighborhood', 254)
      table.integer('city_id').unsigned().references('id').inTable('city').onDelete('set null')
      table.timestamps()
    })
  }

  down () {
    this.table('users', function (table) {
      table.dropForeign('address_id')
    })
    this.drop('addresses')
  }
}

module.exports = AddressSchema
