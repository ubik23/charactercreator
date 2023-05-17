'use strict'

const { formUrl, secret, extraPort, proVersion, ramp_website_id } = require("../config.json")

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
 
setup.proVersion = proVersion === "true"
setup.ramp_website_id = ramp_website_id
setup.formUrl = formUrl
setup.extraPort = extraPort || 3000
module.exports = setup

