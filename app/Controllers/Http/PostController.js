'use strict'
const Post = use('App/Models/Post')

const Userinfo = use('App/Models/Userinfo')

const { validate } = use('Validator')

class PostController {

	async index ({view,session}){
        
        const uid = session.get('uid_now')

        const posts = await Post
        .query()
        .with('userinfo')
        .orderBy('created_at', 'desc')
        .fetch()

        if (posts.toJSON() == null || posts.toJSON() == "" || !posts.toJSON() || posts.toJSON() == undefined) {
            return view.render('welcome', {
                title: 'No Posts Yet',
                uid:uid
            })
        }
        return view.render('welcome', {
            title: 'Latest Post',
            posts: posts.toJSON(),
            uid:uid
        })
}
	async myposts ({view,session}) {
		
        const uid = session.get('uid_now')
        if(uid==null){
            return view.render('login')
        }
        else{
            const posts = await Post
            .query()
            .with('userinfo')
            .where('user_id',uid)
            .orderBy('created_at', 'desc')
            .fetch()

            if (posts == null) {
                return view.render('myposts', {
                    title: 'No post yet',
                    uid:uid
                })
            }

            return view.render('myposts', {
                title: 'My Posts',
                posts: posts.toJSON(),
                uid:uid
            })
        }

        
    }
    
	async add ({view,session}){
        const uid = session.get('uid_now')

		return view.render('posts/add',{
            uid:uid
        })
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
        newpost.user_id = request.input('in_uid')

        await newpost.save()

        session.flash({ notification: 'Post Added!'})

        return response.redirect('/')
	}

    async details ({session,params,view}) {
        // body... 
        const uid = session.get('uid_now')
        const post = await Post.find(params.id)

        return view.render('posts/edit',{
            post:post.toJSON(),
            uid:uid
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

        post.title = request.input('in_title')
        post.desc = request.input('in_desc')

        await post.save()

        return response.redirect('/posts')
    }
    
    async delete ({params,response,session}){
        
         const uid = session.get('uid_now')
        if(uid==null){
            return view.render('login')
        }

        const post = await Post
        .query()
        .where('id',params.id)
        .where('user_id',uid)
        .fetch()

        const cek = post
        if(cek.toJSON()==null || cek.toJSON()==""){

        post.delete()

        return response.redirect('/')    
        }
        else{
        return response.redirect('login')
        }
        
    }

}

module.exports = PostController
