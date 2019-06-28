'use strict'

const User = use('App/Models/Userinfo')
const Hash = use('Hash')

class LoginController {
    async index({auth, view, response}){
        try{
            await auth.check()
            return response.route('home')
        }catch(error){
            return view.render('login')
        }
    }

    async login({request, auth, session, response}){
        const {in_email, in_password} = request.all()

        const user = await User.query()
        .where('email', in_email)
        .where('status', true)
        .first()

        if(user){
            const verified = await Hash.verify(in_password,user.password)
        
            if(verified){
                session.put('uid_now',user.id)
                return response.route('posts')
            }
        }

        return response.route('error')
    }
}

module.exports = LoginController
