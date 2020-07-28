'use strict'

const { formUrl, secret, extraPort } = require("../config.json")

function setup (fastify) {
  if (!secret || !formUrl) return fastify
  fastify.register(require('fastify-cookie'), {
    secret,
    secure: true,
    httpOnly: false,
    sameSite: true,
  })

  return fastify
}
 
setup.formUrl = formUrl
setup.extraPort = extraPort || 3000
module.exports = setup

