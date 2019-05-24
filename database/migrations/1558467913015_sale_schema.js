'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SaleSchema extends Schema {
  up () {
    this.create('sales', (table) => {
      table.increments()
      table.decimal('amount', 8, 2).notNullable()
      table.string('description', 254)
      table.string('gateway_message', 254).notNullable()
      table.integer('gateway_transaction_id', 254).notNullable()
      table.date('maturity', 254).notNullable()

      table.integer('payment_status_id').unsigned().references('id').inTable('payment_statuses').onDelete('set null')
      table.integer('payment_method_id').unsigned().references('id').inTable('payment_methods').onDelete('set null')
      table.integer('user_client_id').unsigned().references('id').inTable('users').onDelete('set null')
      table.integer('user_salesman_id').unsigned().references('id').inTable('users').onDelete('set null')
      table.integer('plan_id').unsigned().references('id').inTable('plans').onDelete('set null')

      table.timestamps()
    })
  }

  down () {
    this.table('user_remunerations', function (table) {
      table.dropForeign('sale_id')
    })
    this.drop('sales')
  }
}

module.exports = SaleSchema
