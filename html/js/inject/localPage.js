
/**
 * localPage
 * 
 * in charge of local injection process.
 * 
 * @param {document} response
 * @returns {localPage}
 */
var localPage = function (response) {

    var that = this;
    this.response = response;
    this.root = document;
    this.metas = null;
    this.styles = null;
    this.scripts = null;
    this.inlineScripts = null;
    this.header = null;
    this.container = null;
    this.footer = null;
    
    /**
     * _selectAll
     * 
     * grab dom elements from response for a given selector pattern 
     * and retruns matching NodeList
     * 
     * @param {string} selector
     * @returns {NodeList}
     */
    _selectAll = function (selector) {
        return that.response.querySelectorAll(selector);
    }
    
    /**
     * _select
     * 
     * @param {string} selector
     * @returns {Node}
     */
    _select = function (selector) {
        return that.response.querySelector(selector);
    }

    /**
     * _setMetas
     * 
     * @returns {undefined}
     */
    _setMetas = function () {
        that.metas = _selectAll('meta');
    }
    
    /**
     * _isValidUrl
     * 
     * url validator returns true if the given url is valid
     * 
     * @param {string} url
     * @returns {Boolean}
     */
    _isValidUrl = function (url) {
        var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        return (regex.test(url));
    }
    
    /**
     * _getPatchedDomElement
     * 
     * patches src or href attribute to match an absolute domain url
     * 
     * @param {DomElement} element
     * @param {String} baseURI
     * @returns {DomElement}
     */
    _getPatchedDomElement = function (element, baseURI) {
        var type = _getType(element);
        if (type == '[object HTMLLinkElement]'){
            var srcAttr = element.getAttribute('href');
            var remoteLink = (_isValidUrl(srcAttr))
                ? srcAttr
                : baseURI + srcAttr;
            element.setAttribute('href', remoteLink);
        }
        if (type == '[object HTMLScriptElement]') {
            var srcAttr = element.getAttribute('src');
            var remoteLink = (_isValidUrl(srcAttr))
                ? srcAttr
                : baseURI + srcAttr;
            element.src = remoteLink;
        }
        return element;
    }
    
    /**
     * _setStyles
     * 
     * grabs external css from response
     * 
     * @returns {undefined}
     */
    _setStyles = function () {
        that.styles = _selectAll('link[type="text/css"],link[rel="stylesheet"]');
        var styles = [];
        if (that.styles) {
            var baseURI = that.styles[0].baseURI;
            for (var i = 0, len = that.styles.length; i < len; i++) {
                styles.push(_getPatchedDomElement(that.styles[i], baseURI));
            }
        }
        that.styles = styles;
        delete styles;
    }
    
    /**
     * _setScripts
     * 
     * grabs external script from response
     * 
     * @returns {undefined}
     */
    _setScripts = function () {
        that.scripts = _selectAll('script[src]');
        var scripts = [];
        if (that.scripts) {
            var baseURI = that.scripts[0].baseURI;
            for (var i = 0, len = that.scripts.length; i < len; i++) {
                scripts.push(_getPatchedDomElement(that.scripts[i], baseURI));
            }
        }
        that.scripts = scripts;
        delete scripts;
    }
    
    /**
     * _setInlineScripts
     * 
     * grabs inline scripts from response
     * 
     * @returns {undefined}
     */
    _setInlineScripts = function () {
        that.inlineScripts = _selectAll('script:not([src])');
    }

    /**
     * _setHeader
     * 
     * grabs header element from response
     * 
     * @returns {undefined}
     */
    _setHeader = function () {
        that.header = _select('header');
    }
    
    /**
     * _setContainer
     * 
     * grabs header element from response
     * 
     * @returns {undefined}
     */
    _setContainer = function () {
        that.container = _select('.wrapper');
    }

    /**
     * _setFooter
     * 
     * grabs footer element from response
     * 
     * @returns {undefined}
     */
    _setFooter = function () {
        that.footer = _select('footer');
    }

    /**
     * _inject
     * 
     * appends a single node element to local page at given anchor dom element 
     * 
     * @param {DomElement} anchor
     * @param {DomElement} node
     * @returns {undefined}
     */
    _inject = function (anchor, node) {
        anchor.appendChild(node);
    }

    /**
     * _injectMany
     * 
     * appends from NodeList to local page at given anchor dom element 
     * 
     * @param {DomElement} anchor
     * @param {DomElement} node
     * @returns {undefined}
     */
    _injectMany = function (anchor, nodes) {
        for (var i = 0, len = nodes.length; i < len; i++) {
            _inject(anchor, nodes[i]);
        }
        return this;
    }

    /**
     * _isInstanciated
     * 
     * return true if object is an instance of, verifying constructor
     * 
     * @param {object} obj
     * @returns {Boolean}
     */
    _isInstanciated = function (obj) {
        return (
            (obj != null)
            && (typeof obj == 'object')
            && (typeof obj.constructor == 'function')
        );
    }
    
    /**
     * _getType
     * 
     * return prototype name
     * 
     * @param {object} obj
     * @returns {String}
     */
    _getType = function (obj) {
        return (Object.prototype.toString.call(obj));
    }
    
    /**
     * _isArray
     * 
     * return true if obj is an array
     * 
     * @param {Mixed} obj
     * @returns {Boolean}
     */
    _isArray = function (obj) {
        return (_getType(obj) === '[object Array]');
    }
    
    /**
     * inject
     * 
     * clone dom from response and append to the given anchor
     * 
     * @param {DomElement} anchor
     * @param {DomElement || NodelList || Array of DomElement} nodes
     * @returns {localPage}
     */
    this.inject = function (anchor, nodes) {
        var objType = _getType(nodes);
        if (objType !== '[object Null]') {
            var constructorName = nodes.constructor.name;
            if (constructorName === 'NodeList' || _isArray(nodes)) {
                _injectMany(anchor, nodes);
            } else {
                _inject(anchor, nodes);
            }
        }
        return this;
    }
    
    /**
     * injectScripts
     * 
     * Clone dom externals scripts from response re-create script element.
     * Wait for the external script to be loaded before loading the next.
     * Loading process is ordered and dependencies kept.
     * 
     * @param {DomElement} anchor
     * @returns {localPage}
     */
    this.injectScripts = function (anchor) {
        if (typeof files == 'undefined') {
            var files = [];
            for (var i = 0, len = that.scripts.length; i < len; i++) {
                files.push(that.scripts[i].getAttribute('src'));
            }
        }
        function loadFile(index) {
            if (files.length > index) {
                var fileref = document.createElement('script');
                fileref.setAttribute("type", "text/javascript");
                fileref.setAttribute("src", files[index]);
                fileref.setAttribute("data-ts", new Date().getTime());
                anchor.appendChild(fileref);
                index = index + 1;
                fileref.onload = function () {
                    loadFile(index);
                }
            } else {
                console.info('Scripts loaded');
            }
        }
        loadFile(0);
        return this;
    }
    
    /**
     * injectInlineScripts
     * 
     * Clone dom internal scripts from response re-create script element.
     * Set both innerHTML & innerText properties.
     * Append to local page for a given anchor.
     * 
     * @param {DomElement} anchor
     * @returns {localPage}
     */
    this.injectInlineScripts = function (anchor) {
        for (var i = 0, len = that.inlineScripts.length; i < len; i++) {
            var inlineScript = document.createElement('script');
            inlineScript.setAttribute('type', 'text/javascript');
            inlineScript.setAttribute('data-ts', new Date().getTime());
            inlineScript.innerHTML = that.inlineScripts[i].innerHTML;
            inlineScript.innerText = that.inlineScripts[i].innerText;
            anchor.appendChild(inlineScript);
        }
        return this;
    }
    
    /**
     * init
     * 
     * grabs and set relevant properties from response
     * 
     * @returns {localPage}
     */
    this.init = function () {
        _setMetas();
        _setStyles();
        this.styles = that.styles;
        _setScripts();
        this.scripts = that.scripts;
        _setInlineScripts();
        this.inlineScripts = that.inlineScripts;
        _setHeader();
        _setContainer();
        _setFooter();
        return this;
    }

    /**
     * main
     * 
     * start process if response is valid
     */
    if (typeof this.response !== 'undefined') {
        this.init();
    }
}