"use strict"

// NO GLOBALS
// USES DOM

const showSidebarLeft = () => document.querySelector('#sidebar-left').classList.add('visible')

const hideSidebarLeft = () => document.querySelector('#sidebar-left').classList.remove('visible')

const clearSidebarLeft = () => document.querySelector('#sidebar-left').innerHTML = ''

const showSidebarRight = () => document.querySelector('#sidebar').classList.add('visible')

const hideSidebarRight = () => document.querySelector('#sidebar').classList.remove('visible')

function clearSidebarRight () {
  document.querySelector('#content_1').innerHTML = ''
  document.querySelector('#sidebar').classList.remove('visible')
}
