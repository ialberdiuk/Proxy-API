const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config/auth.config')
const userService = require('../services/user.service')
const apiService = require('../services/api.services')

exports.signUp = async (req, res) => {
  const { username, email, password } = req.body
  if (
    !username || typeof username !== 'string' ||
    (!email || typeof email !== 'string')
  ) {
    return res.status(400).json({
      message: 'Invalid Params'
    })
  }

  let existentUser
  try {
    existentUser = await userService.getUser(username, email)
  } catch (err) {
    return res.status(500).send({ message: err.message })
  }

  if (!existentUser.length) {
    const hashed_password = bcrypt.hashSync(password, 8)
    const user = await userService.create(username, email, hashed_password)
    return res.status(201).json({
      data: user
    })
  }

  return res.status(400).send({
    message: 'Failed! Username or email is already in use!'
  })
}

exports.signIn = async (req, res, next) => {
  const { username } = req.body
  let data
  try {
    data = await userService.getUser(username, null)
    if (!data.length) {
      return res.status(404).send({ message: 'User Not found.' })
    }
    const userValues = JSON.parse(JSON.stringify(data[0]))
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      userValues.hashed_password
    )

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!'
      })
    }

    const token = jwt.sign({ id: userValues.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    })

    return res.status(200).send({
      id: userValues.id,
      username: userValues.username,
      email: userValues.email,
      accessToken: token
    })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
  next()
}

exports.createUser = async (req, res, next) => {
  try {
    await apiService.createUser(req, res)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
  next()
}
