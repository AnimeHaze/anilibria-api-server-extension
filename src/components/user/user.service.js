const userModel = Symbol('user')

class UserService {
  constructor(model) {
    this[userModel] = model
  }

  auth (userId, username) {
    return this[userModel].findOneAndUpdate({
      userId
    }, { userId, username }, { upsert: true, new: true })
  }
}

function userService (model) {
  return new UserService(model)
}

module.exports = { userService }

