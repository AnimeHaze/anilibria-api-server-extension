const { delSnapshotScheme } = require('./snapshot.del.request.scheme')

async function delSnapshot (req, reply) {
  const snapshotService = req.diScope.resolve('snapshotService')
  const { id: snapshotId } = req.params
  const { _id } = req.locals.user

  const snapshot = await snapshotService.delete(_id, snapshotId)

  if (snapshot === null) {
    reply
      .status(404)
      .send({
        success: false, error: 'Snapshot to remove not found'
      })
  }

  reply
    .status(200)
    .send({
      success: true
    })
}

module.exports = {
  delSnapshot: {
    config: {
      rateLimit: {
        max: 100,
        timeWindow: '1 hour'
      }
    },
    method: 'DELETE',
    url: '/snapshot/:id',
    schema: delSnapshotScheme,
    handler: delSnapshot
  }
}
