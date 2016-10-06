
/**
 * @type remotePage
 */
var rpInstance;

/**
 * @type localPage
 */
var lpInstance;

/**
 * rpCallback
 * 
 * callback function for rpInstance in charge of localpage injection
 * 
 * @returns {undefined}
 */
function rpCallback() {
    lpInstance = new localPage(rpInstance.getResponse());
    var head = document.querySelector('head');
    lpInstance.injectInlineScripts(head);
    lpInstance.inject(head, lpInstance.styles);
    lpInstance.injectScripts(head);
    var body = document.querySelector('body');
    lpInstance.inject(body, lpInstance.container);
}

/**
 * init
 * 
 *  is Dom Ready Callback in charge of remotePage instanciation
 * 
 * @returns {undefined}
 */
function init() {
    rpInstance = new remotePage();
    rpInstance.setMethod('GET').setUrl('http://laraops.pier-infor.fr/about')
        .setCallback(rpCallback).load();
}

/**
 * ready
 * 
 * dom ready listener
 * 
 * @param {function} readyCallback
 * @returns {undefined}
 */
function ready(readyCallback) {
    if (document.readyState != 'loading') {
        readyCallback();
    } else {
        document.addEventListener('DOMContentLoaded', readyCallback);
    }
}

/**
 * main
 */
ready(init);