const { omitIsNil } = require('./omit')

const getApiResponse = ({ ec = 0, data, total, msg }) => {
  return omitIsNil({
    ec,
    total,
    data,
    msg
  })
}

module.exports = getApiResponse
