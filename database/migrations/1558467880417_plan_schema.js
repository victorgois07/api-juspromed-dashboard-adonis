'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlanSchema extends Schema {
  up () {
    this.create('plans', (table) => {
      table.increments()
      table.string('description', 254).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.table('users', function (table) {
      table.dropForeign('plan_id')
    })
    this.drop('plans')
  }
}

module.exports = PlanSchema
