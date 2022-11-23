const https = require('https')
const utils = require('../utils/payload.utils')

const preparePayload = (req, type) => {
  if (type === 'token') {
    return utils.tokenPayload()
  } if (type === 'user') {
    return utils.userPayload(req)
  } if (type === 'assets') {
    return utils.assetsPayload(req)
  } if (type === 'activation') {
    return utils.activationPayload(req)
  }
}

exports.sendRequest = (postData, token, path) => new Promise((resolve, reject) => {
  let result
  if (postData) {
    const options = {
      hostname: 'hummingbird-staging.podgroup.com',
      port: 443,
      path: path === undefined ? '/auth/token' : `/${path}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length,
        'x-access-token': token
      }
    }

    if (!token) {
      delete (options.headers)['x-access-token']
    }

    const req = https.request(options, (res) => {
      res.on('data', (d) => {
        result = d.toString()
        resolve({ statusCode: res.statusCode, info: JSON.parse(result) })
      })
    })

    req.on('error', (e) => {
      reject(e)
    })

    req.write(postData)
    req.end()
  } else {
    reject('Request is invalid')
  }
})

exports.createUser = async (req, res) => {
  try {
    const result = await this.sendRequest(preparePayload(req, 'token'))
    const { token } = result.info
    const data = await this.sendRequest(preparePayload(req, 'user'), token, 'users')
    res.status(data.statusCode).send({ message: data.info })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}
