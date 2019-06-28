'use strict'
const Post = use('App/Models/Post')

const Userinfo = use('App/Models/Userinfo')

const { validate } = use('Validator')

class PostController {

	
	async index ({view}) {
		// body... 
		
		const posts = await Post
  		.query()
  		.with('userinfo')
  		.fetch()


        return view.render('main', {
            title: 'Latest Post',
            posts: posts.toJSON()
        })
	}

	async add ({view}){
		return view.render('posts/add')
	}

	async input ({session,request,response}){
		
		/*const validation = await validate(request.all(), {
            in_title: 'required|min:5|max:100',
            in_desc:'required|min:3'
        })

        if (validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }*/

        const newpost = new Post()

        newpost.title = request.input('in_title')
        newpost.desc = request.input('in_desc')
        newpost.user_id = 1

        await newpost.save()

        session.flash({ notification: 'Post Added!'})

        return response.redirect('/posts')
	}


}

module.exports = PostController
