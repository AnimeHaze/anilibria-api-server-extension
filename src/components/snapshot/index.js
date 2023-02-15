const { snapshotModel } = require('./snapshot.model')
const { snapshotService } = require('./snapshot.service')
const { getSnapshot } = require('./snapshot.get-one.route')
const { getSnapshots } = require('./snapshot.get-all.route')
const { createSnapshot } = require('./snapshot.create.route')
const { delSnapshot } = require('./snapshot.delete.route')

module.exports = {
  snapshotModel,
  snapshotService,
  createSnapshotRoute: createSnapshot,
  getSnapshotRoute: getSnapshot,
  getSnapshotsRoute: getSnapshots,
  delSnapshotsRoute: delSnapshot
}

