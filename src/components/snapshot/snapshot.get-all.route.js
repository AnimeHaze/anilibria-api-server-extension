async function getSnapshots (req, reply) {
  const snapshotService = req.diScope.resolve('snapshotService')
  const { _id } = req.locals.user

  let snapshots = await snapshotService.getAll(_id)

  snapshots = snapshots.map((snapshot) => ({
    createdAt: snapshot.createdAt,
    id: snapshot.id
  }))

  reply
    .status(200)
    .send({
      success: true, data: snapshots
    })
}

module.exports = {
  getSnapshots: {
    config: {
      rateLimit: {
        max: 50,
        timeWindow: '1 hour'
      }
    },
    method: 'GET',
    url: '/snapshot',
    handler: getSnapshots
  }
}
