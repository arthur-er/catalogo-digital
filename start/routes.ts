/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Category from 'App/Models/Category'

import Route from '@ioc:Adonis/Core/Route'

Route.get('/login', 'SessionController.create')
Route.post('/login', 'SessionController.store')
Route.delete('/logout', 'SessionController.destroy')

// Outside the group so it can be named just dashboard
Route.get('/dashboard', ({ inertia }) =>
  inertia.render('dashboard', { categories: Category.query().preload('products') })
)
  .as('dashboard')
  .middleware('auth')

Route.group(() => {
  Route.resource('categories', 'CategoriesController').except(['index', 'show'])
  Route.shallowResource('categories.products', 'ProductsController').except(['index', 'show'])
})
  .prefix('/dashboard')
  .middleware('auth')
  .as('dashboard')
