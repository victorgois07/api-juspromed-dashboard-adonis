'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentMethodSchema extends Schema {
  up () {
    this.create('payment_methods', (table) => {
      table.increments()
      table.string('public_name', 254).notNullable().unique()
      table.string('name', 254).notNullable()
      table.string('code', 254).notNullable().unique()
      table.string('tyoe', 254).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.table('sales', function (table) {
      table.dropForeign('payment_method_id')
    })
    this.drop('payment_methods')
  }
}

module.exports = PaymentMethodSchema
