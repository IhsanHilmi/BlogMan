'use strict'

const User = use('App/Models/Userinfo')
const Hash = use('Hash')

class LoginController {
    async index({auth, view,response,session}){
            
            if (session.get('uid_now')==null) {
                // statement
                return view.render('login')
            } else {
                // statement
                return response.redirect('/')
            }
            
    }

    async login({request, auth, session, response}){
        const {in_param, in_password} = request.all()

        const usercheck1 = await User.query()
        .where('email', in_param)
        .where('status', true)
        .first()

        if(usercheck1){
            const verified = await Hash.verify(in_password,usercheck1.password)
        
            if(verified){
                session.put('uid_now',usercheck1.id)
                return response.redirect('posts')
            }
        }
        else{
            const usercheck2 = await User.query()
            .where('username', in_param)
            .where('status', true)
            .first()

            if(usercheck2){
                const verified2 = await Hash.verify(in_password, usercheck2.password)

                if(verified2){
                    session.put('uid_now', usercheck2.id)
                    return response.redirect('posts')
                }
            }
        }

        return response.redirect('error')
    }

    async logout({session, response}){
        await session.forget('uid_now')
        return response.redirect('/')
    }
}

module.exports = LoginController
