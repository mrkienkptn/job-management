const Log = require('../models/log.model')
const parseFilters = require('../utils/parse-filters')

const getLog = id => {
  const log = Log.findOne({ id })

  return log
}

const getLogs = async filters => {
  const { page, records, ...rest } = filters
  const parsedFilters = parseFilters(rest)

  const [queryResult] = await Log.aggregate([
    { $match: parsedFilters },
    {
      $facet: {
        result: [
          { $sort: { createdAt: -1 } },
          { $skip: (page - 1) * records },
          { $limit: records }
        ],
        totalCount: [{ $count: 'count' }]
      }
    }
  ])

  const { result, totalCount } = queryResult
  const total = totalCount[0] ? totalCount[0].count : 0

  return { data: result, total }
}

module.exports = {
  getLog,
  getLogs
}
