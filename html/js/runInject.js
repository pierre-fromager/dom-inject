var rpInstance, lpInstance;

function rpCallback() {
    lpInstance = new localPage(rpInstance.getResponse());
    var head = document.querySelector('head');
    lpInstance.injectInlineScripts(head);

    lpInstance.inject(head, lpInstance.styles);
    lpInstance.injectScripts(head);
    var body = document.querySelector('body');
    lpInstance.inject(body, lpInstance.container);
}

function init() {
    rpInstance = new remotePage();
    rpInstance.setMethod('GET').setUrl('http://laraops.pier-infor.fr/about')
        .setCallback(rpCallback).load();
}

ready(init);