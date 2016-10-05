var rpInstance, lpInstance, styles;


function deferedScripts(anchor) {
    lpInstance.inject(anchor, lpInstance.scripts);
}

function rpCallback() {
    lpInstance = new localPage(rpInstance.getResponse());

    var head = document.querySelector('head');
    lpInstance.inject(head, lpInstance.styles);

    // http://stackoverflow.com/questions/807878/javascript-that-executes-after-page-load
    if (window.addEventListener)
        window.addEventListener("load", deferedScripts, false);
    else if (window.attachEvent)
        window.attachEvent("onload", deferedScripts);
    else
        window.onload = deferedScripts;

    var body = document.querySelector('body');
    lpInstance.inject(body, lpInstance.container);

}

function init() {
    rpInstance = new remotePage();
    rpInstance.setMethod('GET')
            .setUrl('http://laraops.pier-infor.fr/')
            .setCallback(rpCallback)
            .load();
    rpPayload = rpInstance.getPayload();
}
ready(init);