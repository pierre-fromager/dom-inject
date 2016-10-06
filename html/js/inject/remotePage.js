var remotePage = function () {
    this.method = 'GET';
    this.url = null;
    this.response = null;
    this.callback = null;
    this.failCallback = null;
    this.debug = true;

    this.setMethod = function (method) {
        this.method = method;
        return this;
    }
    
    this.setCallback = function (callback) {
        this.callback = callback;
        return this;
    }

    this.setUrl = function (url) {
        this.url = url;
        return this;
    }
    
    this.setDebug = function (active) {
        this.debug = active;
        return this;
    }

    this.setResponse = function (response) {
        this.response = response;
        return this;
    }

    this.getResponse = function () {
        return this.response;
    }
    
    this.getPayload = function () {
        return this.payload;
    }
    
    var _readyStateLabels = [
        'unsent' , 'opened' , 'headers received' , 'loading' , 'done'
    ]

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
        xhr.responseType = 'document';
        xhr.send();
    }
}