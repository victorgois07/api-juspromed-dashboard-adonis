'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RemunerationSchema extends Schema {
  up () {
    this.create('remunerations', (table) => {
      table.increments()
      table.decimal('variable_bonus', 3, 2).notNullable().unique()
      table.integer('monthly_recreation').notNullable().unique()
      table.decimal('value_bonus', 8, 2).notNullable().unique()
      table.string('description', 254)

      table.integer('user_salesman_id').unsigned().references('id').inTable('users').onDelete('set null')
      table.integer('sale_id').unsigned().references('id').inTable('sales').onDelete('set null')
      table.timestamps()
    })
  }

  down () {
    this.table('user_remunerations', function (table) {
      table.dropForeign('remuneration_id')
    })
    this.drop('remunerations')
  }
}

module.exports = RemunerationSchema
