const createSnapshotScheme = {
  body: {
    type: 'object',
    properties: {
      watched: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            releaseId: { type: 'integer', minimum: 0 },
            episodes: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  isSeen: { type: 'boolean' },
                  episode: { type: 'number', minimum: 0, maximum: 10000 },
                  percentage: { type: 'number', minimum: 0, maximum: 100 },
                  timestamp: { type: 'number', minimum: 0 },
                }
              }
            }
          },
          required: ['releaseId']
        }
      },
      settings: {
        type: 'object',
        properties: {
          playTorrents: { type: 'boolean' },
          videoBuffer: { type: 'number', minimum: 0, maximum: 10000 },
          enableOpeningSkipButton: { type: 'boolean' },
          openingSkipTime: { type: 'number', minimum: 0, maximum: 10000 },
          autoPlayNext: { type: 'boolean' },
          showSystemNotifications: { type: 'boolean' },
          staticEndpoint: { type: 'string', minLength: 3, maxLength: 64 },
          apiEndpoint: { type: 'string', minLength: 3, maxLength: 64 },
          autoUpdateReleases: { type: 'boolean' },
          autoUpdateInterval: { type: 'number', minimum: 0, maximum: 10000 }
        }
      }
    },
    required: ['watched']
  }
}

module.exports = { createSnapshotScheme }

