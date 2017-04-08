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

    function uiRightHide(target) {
        [].forEach.call(uiRightList, function(a){
                if (a != target){
                    a.classList.remove('ui--open');
                    a.classList.remove('ui__right--open');
                }
        });
    }
    function animateLogo(){
        var logo = document.querySelector('#ui__main');
        var leftUI = document.querySelector('#ui__left');
        var logoBBox = logo.getBoundingClientRect();
        var windowWidth = window.innerWidth;
        var distance = (windowWidth / 2) - (logoBBox.right -logoBBox.left);
        leftUI.style.transform = 'translate3d(' + distance + 'px, 0, 0)';

        console.log('distance', distance);
    }
    //uiLeft.classList.toggle('ui--open');
    animateLogo();
    uiMain.addEventListener('click', function(evt) {
        evt.preventDefault();
        uiRightHide(uiHud);
        uiHud.classList.toggle('ui__right--open');
        uiHud.classList.toggle('ui--open');
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
