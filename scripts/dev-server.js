'use strict'

// core
const { join } = require('path')

// npm
const fastify = require('fastify')({ logger: true })

// self
require("./cookie")(fastify)
const { formUrl } = require("../config.json")

fastify.register(require('fastify-static'), { root: join(__dirname, "../src") })

fastify.register(require('fastify-http-proxy'), {
  upstream: 'http://localhost:3000',
  prefix: '/convert/',
})

if (formUrl) {
  fastify.register(require('fastify-http-proxy'), {
    upstream: 'http://localhost:3000',
    prefix: '/receiver',
  })

  fastify.get("/", (request, reply) => {
    const formCookie = request.cookies.form
    if (!formCookie) return reply.redirect(formUrl)
    try {
      const form = JSON.parse(reply.unsignCookie(request.cookies.form))
      if (!form.el) return reply.redirect(formUrl)
      reply.sendFile("index.html")
    } catch (e) {
      reply.send(e)
    }
  })

  /*
  fastify.get("/", (request, reply) => {
    const formCookie = request.cookies.form
    if (!formCookie) return reply.redirect(formUrl)
    try {
      const form = JSON.parse(reply.unsignCookie(request.cookies.form))
      if (!form.el) return reply.redirect(formUrl)
      reply.sendFile("index.html")
    } catch (e) {
      reply.send(e)
    }
  })
  */

  fastify.get("/fake-form", async (request, reply) => {
    reply.type("text/html")
    return `<form method="post" action="/receiver">
    <label>Name: <input type="text" name="name" /></label>
    <label>Stuff: <input type="text" name="stuff" /></label>
    <label>El: <input type="text" name="el" value="one el to go" /></label>
    <button type="submit">Send form</button>
    </form>`
  })
}

fastify.listen(5000, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
