const fastify = require('fastify')({ logger: true })
const { join } = require('path')

fastify.register(require('fastify-static'), {
  root: join(__dirname, "../src")
})

fastify.listen(5000, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
