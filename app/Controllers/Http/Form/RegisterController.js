'use strict'

const User = use('App/Models/User')
const {validate} = use('Validator')
const Mail = use('Mail')
const randomString = require('random-string')

class RegisterController {
    async index({view}){
        return view.render('')
    }

    async register({request, session, response}){
        const validation = await validate(request.all(),{
            username: `required|unique:users,username`,
            email:'required|email|unique:users,email',
            password:'required'
        })

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        const user = await User.create({
            username: request.input('in_username'),
            email: request.input('in_email'),
            password: request.input('in_password'),
            confirmation_token: randomString({length:25})
        })

        await Mail.send('auth.emails.confirm_email', user.toJSON(), message =>{
            Message.to(user.email)
            from('noreply@blogman.com')
            subject('Please confirm your email address')
        })

        session.flash({
            notification:{
                type: 'success',
                message: 'Your email address has been registered!'
            }
        })

        return response.redirect('/login')
    }
}

module.exports = RegisterController
