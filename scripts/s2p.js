'use strict'

// npm
const PDFDocument = require('pdfkit')
const s2pdf = require("svg-to-pdfkit")
const sharp = require('sharp')
const fastify = require('fastify')({ logger: true })

/*
fastify.get('/', async (request, reply) => {
  return {
    redir: "https://www.sonatype.com/card-creator-test-page"
  }
})

fastify.post('/', async (request, reply) => {
  return {
    fromForm: "accept date",
  }
})
*/

fastify.post('/png', async (request, reply) => {
  reply.type("image/png")
  return sharp(Buffer.from(request.body.svg)).png().toBuffer()
})

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
