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
        that.container = _select('.container');
    }
    
    _setFooter = function () {
        that.footer = _select('footer');
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