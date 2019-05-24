'use strict'

const Env = use('Env')

module.exports = {
  header: {
    'cache-control': 'no-cache',
    Connection: 'keep-alive',
    'accept-encoding': 'gzip, deflate',
    Host: Env.get('HOSTVINDIAPI'),
    'Postman-Token':
      'd17cf374-4d15-49d2-b67e-8b283a14eebf,eb33579c-ca55-4d3c-96b2-6ca60a91d52e',
    'Cache-Control': 'no-cache',
    Accept: '*/*',
    'User-Agent': 'PostmanRuntime/7.13.0',
    Authorization: `Basic ${Env.get('TOKEN_HOMOLOGACAO_VINDI')}`
  }
}
