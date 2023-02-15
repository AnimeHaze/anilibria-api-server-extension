const { Schema, model } = require('mongoose')

const snapshotSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  watched: {
    type: Object,
    required: false,
    default: []
  },
  settings: {
    type: Object,
    properties: {
      playTorrents: { type: Boolean },
      videoBuffer: { type: Number, min: 0, max: 10000 },
      enableOpeningSkipButton: { type: Boolean },
      openingSkipTime: { type: Number, min: 0, max: 10000 },
      autoPlayNext: { type: Boolean, default: false },
      showSystemNotifications: { type: Boolean },
      staticEndpoint: { type: String, minlength: 3, maxlength: 64 },
      apiEndpoint: { type: String, minlength: 3, maxlength: 64 },
      autoUpdateReleases: { type: Boolean },
      autoUpdateInterval: { type: Number, min: 0, max: 10000 }
    }
  }
}, {
  autoIndex: true,
  timestamps: true
})

module.exports = { snapshotModel: model('snapshot', snapshotSchema) }
