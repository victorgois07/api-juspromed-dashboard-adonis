'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserTypeSchema extends Schema {
  up () {
    this.create('user_types', (table) => {
      table.increments()
      table.string('description', 80).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.table('users', function (table) {
      table.dropForeign('user_type_id')
    })
    this.drop('user_types')
  }
}

module.exports = UserTypeSchema
