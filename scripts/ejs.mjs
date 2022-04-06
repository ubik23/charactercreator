"use strict"

// core
// const { promisify } = require("util")
// const { rename, readFile, writeFile } = require('fs').promises
// const { createHash } = require('crypto')
import { promisify } from "node:util"
import { rename, readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'

// npm
// const ejs = require("ejs")
// const CleanCSS = require("clean-css")
//const { build } = require('esbuild')
// const { byIso: country } = require("country-code-lookup")
import ejs from "ejs"
import CleanCSS from "clean-css"
import { build } from 'esbuild'
import { byIso as country } from "country-code-lookup"
import { loadJsonFileSync } from 'load-json-file'

// self
// const data = require("../config.json")
// const patrons = require("../members.json")
const data = loadJsonFileSync("config.json")

let patrons
try {
  patrons = loadJsonFileSync("members.json")
  for (let r in patrons) {
    patrons[r] = patrons[r].map((x) => ({
      ...x,
      country: x.country && country(x.country).country
    }))
  }
} catch (e) {
  if (e.code === "ENOENT") {
    console.error("Add 'members.json' file to project root to handle patrons automatically.")
  } else {
    console.error("EEE", e)
    process.exit(22)  
  }
}

const re = /[^a-z0-9]+/g
const renderFile = promisify(ejs.renderFile)
const miniCss = new CleanCSS({ returnPromise: true })

const files = {
  js: "src/dist/all.js",
  css: "src/dist/styles.css",
}

const sig = (fn) => readFile(fn, "utf-8")
  .then((fc) => createHash('sha256').update(fc)
      .digest("base64")
      .toLowerCase()
      .replace(re, '')
      .slice(0, 6)
  )

Promise.all([
  sig(files.js),
  sig(files.css),
])
.then(([sigJs, sigCss]) => {
  const filenameJs = `src/dist/all.${sigJs}.js`
  const filenameCss = `src/dist/styles.${sigCss}.css`
  const tiers = ["Star", "Creator", "Supporting Actor", "Participant", "Extras", "Contributor"]
  return Promise.all([
    renderFile(
      "src/templates/index.html",
      { ...data, patrons, tiers, sigJs, sigCss }
    ),
    filenameJs,
    filenameCss,
    rename("src/dist/all.js", filenameJs),
    rename("src/dist/styles.css", filenameCss),
  ])
})
.then(async ([html, filenameJs, filenameCss]) => {
  const p = [
    readFile(filenameCss, "utf-8"),
    filenameCss,
  ]

  // FIXME: don't minify on Mac due to esbuild bug
  if (process.platform !== "darwin") p.push(
    build({
      entryPoints: [filenameJs],
      outfile: filenameJs.replace(/^src\//, "prod/"),
      minify: true,
    })
  )
  p.push(writeFile("src/index.html", html))

  return Promise.all(p)
})
.then(([css, filenameCss]) => Promise.all([
  miniCss.minify(css),
  filenameCss,
]))
.then(([{ stats, styles }, filenameCss]) => {
  const p = [
    stats,
  ]
  if (process.platform !== "darwin") p.push(
    writeFile(filenameCss.replace(/^src\//, "prod/"), styles)
  )

  return Promise.all(p)
})
.then(([stats]) => console.log("css-stats", stats))
.catch(console.error)
