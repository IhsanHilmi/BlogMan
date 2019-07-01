'use strict'

class LogoutController {
	 async logout({auth, response,session}){
        await auth.logout()
        response.clearCookie('uid_now')
        return response.redirect('/')
    }
}

module.exports = LogoutController
