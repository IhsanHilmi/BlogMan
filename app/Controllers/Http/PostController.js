'use strict'
const Post = use('App/Models/Post')


class PostController {

	async index ({view}) {
		// body... 
		const posts = await Post.all()

        return view.render('main', {
            title: 'Latest Post',
            posts: posts.toJSON()
        })
	}
}

module.exports = PostController
