const { fastifyAwilixPlugin } = require('@fastify/awilix')
const fastifyEnv = require('@fastify/env')
const { envScheme } = require('./server.env.scheme')
const app = require('fastify')({ logger: true })

const { serverErrorHandler } = require('./server.error-handler')
const { createSnapshotRoute, getSnapshotRoute, getSnapshotsRoute, delSnapshotsRoute } = require('../snapshot')
const { authMiddleware } = require('./auth.middleware')
const { localsDecorator } = require('./server.locals.plugin')

app.addContentTypeParser('application/json', { parseAs: 'string' }, function (req, body, done) {
  try {
    const json = JSON.parse(body)
    done(null, json)
  } catch (err) {
    err.statusCode = 400
    done(err, undefined)
  }
})

async function startServer () {
  app.register(require('@fastify/cors'))

  await app.register(require('@fastify/rate-limit'), {
    skipOnError: false
  })

  app.register(localsDecorator)

  app.register(
    fastifyAwilixPlugin,
    { disposeOnClose: true, disposeOnResponse: true }
  )

  app.all('/', async (_, reply) => {
    return reply
      .code(418)
      .send('It\'s alive!')
  })

  app.register(
    function(instance, opts, done) {
      instance.addHook('preValidation', authMiddleware)

      instance.all('/', async () => {
        return { success: true }
      })

      instance.route(createSnapshotRoute)
      instance.route(getSnapshotRoute)
      instance.route(getSnapshotsRoute)
      instance.route(delSnapshotsRoute)
      done()
    },
    { prefix: '/api/v1' }
  )
  app.setErrorHandler(serverErrorHandler)

  await app.register(fastifyEnv, { schema: envScheme })

  try {
    await app.listen({ port: app.config.PORT })
  } catch (err) {
    app.log.error(err)
    throw err
  }
}

module.exports = { startServer }
