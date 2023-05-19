'use strict'

// npm
// const PDFDocument = require('pdfkit')
// const s2pdf = require("svg-to-pdfkit")
const { customAlphabet } = require('nanoid/async')
const { nolookalikesSafe } = require('nanoid-dictionary')
const fetch = require("node-fetch")

const nanoid = customAlphabet(nolookalikesSafe)

/*
async function run() {
  const n20 = await nanoid(20)
  const n15 = await nanoid(15)
  const n10 = await nanoid(10)

  console.log(20, n20)
  console.log(15, n15)
  console.log(10, n10)
}

run().catch(console.error)
*/

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
  const website_id = setup.ramp_website_id
  const { user_id, code } = request.body.confirmed

  const response = await fetch(`https://ramp.com/status/${website_id}/${user_id}/${code}`)
  let json
  if (response.ok) {
    json = await response.json()
  }

  console.log("fastify.post('/png')-json", json)

  // "status": "Not redeemed." // or "Redeemed." or "Not found."
  if (!json || json.status !== "Redeemed.") throw new Error("Reward not redeemed.")
  
  reply.type("image/png")
  return sharp(Buffer.from(request.body.svg)).png().toBuffer()
})


fastify.put("/ramp", async(request, reply) => {
  const website_id = setup.ramp_website_id
  const user_id = await nanoid()
  const response = await fetch(`https://rewarded-user.herokuapp.com/code/${website_id}/${user_id}`)
  if (!response.ok) return { ok: false }
  const json = await response.json()
  console.log("fastify.post('/pro/ramp')-json", json)
  if (json.user_id !== user_id) return { ok: false }
  if (json.error) return { ...json, ok: false }
  return {
    ...json,
    ok: true,
  }
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
