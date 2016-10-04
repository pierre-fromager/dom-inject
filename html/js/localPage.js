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

    _setStyles = function () {
        that.styles = _selectAll('link[type="text/css"],link[rel="stylesheet"]');
        if (that.styles) {
            var baseURI = that.styles[0].baseURI;
            for (var i = 0, len = that.styles.length; i < len; i++) {
                var element = that.styles[i];
                var hrefAttr = element.getAttribute('href');
                var remoteLink = (_isValidUrl(hrefAttr))
                    ? remoteLink
                    : baseURI + remoteLink;
                var style = document.createElement('style');
                style.setAttribute('href', remoteLink);
                that.styles[i] = style;
            }
        }
    }

    _setScripts = function () {
        that.scripts = _selectAll('script[src]');
        if (that.scripts) {
            var baseURI = that.styles[0].baseURI;
            for (var i = 0, len = that.scripts.length; i < len; i++) {
                var element = that.scripts[i];
                var srcAttr = element.getAttribute('src');
                var remoteLink = (_isValidUrl(srcAttr))
                    ? remoteLink
                    : baseURI + remoteLink;
                var script = document.createElement('script');
                script.setAttribute('src', remoteLink);
                script.setAttribute('type', 'text/javascript');
                that.scripts[i] = script;
            }
        }
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
        anchor.appendChild(node);
    }

    _injectMany = function (anchor, nodes) {
        for (var i = 0, len = nodes.length; i < len; i++) {
            anchor.appendChild(nodes[i]);
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

    this.inject = function (anchor, nodes) {
        if (_isInstanciated(nodes)) {
            var constructoName = nodes.constructor.name;
            if (constructoName === 'NodeList') {
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
        _setScripts();
        _setHeader();
        _setContainer();
        _setFooter();
        return this;
    }

    if (typeof this.response !== 'undefined') {
        this.init();
    }

}