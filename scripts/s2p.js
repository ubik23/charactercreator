'use strict'

const sharp = require('sharp')
const fastify = require('fastify')({ logger: true })

fastify.post('/', async (request, reply) => {
  reply.type("image/png")
  return sharp(Buffer.from(request.body.svg)).png().toBuffer()
})

fastify.listen(3000, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
