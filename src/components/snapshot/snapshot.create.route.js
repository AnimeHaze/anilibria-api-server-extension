const { createSnapshotScheme } = require('./snapshot.create.request.scheme')

async function createSnapshot (req, reply) {
  const snapshotService = req.diScope.resolve('snapshotService')

  const { _id } = req.locals.user
  const { watched, settings } = req.body

  const snapshot = await snapshotService.add(_id, watched, settings)

  reply
    .status(201)
    .send({
      success: true, data: {
        createdAt: snapshot.createdAt, id: snapshot.id
      }
    })
}

module.exports = {
  createSnapshot: {
    config: {
      rateLimit: {
        max: 3,
        timeWindow: '1 hour'
      }
    },
    method: 'PUT',
    url: '/snapshot',
    schema: createSnapshotScheme,
    handler: createSnapshot
  }
}
