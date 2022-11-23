const enviroment = process.env

exports.tokenPayload = () => {
  const username = enviroment.API_USER
  const password = enviroment.API_PASSWORD
  const data = {
    username,
    password
  }
  return JSON.stringify(data)
}

exports.userPayload = (req) => {
  const accountId = enviroment.ACCOUNT_ID
  const {
    username, password, email, status, roles
  } = req.body
  const data = {
    accountId,
    username,
    password,
    email,
    status,
    permissions: [
      {
        accountId,
        roles: [
          roles
        ]
      }
    ]
  }

  return JSON.stringify(data)
}
