'use strict'

const Route = use('Route')

Route.post('/api/sessions', 'SessionController.store').validator('Session')
Route.resource('/api/client', 'ClientController')
Route.resource('/api/address', 'AddressController')

Route.group(() => {
  Route.resource('/api/user_type', 'UserTypeController')
  Route.resource('/api/plan', 'PlanController')
  Route.resource('/api/user', 'UserController')
  Route.resource('/api/remuneration', 'RemunerationController')
  Route.resource('/api/sale', 'SaleController')
  Route.resource('/api/state', 'StateController')
  Route.resource('/api/user_remuneration', 'UserRemunerationController')
}).middleware('auth')
