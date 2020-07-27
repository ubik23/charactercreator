'use strict'

// npm
const PDFDocument = require('pdfkit')
const s2pdf = require("svg-to-pdfkit")
const sharp = require('sharp')
const fastify = require('fastify')({ logger: true })

// self
require("./cookie")(fastify)

fastify.register(require('fastify-formbody'))

// /receiver
fastify.post("/", (request, reply) => {
  if (request.body.el)
    return reply.setCookie("form", JSON.stringify(request.body), { path: "/", signed: true }).redirect(303, "../../")
  reply.send("Form content is somehow invalid")
})

// /convert/png
fastify.post('/png', async (request, reply) => {
  reply.type("image/png")
  return sharp(Buffer.from(request.body.svg)).png().toBuffer()
})

// /convert/pdf
fastify.post('/pdf', async (request, reply) => {
  const doc = new PDFDocument()
  s2pdf(doc, request.body.svg, 0, 0)
  doc.on('pageAdded', () => doc.text("More content, page 2??"))
  doc.addPage()
  reply.type("application/pdf")
  doc.end()
  return doc
})

fastify.listen(3000, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
