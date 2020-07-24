'use strict'

// core
const { join } = require('path')

// npm
const fastify = require('fastify')({ logger: true })

fastify.register(require('fastify-static'), {
  root: join(__dirname, "../src")
})

fastify.register(require('fastify-http-proxy'), {
  upstream: 'http://localhost:3000',
  prefix: '/convert/',
})

fastify.listen(5000, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
