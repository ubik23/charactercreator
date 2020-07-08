'use strict'

const { readFile, readdir } = require('fs').promises

async function run() {
  const la = await readFile("scripts/all-functions.txt", "utf-8")
  const la2x = la.split("\n").filter(Boolean)
  return la2x.map((la2) => {
    const la3  = la2.split(":")
    const filename = la3[0].slice(7)
    const [, funcname] = la3[1].split(" ")
    return [funcname, filename]
  })
}

async function externals(path) {
  console.log("digraph calls {")
  const [files, its] = await Promise.all([readdir(path), run()])
  for (const file of files) {
    const fc = await readFile(path + file, "utf-8")
    for (const sti of its) {
      const re = new RegExp(`${sti[0]}[(,)]`)
      if (re.test(fc)) {
        if (file !== sti[1]) console.log(`"${sti[1]}"`, "->", `"${file}";`)
      }
    }
  }
  console.log("overlap=false")
  console.log("}")
}

externals("src/js/").catch(console.error)
// neato -Tpng hop.dot > thisfile.png
