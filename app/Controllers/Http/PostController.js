'use strict'
const Post = use('App/Models/Post')

const Userinfo = use('App/Models/Userinfo')

const { validate } = use('Validator')

class PostController {

	async index ({view}){
        const posts = await Post
        .query()
        .with('userinfo')
        .fetch()

        if (posts == null) {
            return view.render('main', {
                title: 'No Posts Yet'
            })
        }
        return view.render('welcome', {
            title: 'Latest Post',
            posts: posts.toJSON()
        })
    }

	async myposts ({view,session}) {
		// body... 
		
		const posts = await Post
  		.query()
  		.with('userinfo')
        .where('user_id',session.get('uid_now'))
  		.fetch()

        if (posts == null) {
            return view.render('main', {
                title: 'No post yet'
            })
        }

        return view.render('main', {
            title: 'Latest Post',
            posts: posts.toJSON()
        })
	}

	async add ({view}){
		return view.render('posts/add')
	}

	async input ({session,request,response}){
		
		const validation = await validate(request.all(), {
            in_title: 'required|min:5|max:100',
            in_desc:'required|min:3'
        })

        if (validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        const newpost = new Post()

        newpost.title = request.input('in_title')
        newpost.desc = request.input('in_desc')
        newpost.user_id = 3

        await newpost.save()

        session.flash({ notification: 'Post Added!'})

        return response.redirect('/posts')
	}

    async details ({session,params,view}) {
        // body... 
    
        const post = await Post.find(params.id)

        return view.render('posts/edit',{
            post:post.toJSON(),
        })
    }

    async edit({request,response,session}){

        const validation = await validate(request.all(), {
            in_title: 'required|min:5|max:100',
            in_desc:'required|min:3'
        })

        if (validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }
        const post = await Post.find(request.input('in_id'))

        post.user_id = request.input('in_uid')
        post.title = request.input('in_title')
        post.desc = request.input('in_desc')

        post.save()

        return response.redirect('/posts')
    }
    
    async delete ({params,response,session}){
        const post = await Post.find(params.id)
        
        post.delete()

        return response.redirect('/posts')
    }

}

module.exports = PostController
