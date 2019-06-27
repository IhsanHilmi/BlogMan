'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserinfosSchema extends Schema {
  up () {
    this.create('userinfos', (table) => {
      table.increments()
      table.string('username', 15).notNullable().unique()
      table.string('email', 255).notNullable().unique()
      table.string('password', 25).notNullable()
      table.string('token')
      table.boolean('status').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('userinfos')
  }
}

module.exports = UserinfosSchema
