const { ApiError: AnilibriaApiError } = require('../anilibria/anilibria')

function serverErrorHandler (error, request, reply) {
  this.log.error(error)
  if (error instanceof AnilibriaApiError) {
    reply
      .status(503)
      .send({ success: false, error: 'Service Unavailable' })
  } else {
    reply
      .status( error.statusCode ?? 500)
      .send({ success: false, error: error.message })
  }
}

module.exports = { serverErrorHandler }
