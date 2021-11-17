const parseFilters = (filters = {}) => {
  const parsedFilters = {}

  Object.keys(filters).forEach(key => {
    if (typeof filters[key] === 'string') {
      parsedFilters[key] = new RegExp(filters[key], 'i')
    } else {
      parsedFilters[key] = filters[key]
    }
  })

  return parsedFilters
}

module.exports = parseFilters
