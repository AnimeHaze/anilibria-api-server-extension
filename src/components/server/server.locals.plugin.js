const fp = require('fastify-plugin')

function localsDecorator(fastify, options, next) {
  fastify.decorateRequest('locals', {})
  next()
}

module.exports = {
  localsDecorator:  fp(localsDecorator)
}


