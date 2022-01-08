const { Notification } = require('../models')

const createAddMemberNot = async (data) => {
  const newNot = new Notification()
  await newNot.save()
}

const getONotifications = async (userId, queryData) => {
  const filter = { o: userId }
  const { page, records } = queryData
  const rs = await Notification.aggregate([
    {
      $match : filter
    },
    {
      $lookup: {
        from: 'users',
        localField: 's',
        foreignField: '_id',
        as: 'subject'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'o',
        foreignField: '_id',
        as: 'object'
      }
    },
    {
      $lookup: {
        from: 'groups',
        localField: 'group',
        foreignField: '_id',
        as: 'group'
      }
    },
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
  const { result, totalCount } = rs[0]
  const total = totalCount[0] ? totalCount[0].count : 0
  return { data: result, total }
}

module.exports = {
  createAddMemberNot,
  getONotifications
}
