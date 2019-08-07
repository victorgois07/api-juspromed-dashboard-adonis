'use strict'

const Factory = use('Factory')

class UserSeeder {
  async run () {
    const state = await Factory.model('App/Models/State').create()
    const city = await Factory.model('App/Models/State').make()
    await city.
    const address = await Factory.model('App/Models/Address').make()
    await Factory.model('App/Models/User').create()
  }
}

module.exports = UserSeeder
