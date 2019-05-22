'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentStatusSchema extends Schema {
  up () {
    this.create('payment_statuses', (table) => {
      table.increments()
      table.string('description', 254).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.table('sales', function (table) {
      table.dropForeign('payment_status_id')
    })
    this.drop('payment_statuses')
  }
}

module.exports = PaymentStatusSchema
