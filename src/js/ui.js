(function(){
    var uiLeft = document.querySelector('#ui__left')
    var uiRightList = document.querySelectorAll('.ui__right');
    var uiFace = document.querySelector('#ui__face');
    var uiClothing = document.querySelector('#ui__clothing');
    var uiGlobe = document.querySelector('#ui__globe');
    var uiBody = document.querySelector('#ui__body');
    var uiHead = document.querySelector('#ui__head');
    var uiBody = document.querySelector('#ui__body');
    var uiExport = document.querySelector('#ui__export');
    var uiSex = document.querySelector('#ui__sex');
    var uiMain = document.querySelector('#ui__main');
    var uiHud = document.querySelector('#ui__hud');
    var logo = document.querySelector('#ui__main');
    var leftUI = document.querySelector('#ui__left');
    var logoBBox = logo.getBoundingClientRect();
    var faceBBox = uiFace.getBoundingClientRect();
    var logoWidth = logoBBox.right - logoBBox.left;
    var faceWidth = faceBBox.right - faceBBox.left;
    var leftUIBBox = leftUI.getBoundingClientRect();
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var moveX = (windowWidth / 2) - (logoWidth / 2) - logoBBox.left;
    var moveY = (windowHeight / 2) - (logoWidth / 2) - logoBBox.top;
    var scale = faceWidth / logoWidth;

    function uiRightHide(target) {
        [].forEach.call(uiRightList, function(a){
                if (a != target){
                    a.classList.remove('ui--open');
                    a.classList.remove('ui__right--open');
                }
        });
    }
    function positionLogo(){
        leftUI.style.transform = 'translate3d(' + moveX + 'px, ' + moveY + 'px , 0)';
        logo.style.opacity = '1';
    }
    function animateLogo(){
        leftUI.style.transition = 'transform 0.2s ease-in-out';
        leftUI.style.transform = 'translate3d(0, 0, 0)';
        logo.style.transform = 'scale(' + scale + ')';
    }
    //uiLeft.classList.toggle('ui--open');
    positionLogo();
    uiMain.addEventListener('click', function(evt) {
        animateLogo();
        //evt.preventDefault();
        //uiRightHide(uiHud);
        //uiHud.classList.toggle('ui__right--open');
        //uiHud.classList.toggle('ui--open');
    })
    uiSex.addEventListener('click', function(evt) {
        evt.preventDefault();
        uiRightHide(uiSex);
        uiSex.classList.toggle('ui--fe');
    })
    uiFace.addEventListener('click', function(evt) {
        evt.preventDefault();
        uiRightHide(uiHead);
        uiHead.classList.toggle('ui__right--open');
        uiHead.classList.toggle('ui--open');
    })
    uiClothing.addEventListener('click', function(evt) {
        evt.preventDefault();
        uiRightHide(uiBody);
        uiBody.classList.toggle('ui__right--open');
        uiBody.classList.toggle('ui--open');
    })
    uiGlobe.addEventListener('click', function(evt) {
        evt.preventDefault();
        uiRightHide(uiExport);
        uiExport.classList.toggle('ui__right--open');
        uiExport.classList.toggle('ui--open');
    })
})()
