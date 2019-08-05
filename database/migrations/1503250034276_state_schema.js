'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StateSchema extends Schema {
  up () {
    this.create('states', (table) => {
      table.increments()
      table.string('description', 254).notNullable().unique()
      table.string('country', 20).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.table('cities', function (table) {
      table.dropForeign('city_id')
    })
    this.drop('states')
  }
}

module.exports = StateSchema
