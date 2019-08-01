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
    // WooCommerce.getAsync('products').then(function (result) {
    //   console.log('result', result)
    //   response.send(JSON.parse(result.toJSON().body))
    // }).catch(function (error) {
    //   console.log('error', error)
    // })
    try {
      let result = await WooCommerce.getAsync('products')
      console.log('result', result.body)
      return response.send(JSON.parse(result.body))
    } catch (err) {
      return response.status(err.status).send(err)
    }
  }

  async sales ({ response }) {
    try {
      let result = await WooCommerce.getAsync('orders?filter[meta]=true')
      let orders = JSON.parse(result.body)
      orders = orders['orders']
      let totalBySeller = {}
      for (let order of orders) {
        if (!(order['order_meta']['myfield8'] in totalBySeller)) {
          totalBySeller[order['order_meta']['myfield8']] = 0
        }
        totalBySeller[order['order_meta']['myfield8']] = order['total']
      }
      let resul = {}
      for (let seller of Object.keys(totalBySeller)) {
        let document = ''
        let name = ''
        try {
          const data = seller.match(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/)
          document = data.length ? data[0] : ''
          name = seller.replace(document, '').replace('CNPJ', '').replace(/^\s+|\s+$/g, '').replace(/–+$|-+$/g, '').replace(/^\s+|\s+$/g, '')
        } catch (err) {
          name = seller.replace(/^\s+|\s+$/g, '')
        }
        resul[seller] = {
          total: totalBySeller[seller],
          name: name,
          cnpj: document
        }
      }
      return response.send(resul)
    } catch (err) {
      return response.status(err.status).send(err)
    }
  }
}

module.exports = WooCommerceController
