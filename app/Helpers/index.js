'use strict'

const Database = use('Database')

// eslint-disable-next-line camelcase
// eslint-disable-next-line camelcase
const endpoint_filter = async (filter, table, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let value = filter.where[Object.keys(filter.where)[0]]
      let column = Object.keys(value)[0]
      let type = Object.keys(filter.where)[0]
      let page = filter.page ? filter.page : 1
      let limit = filter.limit ? filter.limit : 10
      if (filter.where) {
        if (type === 'equal') {
          if (Array.isArray(value[column])) {
            resolve(await Database.from(table).whereIn(column, filter.where.equal[column]).orderBy(id, 'desc').paginate(page, limit))
          } else {
            resolve(await Database.from(table).where(column, filter.where.equal[column]).orderBy(id, 'desc').paginate(page, limit))
          }
        } else if (type === 'like') {
          if (Array.isArray(value[column])) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject(Error('Somente com um elemento'))
          } else {
            resolve(await Database.from(table).orderBy(id, 'desc').where(column, 'LIKE', '%' + value[Object.keys(value)[0]] + '%').paginate(page, limit))
          }
        } else {
          resolve(await Database.from(table).orderBy(id, 'desc').where(column, type, value[column]).paginate(page, limit))
        }
      } else {
        resolve(await Database.from(table).orderBy(id, 'desc').paginate(page, limit))
      }
    } catch (e) {
      reject(e)
    }
  })
}

// eslint-disable-next-line camelcase
const paginator = async (items, page, per_page) => {
  // eslint-disable-next-line no-redeclare
  var page = page || 1
  // eslint-disable-next-line camelcase,no-redeclare
  var per_page = per_page || 10
  // eslint-disable-next-line camelcase
  var offset = (page - 1) * per_page
  var paginatedItems = items.slice(offset).slice(0, per_page)
  // eslint-disable-next-line camelcase
  var total_pages = Math.ceil(items.length / per_page)
  return {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    // eslint-disable-next-line camelcase
    next_page: total_pages > page ? page + 1 : null,
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems
  }
}

module.exports = {
  endpoint_filter,
  paginator
}
