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
    
    _selectAll = function(selector){
        return that.response.querySelectorAll(selector);
    }
    
    _select = function(selector){
        return that.response.querySelector(selector);
    }
    
    _setMetas = function () {
        that.metas = _selectAll('meta');
    }
    
    _setStyles = function () {
        that.styles = _selectAll('link[type="text/css"]');
    }
    
    _setScripts = function () {
        that.scripts = _selectAll('script[src]');
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
    
    _injectMany  = function (anchor, nodes) {
        nodes.forEach(
            function(element, index, array) {
                anchor.appendChild(element);
            }
        );
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