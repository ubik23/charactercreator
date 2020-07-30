"use strict"

// ONLY USES hash() FROM GLOBALS
// USES DOM

function defaultEyeColor (cc, skinColor) {
  var eyeColorDict = {
    '#ffdfc4': '#6F918A', // Grey
    '#f0d5be': '#FF6600', // Amber
    '#eeceb3': '#A0892C', // Hazel
    '#e1b899': '#784421', // Light Brown
    '#e5c298': '#784421', // Light Brown
    '#ffdcb2': '#784421', // Light Brown
    '#e5b887': '#784421', // Light Brown
    '#e5a073': '#784421', // Light Brown
    '#e79e6d': '#784421', // Light Brown
    '#db9065': '#784421', // Light Brown
    '#ce967c': '#784421', // Light Brown
    '#c67856': '#784421', // Light Brown
    '#ba6c49': '#784421', // Light Brown
    '#a57257': '#784421', // Light Brown
    '#f0c8c9': '#37ABC8', // Blue
    '#dda8a0': '#AAD400', // Green
    '#b97c6d': '#552200', // Brown
    '#a8756c': '#552200', // Brown
    '#ad6452': '#552200', // Brown
    '#5c3836': '#552200', // Brown
    '#cb8442': '#552200', // Brown
    '#bd723c': '#552200', // Brown
    '#704139': '#552200', // Brown
    '#a3866a': '#552200' // Brown
  }
  const irisColor = eyeColorDict[skinColor]
  cc.choices.irisColor = irisColor
  hash.add({ irisColor })
}

function defaultHairColor (cc, skinColor) {
  var hairColorDict = {
    '#ffdfc4': '#803300', // Light brown
    '#f0d5be': '#803300', // Light brown
    '#eeceb3': '#803300', // Light brown
    '#e1b899': '#1a1a1a', // Black
    '#e5c298': '#1a1a1a', // Black
    '#ffdcb2': '#1a1a1a', // Black
    '#e5b887': '#1a1a1a', // Black
    '#e5a073': '#1a1a1a', // Black
    '#e79e6d': '#1a1a1a', // Black
    '#db9065': '#1a1a1a', // Black
    '#ce967c': '#1a1a1a', // Black
    '#c67856': '#1a1a1a', // Black
    '#ba6c49': '#1a1a1a', // Black
    '#a57257': '#1a1a1a', // Black
    '#f0c8c9': '#ffcc00', // Blond
    '#dda8a0': '#ff6600', // Red
    '#b97c6d': '#1a1a1a', // Black
    '#a8756c': '#1a1a1a', // Black
    '#ad6452': '#1a1a1a', // Black
    '#5c3836': '#1a1a1a', // Black
    '#cb8442': '#1a1a1a', // Black
    '#bd723c': '#1a1a1a', // Black
    '#704139': '#1a1a1a', // Black
    '#a3866a': '#1a1a1a' // Black
  }
  const hairColor = hairColorDict[skinColor]
  cc.choices.hairColor = hairColor
  hash.add({ hairColor })
}
