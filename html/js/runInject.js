var rpInstance, lpInstance, styles, allowChainScript;


function deferedScripts(anchor) {
    lpInstance.inject(anchor, lpInstance.scripts);
}

function rpCallback() {
    lpInstance = new localPage(rpInstance.getResponse());

    var head = document.querySelector('head');
    lpInstance.inject(head, lpInstance.styles);

    // http://stackoverflow.com/questions/807878/javascript-that-executes-after-page-load

    var body = document.querySelector('body');
    lpInstance.inject(body, lpInstance.container);
    
    lpInstance.inject(head, lpInstance.scripts);
    lpInstance.injectScripts(head);
    /*
    var testScript = document.createElement('script');
    testScript.type = 'text/javascript';
    testScript.src = 'http://laraops.pier-infor.fr/vendor/jquery/jquery-2.1.1.min.js';
    testScript.async = true;
    testScript.defer = true;
    testScript.setAttribute('data-ts',new Date().getTime());
    head.appendChild(testScript);
    console.log('jQuery version : ' + jQuery.fn.jquery);*/
    //lpInstance.inject(body, lpInstance.scripts);
}

function init() {
    rpInstance = new remotePage();
    rpInstance.setMethod('GET')
        .setUrl('http://laraops.pier-infor.fr/')
        .setCallback(rpCallback)
        .load();
    //rpPayload = rpInstance.getPayload();
}

ready(init);