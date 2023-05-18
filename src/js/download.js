function svgTo (type, svg, filename, confirmed) {
  console.log("svgTo-confirmed", confirmed)
  return fetch(`/convert/${type}`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      svg,
      confirmed,
    })
  })
  .then(function (res) { return res.blob() })
  .then(function (blob) {
    const a = document.createElement("a")
    const objectUrl = URL.createObjectURL(blob)
    a.href = objectUrl
    a.download = filename
    a.click()
    return objectUrl
  })
  .then(function (ou) {
    URL.revokeObjectURL(ou)
  })
  .catch(console.error)
}

function svgToPng (svg, filename, confirmed) {
  return svgTo("png", svg, filename, confirmed)
}

/*
function svgToPdf (svg, filename) {
  return svgTo("pdf", svg, filename)
}
*/

function getDownloadViewBox () {
  var viewBoxValue
  var cameraViewContainer = document.querySelector('.camera-view input:checked + label svg')
  if (cameraViewContainer) {
    viewBoxValue = cameraViewContainer.getAttribute('viewBox')
  } else {
    viewBoxValue = '10 10 540 540'
  }
  return viewBoxValue
}

function getSVG () {
  var viewBoxValue = getDownloadViewBox()
  var text = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  id="character" width="560" height="560" viewBox="' + viewBoxValue + '">\n'
  text+='<defs> Copyright (c) 2014-2020 Frederic Guimont, all rights reserved \n <a href="https://creativecommons.org/licenses/by-nc/2.0/">Distributed under the Creative Commons CC-BY-NC license</a> \n Commercial license available to patrons on https://www.patreon.com/charactercreator \n You can recreate this character using this URL: <!--'+window.location.href+'--></defs> \n'
  var svgRaw = document.getElementById('character-container').childNodes
  var svgNodes
  var svgString
  var event

  purgeHiddenLayers()

  // This previous version of the text contains all svg files shown and hidden
  // It will need to be filtered to keep only the layers needed for our purpose
  if (currentUser && currentUser.cc.personnageActuel !== '') {
    filename = currentUser.cc.personnageActuel + '.svg'
  }

  svgNodes = Array.prototype.slice.call(svgRaw)

  svgNodes.forEach(function (item) {
    // This removes only useless layers and allows us to o the next test.

    if (item.innerHTML && (!item.style || !item.style.opacity || item.style.opacity != 0)) {
      // Catch head elements that have been scaled
      svgString = '<g id="' + item.id + '" >' + item.innerHTML + '</g>'
      
      // text += svgString
      text += item.outerHTML
    }
  })

  text += '</svg>'
  return text
}

async function checkVideoReward () {
  /*
  const confirmed = confirm("Watch video")
  if (!ok) return false
  return confirmed
  */

  const response = await fetch("/pro/ramp", {
    method: "put",
    /*
    body: JSON.stringify({
      confirmed: {
        user_id, 
        code
      }
    })
    */
  })

  let json

  if (response.ok) {
    json = await response.json()
  }
  return json
}

async function download (ev) {
  ev.preventDefault()

  console.log("download-proVersion", proVersion)

  let confirmed

  if (!proVersion) {
    // there's a video reward
    confirmed = await checkVideoReward()
    console.log("confirmed?", confirmed)


    ramp.showRewardedVideo({
      code: confirmed.code,
      userId: confirmed.user_id,
      callback:(response, err) => {
        console.log("showRewardedVideo-ERR", err)
        console.log("showRewardedVideo-RESPONSE", response)
      }
    })



    if (!confirmed || !confirmed.ok) return
    /*
    console.log("confirmed?", typeof confirmed, confirmed, confirmed ? "YES" : "NO")
    if (!confirmed) return
    */
  }

  gaga('send', 'event', { eventCategory: 'Navigation', eventAction: 'Download', eventLabel: 'Download SVG file of character' })
  // TODO make the filename the character's name if possible.
  var filename = c.choices.name || 'my_character.svg'
  var pom
  var text = getSVG()
  // TODO Copy the URL before it is erased by the download function.

  const format = document.querySelector("input[name=download-format]:checked").value

  console.log("DOWNLOAD-format", format)

  if (format === "png") {
    filename = c.choices.name || 'my_character.png'

    return svgToPng(text, filename, confirmed)
      .then(function () {
        caboose()
      })
  }

  /*
  if (format === "pdf") {
    filename = c.choices.name || 'my_character.pdf'
    return svgToPdf(text, filename)
      .then(function () {
        caboose()
      })
  }
  */

  pom = document.createElement('a')
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  pom.setAttribute('download', filename)

  if (document.createEvent) {
    event = document.createEvent('MouseEvents')
    event.initEvent('click', true, true)
    pom.dispatchEvent(event)
  } else {
    pom.click()
  }
  
  caboose()
}
