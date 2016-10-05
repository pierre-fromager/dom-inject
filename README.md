# dom-inject

#### Weary using iframe and postMessage ?
    
#### &nbsp;&nbsp; ...try dom injection !

&nbsp;&nbsp; **dom-inject** is a *vanilla js* , *ES5* , 2 libs implementation that let you remote dom injection from external source to a local page.

&nbsp;&nbsp; *Xhr request* usage implies *cross domain origin policy* to be set.

&nbsp;&nbsp; You can easily set it with a *specific header* from yours favourite languages or middlewares.

&nbsp;&nbsp; Keep in mind you need to trust a single domain or a domain list from the remote.


## Js Libs

### common.js

&nbsp; is ready function, means Dom Ready.

### remotePage.js

&nbsp; is Xhr mechanism to set remote Dom into the response as a document.

&nbsp; The interface is fluent for methods chaining.

#### 4 public methods 

* setMethod
* setUrl
* setCallback
* load

### localPage.js

#### 2 public methods

* inject 
* injectScript
    
## Use Case

* runInject.js

## Storyboard

&nbsp; When local dom page is ready **remotePage** instance request xhr onto target url.

&nbsp; **remotePage** response is passed to **localPage** contructor instance as first parameter.

&nbsp; **localPage** parses response and create the relevant elements matching the response with inject method.

&nbsp; Scripts need a specific treatment because of *dom re-create requirement* with a onload bind event to allow
&nbsp; them to be injected keeping the rolling dependencies order.

    
## Compliancy

&nbsp; **Dom-inject** has been tested on

* *Windows*, *Osx*, *Linux*.
* *Chrome*, *Firefox*, *Safari*, *Edge*.

## Conclusion

&nbsp; Hoping this to be helpful, i share it gracefully, thanks to post your feedback to <www@pier-infor.fr>

&nbsp; **Enjoy !**