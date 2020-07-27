const maxAge = 7 * 24 * 60 * 60

module.exports = function (fastify) {
  return fastify.register(require('fastify-cookie'), {
    secret: "my-secret", // for cookies signature
    secure: true,
    httpOnly: false,
    expires: new Date(Date.now() + maxAge * 1000),
    maxAge,
  })
}
