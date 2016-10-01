var remotePage = function () {
    this.method = 'GET';
    this.url = null;
    this.response = null;
    this.callback = null;
    /*
    this.payload = {
        metas: null
        , scripts: null
        , styles: null
        , header: null
        , container: null
        , footer: null
    }*/

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

    this.setResponse = function (response) {
        this.response = response;
        /*
        this.payload.metas = response.metas;
        this.payload.styles = response.style;
        this.payload.scripts = response.script;
        this.payload.container = response.querySelector('.container');
        this.payload.header = response.querySelector('header');
        this.payload.footer = response.querySelector('footer');*/
        return this;
    }

    this.getResponse = function () {
        return this.response;
    }
    
    this.getPayload = function () {
        return this.payload;
    }

    this.load = function () {
        var xhr = new XMLHttpRequest();
        var that = this;
        xhr.onload = function () {
            that.setResponse(this.responseXML);
            if (typeof that.callback === 'function') {
                that.callback();
            }
        }
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //document.getElementById("demo").innerHTML = this.responseText;
            }
        };
        xhr.open(this.method, this.url);
        xhr.responseType = 'document';
        xhr.send();
    }
}