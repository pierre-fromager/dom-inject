

/**
 * remotePage
 * 
 * in charge of remote dom grabing trough Xhr request.
 * 
 * @returns {remotePage}
 */
var remotePage = function () {
    
    this.method = 'GET';
    this.url = null;
    this.response = null;
    this.callback = null;
    this.failCallback = null;
    this.debug = true;
    this.responseType = 'document'; 
    
    /**
     * setMethod
     * 
     * @param {String} method
     * @returns {remotePage}
     */
    this.setMethod = function (method) {
        this.method = method;
        return this;
    }
    
    /**
     * setCallback
     * 
     * @param {Function} callback
     * @returns {remotePage}
     */
    this.setCallback = function (callback) {
        this.callback = callback;
        return this;
    }
    
    /**
     * setUrl
     * 
     * @param {String} url
     * @returns {remotePage}
     */
    this.setUrl = function (url) {
        this.url = url;
        return this;
    }
    
    /**
     * setDebug
     * 
     * @param {Boolean} active
     * @returns {remotePage}
     */
    this.setDebug = function (active) {
        this.debug = active;
        return this;
    }
    
    /**
     * setResponse
     * 
     * @param {Boolean} active
     * @returns {remotePage}
     */
    this.setResponse = function (response) {
        this.response = response;
        return this;
    }
    
    /**
     * getResponse
     * 
     * @returns {document}
     */
    this.getResponse = function () {
        return this.response;
    }
    
    /**
     * _readyStateLabels
     * 
     * @type Array
     */
    var _readyStateLabels = [
        'unsent' , 'opened' , 'headers received' , 'loading' , 'done'
    ]

    /**
     * load
     * 
     * @returns {undefined}
     */
    this.load = function () {
        var xhr = new XMLHttpRequest();
        var that = this;
        xhr.onload = function () {
            that.setResponse(this.responseXML);
            if (typeof that.callback === 'function') {
                that.callback();
            }
        }
        
        xhr.onerror = function () {
            if (typeof that.failCallback === 'function') {
                that.failCallback();
            }
        }
        
        xhr.onreadystatechange = function () {
            if (that.debug) {
                console.info('state : ' + _readyStateLabels[this.readyState]);
            }
            if (this.readyState == 4 && this.status == 200) {
                //document.getElementById("demo").innerHTML = this.responseText;
            }
        };
        xhr.open(this.method, this.url);
        //xhr.setRequestHeader('x-ms-blob-type', 'BlockBlob')
        //xhr.setRequestHeader('x-ms-blob-content-type', 'image/png');
        xhr.responseType = this.responseType;
        xhr.send();
    }
}