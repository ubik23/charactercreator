(function(){
    console.log("loadalicious");
    var uiLeft = document.querySelector('#ui__left')
    var uiRightList = document.querySelectorAll('.ui__right');
    var i = uiRightList.length;
    var uiFace = document.querySelector('#ui__face');
    var uiClothing = document.querySelector('#ui__clothing');
    var uiGlobe = document.querySelector('#ui__globe');
    var uiBody = document.querySelector('#ui__body');
    var uiHead = document.querySelector('#ui__head');
    var uiBody = document.querySelector('#ui__body');
    var uiExport = document.querySelector('#ui__export');
    function uiRightHide() {
        [].forEach.call(uiRightList, function(a){
                a.classList.remove('ui--open');
        });
        [].forEach.call(uiRightList, function(a){
                a.classList.remove('ui__right--open');
        });
    }
    while (i--){
        console.log(uiRightList[i]);
    }
    uiLeft.classList.toggle('ui--open');
    uiFace.addEventListener('click', function(evt) {
        evt.preventDefault();
        uiRightHide();
        uiHead.classList.toggle('ui__right--open');
        uiHead.classList.toggle('ui--open');
    })
    uiClothing.addEventListener('click', function(evt) {
        evt.preventDefault();
        uiRightHide();
        uiBody.classList.toggle('ui__right--open');
        uiBody.classList.toggle('ui--open');
    })
    uiGlobe.addEventListener('click', function(evt) {
        evt.preventDefault();
        uiRightHide();
        uiExport.classList.toggle('ui__right--open');
        uiExport.classList.toggle('ui--open');
    })


})()
