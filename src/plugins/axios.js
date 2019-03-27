export const camelToSnake = targetString => {
  const upperToSnake = str => `_${str.charAt(0).toLowerCase()}`
  return targetString.replace(/([A-Z])/g, upperToSnake)
}

export const snakeToCamel = targetString => {
  const snakeToUpper = str => str.charAt(1).toUpperCase()
  return targetString.replace(/_./g, snakeToUpper)
}

export const recursiveToCamels = data => {
  const convertedData = {}

  if (Array.isArray(data)) {
    const convertedArrayData = []

    for (const item of data) {
      if (typeof item === 'object') {
        convertedArrayData.push(recursiveToCamels(item))
      }
    }

    return convertedArrayData.length ? convertedArrayData : data
  }

  for (const name in data) {
    const camelName = snakeToCamel(name)
    convertedData[camelName] = data[name]

    if (typeof data[name] === 'object') {
      if (Array.isArray(data)) continue
      convertedData[camelName] = recursiveToCamels(convertedData[camelName])
    }
  }

  return convertedData
}

export default function({ $axios }) {
  $axios.onRequest(
    config => {
      const paramsApiFriendly = {}

      for (const name in config.params) {
        paramsApiFriendly[camelToSnake(name)] = config.params[name]
      }
      config.params = paramsApiFriendly

      return config
    },
    error => Promise.reject(error)
  )

  $axios.onResponse(
    response => {
      response.data = recursiveToCamels(response.data)
      return response
    },
    error => {
      const status = error.response.status

      if (status === 401) {
        location.href = location.href.replace(/^(https:\/\/.+?)\/.*?$/i, '$1')
      }

      return Promise.reject(error)
    }
  )
}
