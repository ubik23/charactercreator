
function showTutorial (step) {
  var el = document.querySelector('.tutorial__' + step)
  hideTutorial()
  el.classList.add('tutorial__show')
  tutorialPosition(step)
}

function hideTutorial () {
  var el = document.querySelector('.tutorial__show')
  if (el) {
    el.classList.remove('tutorial__show')
    el.classList.add('tutorial__step--seen')
  }
}

function tutorialPosition (step) {
  var el = document.querySelector('.tutorial__' + step)
  var bbox = el.getBoundingClientRect()
  var w = window.innerWidth
  var h = window.innerHeight
  var gmenu
  var sideBarRight = document.querySelector('.sidebar-right')
  var sideBarLeft = document.querySelector('.sidebar-left')
  var sideBarLeftBBox
  var randomBtn
  var horizontalMenu

  if (step === 'sex') {
    el.style.top = (h/3) * 2 + 'px'
    el.style.left = (w/2) - (bbox.width / 2) + 'px'
  }
  if (step === 'skin') {
    gmenu = document.querySelector('.skin-color__container')
    el.style.top = (gmenu.getBoundingClientRect().top - bbox.height - 20) + 'px'
    el.style.left = (w/2) - (bbox.width / 2) + 'px'
  }
  if (step === 'category') {
    sideBarLeftBBox = sideBarLeft.getBoundingClientRect()
    el.style.top = (sideBarLeftBBox.bottom - bbox.height) + 'px'
    el.style.left = (sideBarLeftBBox.right + 10) + 'px'
  }
  if (step === 'items') {
    sideBarRightBBox = sideBarRight.getBoundingClientRect()
    el.style.top = (sideBarRightBBox.bottom - bbox.height) + 'px'
    el.style.left = (sideBarRightBBox.x - bbox.width - 20) + 'px'
  }
  if (step === 'colors') {
    sideBarRightBBox = sideBarRight.getBoundingClientRect()
    el.style.top = (sideBarRightBBox.top + 20) + 'px'
    el.style.left = (sideBarRightBBox.x - bbox.width - 20) + 'px'
  }
  if (step === 'random') {
    randomBtn = document.querySelector('.bigRedBtn')
    el.style.top = (randomBtn.getBoundingClientRect().top - bbox.height - 20) + 'px'
    el.style.left = (w/2) - (bbox.width / 2) + 'px'
  }
  if (step === 'register') {
    // Check the screen size to see if there's a hamburger menu
    // If no hamburger menu, then point to the top right menu
    if (w < 992) {
      horizontalMenu = document.querySelector('.icon-hamburger')
      el.style.top = (horizontalMenu.getBoundingClientRect().bottom + 20) + 'px'
      el.style.left = w - (bbox.width / 2) + 'px'
    } else {
      horizontalMenu = document.querySelector('#horizontal')
      el.style.top = (horizontalMenu.getBoundingClientRect().bottom + 20) + 'px'
      el.style.left = w - (bbox.width / 2) + 'px'
    }
  }
}
