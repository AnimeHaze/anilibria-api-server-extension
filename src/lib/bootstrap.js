const { startServer } = require('../components/server')
const databaseConnect = require('./database')

const { diContainer } = require('@fastify/awilix')
const { asFunction, Lifetime, asClass } = require('awilix')
const { userModel, userService } = require('../components/user')
const { anilibriaService } = require('../components/anilibria/anilibria')
const { snapshotModel, snapshotService } = require('../components/snapshot')

diContainer.register({
  userModel: asFunction(() => userModel, {
    lifetime: Lifetime.SINGLETON
  }),
  userService: asFunction(({ userModel }) => userService(userModel), {
    lifetime: Lifetime.SINGLETON
  }),
  snapshotModel: asFunction(() => snapshotModel, {
    lifetime: Lifetime.SINGLETON
  }),
  snapshotService: asFunction(({ snapshotModel }) => snapshotService(snapshotModel), {
    lifetime: Lifetime.SINGLETON
  }),
  anilibriaService: asFunction(() => anilibriaService, {
    lifetime: Lifetime.SINGLETON
  })
})

async function main () {
  databaseConnect(process.env.MONGODB_URI, console)
  await startServer()
}

main()
