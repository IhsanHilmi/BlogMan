'use strict'

class LoginController {
    async index({view}){
        return view.render('login')
    }
}

module.exports = LoginController
