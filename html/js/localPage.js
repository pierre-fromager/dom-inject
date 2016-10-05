var localPage = function (response) {

    var that = this;
    this.response = response;
    this.root = document;
    this.metas = null;
    this.styles = null;
    this.scripts = null;
    this.header = null;
    this.container = null;
    this.footer = null;

    _selectAll = function (selector) {
        return that.response.querySelectorAll(selector);
    }

    _select = function (selector) {
        return that.response.querySelector(selector);
    }

    _setMetas = function () {
        that.metas = _selectAll('meta');
    }

    _isValidUrl = function (str) {
        var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        return (regex.test(str));
    }
    
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
            element.setAttribute('src', remoteLink);
            element.setAttribute('type', 'text/javascript');
        }

        var ts = new Date().getTime();
        element.setAttribute('data-ts', ts);
        return element;
    }

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

    _setHeader = function () {
        that.header = _select('header');
    }

    _setContainer = function () {
        that.container = _select('.wrapper');
    }

    _setFooter = function () {
        that.footer = _select('footer');
    }

    _inject = function (anchor, node) {
        console.log('Injecting a ' + _getType(node));
        anchor.appendChild(node);
    }

    _injectMany = function (anchor, nodes) {
        for (var i = 0, len = nodes.length; i < len; i++) {
            _inject(anchor, nodes[i]);
        }
        return this;
    }

    _isInstanciated = function (obj) {
        return (
            (obj != null)
            && (typeof obj == 'object')
            && (typeof obj.constructor == 'function')
        );
    }
    
    _getType = function (obj) {
        return (Object.prototype.toString.call(obj));
    }
    
    _isArray = function (obj) {
        return (_getType(obj) === '[object Array]');
    }

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

    this.init = function () {
        _setMetas();
        _setStyles();
        this.styles = that.styles;
        _setScripts();
        this.scripts = that.scripts;
        _setHeader();
        _setContainer();
        _setFooter();
        return this;
    }

    if (typeof this.response !== 'undefined') {
        this.init();
    }

}