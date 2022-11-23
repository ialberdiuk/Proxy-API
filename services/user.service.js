const UserRepository = require('../db/user.repository')

exports.create = async (name, email, hashed_password) => UserRepository.create(name, email, hashed_password)

exports.getUser = async (username, email) => UserRepository.getUser(username, email)
