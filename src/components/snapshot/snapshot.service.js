const snapshotModel = Symbol('snapshot')

class SnapshotService {
  constructor(model) {
    this[snapshotModel] = model
  }

  async getAll (ownerId) {
    return await this[snapshotModel].find({
      owner: ownerId
    })
  }

  async get (ownerId, snapshotId) {
    return await this[snapshotModel].findOne({
      owner: ownerId,
      _id: snapshotId
    })
  }

  async add (ownerId, watched, settings) {
    const [doc] = await this[snapshotModel].insertMany({
      owner: ownerId,
      watched,
      settings
    })

    return doc
  }

  async delete (ownerId, snapshotId) {
    return await this[snapshotModel].findOneAndRemove({
      owner: ownerId,
      _id: snapshotId
    })
  }
}

function snapshotService (model) {
  return new SnapshotService(model)
}

module.exports = { snapshotService }

