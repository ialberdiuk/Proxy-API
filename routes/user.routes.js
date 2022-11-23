const router = require('express').Router()
const bodyParser = require('body-parser')
const verifyToken = require('../middleware/auth')
const userController = require('../controllers/user.controller')

const jsonParser = bodyParser.json()

router.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  )
  next()
})

router.get(
  '/users',
  [verifyToken],
  (req, res, next) => {
    controller.getUsers(req, res, next)
    next()
  }
)

router.post(
  '/auth/signup',
  jsonParser,
  async (req, res, next) => {
    await userController.signUp(req, res, next)
    next()
  }
)

router.post(
  '/auth/signin',
  jsonParser,
  async (req, res, next) => {
    await userController.signIn(req, res, next)
    next()
  }
)

router.post(
  '/users',
  jsonParser,
  async (req, res, next) => {
    await userController.createUser(req, res, next)
    next()
  }
)

module.exports = router
