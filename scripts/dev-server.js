const fastify = require('fastify')({ logger: true })
const { join } = require('path')

fastify.register(require('fastify-static'), {
  root: join(__dirname, "../src")
})

fastify.register(require('fastify-http-proxy'), {
  upstream: 'http://localhost:3000',
  prefix: '/get-svg',
})


fastify.listen(5000, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
