const Sequelize = require('sequelize')

const { Model } = Sequelize
class UserModel extends Model {
  static init (sequelize, DataTypes) {
    return super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        username: {
          type: DataTypes.STRING,
          allowNull: true
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true
        },
        hashed_password: {
          type: DataTypes.STRING
        }
      },
      {
        sequelize,
        modelName: 'user'
      }
    )
  }
}

module.exports = UserModel
