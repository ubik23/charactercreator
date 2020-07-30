"use strict"

// NO GLOBALS
// USES DOM

function showSidebarLeft () => document.querySelector('#sidebar-left').classList.add('visible')

function hideSidebarLeft () => document.querySelector('#sidebar-left').classList.remove('visible')

function clearSidebarLeft () => document.querySelector('#sidebar-left').innerHTML = ''

function showSidebarRight () => document.querySelector('#sidebar').classList.add('visible')

function hideSidebarRight () => document.querySelector('#sidebar').classList.remove('visible')

function clearSidebarRight () {
  document.querySelector('#content_1').innerHTML = ''
  document.querySelector('#sidebar').classList.remove('visible')
}
