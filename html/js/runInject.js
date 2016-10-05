var rpInstance, lpInstance;


function deferedScripts(anchor) {
    lpInstance.inject(anchor, lpInstance.scripts);
}

function rpCallback() {
    lpInstance = new localPage(rpInstance.getResponse());
    var head = document.querySelector('head');
    lpInstance.inject(head, lpInstance.styles);
    lpInstance.injectScripts(head);
    var body = document.querySelector('body');
    lpInstance.inject(body, lpInstance.container);
}

function init() {
    rpInstance = new remotePage();
    rpInstance.setMethod('GET')
        .setUrl('http://laraops.pier-infor.fr/')
        .setCallback(rpCallback)
        .load();
}

ready(init);