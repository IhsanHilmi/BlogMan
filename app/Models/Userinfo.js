'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Userinfo extends Model {

      posts() {
      return this.hasMany('App/Models/Post','id','user_id')
    }
    static boot () {
        super.boot()
        console.log("aku terpanggil")
    
        /**
         * A hook to hash the user password before saving
         * it to the database.
         */
        this.addHook('beforeCreate', async (userInstance) => {
          if (userInstance.password) {
            userInstance.password = await Hash.make(userInstance.password)
          }
        })
      }
    
      /**
       * A relationship on tokens is required for auth to
       * work. Since features like `refreshTokens` or
       * `rememberToken` will be saved inside the
       * tokens table.
       *
       * @method tokens
       *
       * @return {Object}
       */
      tokens () {
        return this.hasMany('App/Models/Token')
      }
    }
module.exports = Userinfo