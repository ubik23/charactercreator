'use strict'

// core
const { join } = require('path')

const rewriteUrl = (request) => {
  console.log("URL", request.url)
  if (request.url === "/api/session") return "/api/_session"
  if (request.url === "/api/users") return "/api/_users"
  if (request.url.startsWith("/api/users/")) {
    return request.url.replace("/api/users/", "/api/_users/org.couchdb.user:")
  }
  return request.url
}

// npm
const fastify = require('fastify')({
  logger: true,
  rewriteUrl
})

// self
const setup = require("./cookie")

setup(fastify)

fastify.register(require('fastify-static'), { root: join(__dirname, "../src") })

const upstream = `http://localhost:${setup.extraPort}`

fastify.register(require('fastify-http-proxy'), {
  upstream: "http://localhost:5984",
  prefix: '/api',
})

fastify.register(require('fastify-http-proxy'), {
  upstream,
  prefix: '/convert/',
})

if (setup.formUrl) {
  fastify.register(require('fastify-http-proxy'), {
    upstream,
    prefix: '/receiver',
  })

  fastify.get("/", (request, reply) => {
    const formCookie = request.cookies.form
    if (!formCookie) return reply.redirect(setup.formUrl)
    try {
      const form = JSON.parse(reply.unsignCookie(request.cookies.form))
      if (!form.emailaddress) return reply.redirect(setup.formUrl)
      reply.sendFile("index.html")
    } catch (e) {
      reply.send(e)
    }
  })

  fastify.get("/fake-form", async (request, reply) => {
    reply.type("text/html")
    return `<form method="post" action="/receiver">
    <label>Name: <input type="text" name="First Name" /></label>
    <label>Stuff: <input type="text" name="stuff" /></label>
    <label>El: <input type="text" name="emailaddress" value="one el to go" /></label>
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
