"use strict"

// core
const { promisify } = require("util")
const { rename, readFile, writeFile } = require('fs').promises
const { createHash } = require('crypto')

// npm
const ejs = require("ejs")
const CleanCSS = require("clean-css")
const { build } = require('esbuild')

// self
const data = require("../config.json")

const re = /[^a-z0-9]+/g
const renderFile = promisify(ejs.renderFile.bind(ejs))

const sig = (fn) => readFile(fn, "utf-8")
  .then((fc) => createHash('sha256').update(fc)
      .digest("base64")
      .toLowerCase()
      .replace(re, '')
      .slice(0, 6)
  )

const files = {
  js: "src/dist/all.js",
  css: "src/dist/styles.css",
}

const miniCss = new CleanCSS({ returnPromise: true })

Promise.all([
  sig(files.js),
  sig(files.css),
])
.then(([sigJs, sigCss]) => {
  const filenameJs = `src/dist/all.${sigJs}.js`
  const filenameCss = `src/dist/styles.${sigCss}.css`
  return Promise.all([
    renderFile(
      "src/templates/index.html",
      { ...data, sigJs, sigCss }
    ),
    filenameJs,
    filenameCss,
    rename("src/dist/all.js", filenameJs),
    rename("src/dist/styles.css", filenameCss),
  ])
})
.then(async ([html, filenameJs, filenameCss]) => {
  const outfile = filenameJs.replace(/^src\//, "prod/")
  const outCss = filenameCss.replace(/^src\//, "prod/")
  const [css] = await Promise.all([
    readFile(filenameCss, "utf-8"),
    build({
      entryPoints: [filenameJs],
      outfile,
      minify: true,
    }),
  ])

  return Promise.all([
    miniCss.minify(css)
      .then((stuff) => Promise.all([
        stuff.stats,
        writeFile(outCss, stuff.styles)
      ])),
    writeFile("src/index.html", html),
  ])
})
.then(([[stats]]) => console.log("css-stats", stats))
.catch((e) => console.error("AYE", e))

/*
"prod": "npm run build && cp -a src/*.png src/favicon.ico src/robots.txt src/ads.txt src/layer src/credits src/index.html prod/ && esbuild --minify src/dist/all.js > prod/dist/all.js && cleancss -o prod/dist/styles.css prod/dist/styles.css",

esbuild --minify src/dist/all.js > prod/dist/all.js
cleancss -o prod/dist/styles.css prod/dist/styles.css
*/
