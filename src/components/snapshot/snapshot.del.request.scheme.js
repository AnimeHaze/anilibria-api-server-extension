const delSnapshotScheme = {
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        pattern: '^[a-f\\d]{24}$'
      }
    },
    required: ['id']
  }
}

module.exports = { delSnapshotScheme }
