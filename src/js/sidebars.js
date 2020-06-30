
function showSidebarLeft () {
  var sidebarLeft = document.querySelector('#sidebar-left')
  sidebarLeft.classList.add('visible')
}

function hideSidebarLeft () {
  var sidebarLeft = document.querySelector('#sidebar-left')
  sidebarLeft.classList.remove('visible')
}

function clearSidebarLeft () {
  var sidebarLeft = document.querySelector('#sidebar-left')
  sidebarLeft.innerHTML = ''
}

function showSidebarRight () {
  var sidebarLeft = document.querySelector('#sidebar')
  sidebarLeft.classList.add('visible')
}

function hideSidebarRight () {
  var sidebarLeft = document.querySelector('#sidebar')
  sidebarLeft.classList.remove('visible')
}

function clearSidebarRight () {
  var sidebarContent = document.querySelector('#content_1')
  var sidebarRight = document.querySelector('#sidebar')
  sidebarRight.classList.remove('visible')
  sidebarContent.innerHTML = ''
}
