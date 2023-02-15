async function authMiddleware (req, reply) {
  const session = req.headers['x-session']
  const anilibriaService = req.diScope.resolve('anilibriaService')
  const userService = req.diScope.resolve('userService')

  if (!session || !/^[0-9a-zA-Z,-]{22,40}$/.test(session)) {
    reply
      .status(400)
      .send({ success: false, error: 'Invalid x-session' })
    return
  }

  const { status, error, data } = await anilibriaService.user(session)

  if (!status || error !== null || !data) {
    reply
      .status(400)
      .send({ success: false, error: 'Auth failed' })
    return
  }

  const { id: userId, login: username } = data

  const user = await userService.auth(userId, username)

  req.locals.user = { userId, username, _id: user._id }
}

module.exports = { authMiddleware }
