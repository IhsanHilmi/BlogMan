'use strict'

class LogoutController {
	 async logout({auth, response,session}){
        session.forget('uid_now')
        return response.redirect('/')
    }
}

module.exports = LogoutController
