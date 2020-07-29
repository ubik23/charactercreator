/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict'

function parseFormCookie() {
  const pairs = document.cookie.split(/; */)
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i]
    let eq_idx = pair.indexOf('=')
    if ((eq_idx < 0) || (pair.substr(0, eq_idx).trim() !== "form")) continue
    let val = pair.substr(++eq_idx, pair.length).trim()
    if ('"' == val[0]) val = val.slice(1, -1)
    return JSON.parse(decodeURIComponent(val).split(".").slice(0, -1).join("."))
  }
  return {}
}
