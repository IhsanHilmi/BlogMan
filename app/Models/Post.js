'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
	userinfo () {
    return this.belongsTo('App/Models/Userinfo','user_id','id')
  }
}

module.exports = Post
