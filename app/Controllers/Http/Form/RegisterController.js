'use strict'

const User = use('App/Models/Userinfo')
const {validate} = use('Validator')
const Mail = use('Mail')
const randomString = require('random-string')

class RegisterController {
    async index({view,session,response}){

                return view.render('register')
            
    }

    async register({request, session, response}){

        
        const validation = await validate(request.all(),{
            in_username: `required|unique:userinfos,username`,
            in_email:'required|email|unique:userinfos,email',
            in_password:'required'
        })

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        const user = await User.create({
            username: request.input('in_username'),
            email: request.input('in_email'),
            password: request.input('in_password'),
            token: randomString({length:40})
        })

        await Mail.send('emails.verify', user.toJSON(), givemessage =>{
            givemessage.to(user.email)
            .from('noreply@blogman.com')
            .subject('Please confirm your email address')
        })
        
        session.flash({
            notification:{
                type: 'success',
                message: 'An email verification has been sent!'
            }
        })
        return response.redirect('back')
    }

    async confirmed({params, session, response}){
        const user = await User.findBy('token', params.token)

        user.token = null
        user.status = true
        await user.save()
        return response.redirect('/login')
    }
}

module.exports = RegisterController
