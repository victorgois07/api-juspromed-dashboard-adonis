'use strict'

const Factory = use('Factory')

class UserSeeder {
  async run () {
    const state = await Factory.model('App/Models/State').create()
    const city = await Factory.model('App/Models/City').make()
    await state.cities().save(city)
    const address = await Factory.model('App/Models/Address').make()
    await city.addresses().save(address)
    await Factory.model('App/Models/UserType').create()
    await Factory.model('App/Models/User').create()
  }
}

module.exports = UserSeeder
