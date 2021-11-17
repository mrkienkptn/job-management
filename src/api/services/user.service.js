const axios = require('axios')

const APIError = require('../utils/APIError')

const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || 'http://user-svc.cluster.local'

module.exports.authorization = async (accessToken, payload) => {
  const { status, data } = await axios({
    url: `${USER_SERVICE_URL}/authorization`,
    headers: {
      'x-access-token': accessToken
    },
    data: payload
  })
  if (status === 200) {
    return data
  }
  throw new APIError({
    status,
    message: 'Authorization fail'
  })
}
