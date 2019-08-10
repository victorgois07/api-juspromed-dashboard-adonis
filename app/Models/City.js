'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class City extends Model {

  state () {
    return this.belongsTo('App/Models/State')
  }

  addresses () {
    return this.hasMany('App/Models/Address')
  }
}

module.exports = City
