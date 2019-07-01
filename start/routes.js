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

Route.post('/login','Form/LoginController.login').as('login')

Route.get('/register/confirm/:token', 'Form/RegisterController.confirmed')

Route.get('/posts', 'PostController.index').as('posts')

Route.get('/posts/:id', 'PostController.details')

Route.get('/posts/:id/delete', 'PostController.delete')

Route.post('/posts/:id', 'PostController.edit')

Route.get('/new-post', 'PostController.add')

Route.post('/new-post', 'PostController.input')

Route.get('/logout', 'LogoutController.logout').as('logout')

Route.get('/error', 'Form/RegisterController.error')
