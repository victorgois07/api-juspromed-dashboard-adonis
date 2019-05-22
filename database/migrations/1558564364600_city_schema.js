'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CitySchema extends Schema {
  up () {
    this.create('cities', (table) => {
      table.increments()
      table.string('description', 254).notNullable().unique()
      table.integer('state_id').unsigned().references('id').inTable('states').onDelete('set null')
      table.timestamps()
    })
  }

  down () {
    this.table('addresses', function (table) {
      table.dropForeign('city_id')
    })
    this.drop('cities')
  }
}

module.exports = CitySchema
