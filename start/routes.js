'use strict'

const Route = use('Route')

Route.post('/api/sessions', 'SessionController.store').validator('Session')

Route.group(() => {
  Route.resource('/api/user_type', 'UserTypeController')
  Route.resource('/api/plan', 'PlanController')
  Route.resource('/api/client', 'ClientController')
  Route.resource('/api/address', 'AddressController')
  Route.resource('/api/user', 'UserController')
  Route.resource('/api/remuneration', 'RemunerationController')
  Route.resource('/api/sale', 'SaleController')
  Route.resource('/api/state', 'StateController')
  Route.resource('/api/city', 'CityController')
  Route.resource('/api/bill', 'BillController')
  Route.resource('/api/paymentprofile', 'PaymentProfileController')
  Route.resource('/api/period', 'PeriodController')
  Route.resource('/api/product', 'ProductController')
  Route.resource('/api/subscription', 'SubscriptionController')
  Route.resource('/api/transaction', 'TransactionController')
  Route.resource('/api/message', 'MessageController')
  Route.resource('/api/issue', 'IssueController')
  Route.resource('/api/notification', 'NotificationController')
  Route.resource('/api/user_remuneration', 'UserRemunerationController')
}).middleware('auth')
