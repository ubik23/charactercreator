'use strict'

// npm
// const PDFDocument = require('pdfkit')
// const s2pdf = require("svg-to-pdfkit")
const sharp = require('sharp')
const fastify = require('fastify')({ logger: true })

// self
const setup = require("./cookie")

setup(fastify)

const maxAge = 7 * 24 * 60 * 60

fastify.register(require('fastify-formbody'))

// /receiver
fastify.post("/", (request, reply) => {
  if (request.body.emailaddress)
    return reply.setCookie(
      "form",
      JSON.stringify(request.body), {
        path: "/",
        signed: true,
        expires: new Date(Date.now() + maxAge * 1000),
        maxAge,
      }
    ).redirect(303, "../../")
  reply.send("Form content is somehow invalid")
})


// /convert/png
fastify.post('/png', async (request, reply) => {
  reply.type("image/png")
  return sharp(Buffer.from(request.body.svg)).png().toBuffer()
})

/*
// /convert/pdf
fastify.post('/pdf', (request, reply) => {
  const doc = new PDFDocument()
  s2pdf(doc, request.body.svg, 0, 0)
  doc.on('pageAdded', () => doc.text("More content, page 2??"))
  doc.addPage()
  reply.type("application/pdf").send(doc)
  doc.end()
})
*/

fastify.listen(setup.extraPort, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
