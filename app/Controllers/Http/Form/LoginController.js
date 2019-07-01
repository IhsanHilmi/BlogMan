'use strict'

const User = use('App/Models/Userinfo')
const Hash = use('Hash')
const {validate} = use('Validator')

class LoginController {
    async index({auth, view,response,session}){
        const uid = session.get('uid_now')
        if(uid==null){
            return view.render('login')
        }
        else{
            console.log(uid)
            return response.redirect('back')
        }
            
            
    }

    async login({request, auth, session, response}){
        const {in_param, in_password} = request.all()
        
        const validation = await validate(request.all(),{
            in_param: `required`,
            in_password:'required'
        })
        const usercheck2 = await User.query()
        .where('username', in_param)
        .where('status', true)
        .first()

        const usercheck1 = await User.query()
        .where('email', in_param)
        .where('status', true)
        .first()

        if(usercheck1){
            const verified = await Hash.verify(in_password,usercheck1.password)
        
            if(verified){
                session.put('uid_now',usercheck1.id)
                return response.redirect('/')
            }
            else{
                session.withErrors(validation.messages()).flashAll()
                return response.redirect('back')
            }
        }
        else if(usercheck2){
            const usercheck2 = await User.query()
            .where('username', in_param)
            .where('status', true)
            .first()

            if(usercheck2){
                const verified2 = await Hash.verify(in_password, usercheck2.password)

                if(verified2){
                    session.put('uid_now', usercheck2.id)
                    return response.redirect('/')
                }
                else{
                    session.withErrors(validation.messages()).flashAll()
                    return response.redirect('back')
                }
            }
        }
        else{
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }
        
    }

}

module.exports = LoginController
