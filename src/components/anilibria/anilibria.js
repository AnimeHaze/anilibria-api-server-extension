const axios = require('axios')

class ApiError extends Error {
  constructor (error) {
    super(error)
  }
}

const client = axios.create({
  headers: {
    'user-agent': 'AniLibrix/1.4.3'
  },
  baseURL: 'https://anilibriaqt.anilib.top'
})

const anilibriaService = new Proxy({}, {
  get: function (_, prop) {
    return async function (session) {
      try {
        const { data } = await client.post('/public/api/index.php', new URLSearchParams({ query: prop }), {
          headers: {
            'Cookie': 'PHPSESSID=' + session
          }
        })

        return data
      } catch (e) {
        throw new ApiError(e)
      }
    }
  },
})

module.exports = { anilibriaService, ApiError }
