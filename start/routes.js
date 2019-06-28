'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route')

Route.on('/').render('welcome')

Route.get('/register', 'Form/RegisterController.index')

Route.post('/register', 'Form/RegisterController.register').as('register')

Route.get('/login', 'Form/LoginController.index')

Route.post('/login','Form/LoginController').as('login')

Route.get('/register/confirm/:token', 'Form/RegisterController.confirmed')

Route.get('/posts', 'PostController.index')

Route.get('/posts/edit/:id', 'PostController.edit')

Route.get('/posts/:id', 'PostController.data')

Route.get('/posts/add', 'PostController.add')

Route.get('/logout', 'Form/LoginController.logout')

Route.get('/error', 'Form/RegisterController.error')