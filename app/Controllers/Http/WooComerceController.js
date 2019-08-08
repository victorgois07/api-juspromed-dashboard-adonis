const Env = use('Env')
const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;


let WooCommerce = new WooCommerceRestApi({
  url: 'https://juspromed.com/',
  consumerKey: Env.get('CONSUMER_KEY'),
  consumerSecret: Env.get('CONSUMER_SECRET'),
  wpAPIPrefix: 'wc-api',
  version: 'v2'
})

class WooCommerceController {
  async products ({ response }) {
    try {
      let result = await WooCommerce.get('products')
      console.log('Response Status:', result.status)
      console.log('Response Headers:', result.headers)
      console.log('Total of pages:', result.headers['x-wc-totalpages'])
      console.log('Total of items:', result.headers['x-wc-total'])
      console.log('respose', typeof result.data['products'])
      return response.send(result.data['products'])
    } catch (err) {
      console.log('err', err)
      return response.status(err.status).send(err)
    }
  }

  async customers ({ response }) {
    try {
      console.log('customers')
      let result = await WooCommerce.get('customers')
      console.log('Response Status:', result.status)
      console.log('Response Headers:', result.headers)
      console.log('Total of pages:', result.headers['x-wc-totalpages'])
      console.log('Total of items:', result.headers['x-wc-total'])
      console.log('respose', typeof result.data['orders'])
      return response.send(result.data['customers'])
    } catch (err) {
      console.log('err', err)
      return response.status(err.status).send(err)
    }
  }

  async customersOrders ({ params, response }) {
    try {
      let result = await WooCommerce.get(`customers/${params.id}/orders`)
      console.log('Response Status:', result.status)
      console.log('Total of pages:', result.headers['x-wc-totalpages'])
      console.log('Total of items:', result.headers['x-wc-total'])
      console.log('respose', typeof result.data['orders'])
      return response.send(result.data['orders'])
    } catch (err) {
      console.log('err', err)
      return response.status(err.status).send(err)
    }
  }

  async orders ({ params, response }) {
    try {
      console.log('params', params)
      let url = params.id !== null ? `orders/${params.id}` : 'orders'
      let indice = params.id !== null ? 'order' : 'orders'
      console.log('url', url, indice)
      let result = await WooCommerce.get(url)
      console.log('Response Status:', result.status)
      console.log('Total of pages:', result.headers['x-wc-totalpages'])
      console.log('Total of items:', result.headers['x-wc-total'])
      console.log('respose', typeof result.data[indice])
      return response.send(result.data[indice])
    } catch (err) {
      console.log('err', err)
      return response.status(err.status).send(err)
    }
  }

  async sales ({ response }) {
    try {
      let result = await WooCommerce.get('orders?filter[meta]=true')
      console.log('data', result)
      let orders = result.data['orders']
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
      console.log('err', err)
      return response.status(err.status).send(err)
    }
  }
}

module.exports = WooCommerceController
