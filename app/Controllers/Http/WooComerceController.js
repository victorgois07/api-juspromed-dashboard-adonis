const Env = use('Env')
const WooCommerceAPI = require('woocommerce-api');

let WooCommerce = new WooCommerceAPI({
  url: 'https://juspromed.com/',
  consumerKey: Env.get('CONSUMER_KEY'),
  consumerSecret: Env.get('CONSUMER_SECRET'),
  version: 'v3'
})

class WooCommerceController {
  async index ({ response }) {
    WooCommerce.getAsync('products').then(function (result) {
      console.log('result', result)
      response.send(JSON.parse(result.toJSON().body))
    }).catch(function (error) {
      console.log('error', error)
    })
  }
}

module.exports = WooCommerceController
