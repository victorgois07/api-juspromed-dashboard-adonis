'use strict'

const Env = use('Env')

module.exports = {
  header: {
    'cache-control': 'no-cache',
    Connection: 'keep-alive',
    'accept-encoding': 'gzip, deflate',
    Host: Env.get('HOSTVINDIAPI'),
    'Postman-Token':
      '2ff160a6-e57a-426f-8e36-9ec1ee9f9b60,9af0c667-fbb7-4c77-ad30-41689fabfede',
    'Cache-Control': 'no-cache',
    Accept: '*/*',
    'User-Agent': 'PostmanRuntime/7.13.0',
    Authorization: `Basic ${Env.get('TOKEN_HOMOLOGACAO_VINDI')}`
  }
}
