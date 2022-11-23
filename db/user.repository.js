const Sequelize = require('sequelize')
const { UserModel } = require('.')

const { Op } = Sequelize

exports.create = async (username, email, hashed_password) => UserModel.create({
  username,
  email,
  hashed_password
})

exports.getUser = async (username, email) => {
  UserModel.sync()
  return UserModel.findAll({
    where: {
      [Op.or]: [
        { username },
        { email }
      ]
    }
  })
}
