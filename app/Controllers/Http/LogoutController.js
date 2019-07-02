'use strict'

class LogoutController {
	 async logout({response,session}){
        session.forget('uid_now')
        session.flash({notification: 'You have been logged out.'})
        return response.redirect('/')
    }
}

module.exports = LogoutController
