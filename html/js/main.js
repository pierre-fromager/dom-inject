
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
    lpInstance.setExclude([
        '#content'
        //, 'span'
    ]);
    var head = document.querySelector('head');
    lpInstance
        .injectInlineScripts(head)
        .inject(head, lpInstance.styles)
        .injectScripts(head);
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
    rpInstance
        .setMethod('GET')
        .setDebug(true)
        .setUrl('http://laraops.pier-infor.fr/')
        .setCallback(rpCallback)
        .load();
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