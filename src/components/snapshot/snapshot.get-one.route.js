const { getSnapshotScheme } = require('./snapshot.get-one.request.scheme')

async function getSnapshot (req, reply) {
  const snapshotService = req.diScope.resolve('snapshotService')
  const { id: snapshotId } = req.params
  const { userId, username, _id } = req.locals.user

  const snapshot = await snapshotService.get(_id, snapshotId)

  if (snapshot === null) {
    reply
      .status(404)
      .send({
        success: false, error: 'Snapshot not found'
      })
      return
  }

  reply
    .status(200)
    .send({
      success: true, data: {
        createdAt: snapshot.createdAt, id: snapshot.id, watched: snapshot.watched, settings: snapshot.settings
      }
    })
}

module.exports = {
  getSnapshot: {
    config: {
      rateLimit: {
        max: 100,
        timeWindow: '1 hour'
      }
    },
    method: 'GET',
    url: '/snapshot/:id',
    schema: getSnapshotScheme,
    handler: getSnapshot
  }
}
