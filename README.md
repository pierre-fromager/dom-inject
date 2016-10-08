# dom-inject

#### Weary using iframe and postMessage ?
    
#### &nbsp;&nbsp; ...try dom injection !

&nbsp;&nbsp; **dom-inject** is a *vanilla js* , *ES5* , lightweight & fast & furious.

&nbsp;&nbsp; No dependencies required.

&nbsp;&nbsp; 2 libs (localPage, remotePage) let you inject external resources to local page.

&nbsp;&nbsp; Both libs have fluent interfaces.

&nbsp;&nbsp; *Xhr request* usage implies *cross domain origin policy* to be set.

&nbsp;&nbsp; You can easily set it with a *specific header* from yours 
favourite languages or middlewares.

&nbsp;&nbsp; Keep in mind you need to trust a single domain or a domain list 
from the remote.


## Js Libs

### remotePage.js

&nbsp; Xhr mechanism to set remote Dom into the response as a document.

#### 4 public methods 

* setMethod
* setUrl
* setCallback
* load

### localPage.js

&nbsp; Inject remote doms into the local document.

#### 4 public methods

* inject 
* injectScript
* injectInlineScripts
* setExclude
    
## Use Case

* main.js

## Storyboard

&nbsp; When local dom page is ready **remotePage** instance request xhr onto target url.

&nbsp; **remotePage** response is passed to **localPage** contructor instance as first parameter.

&nbsp; **localPage** parses response and create the relevant elements matching the response with inject appropriated method.
    
## Compliancy

&nbsp; **Dom-inject** has been tested on

* *Windows*, *Osx*, *Linux*.
* *Chrome*, *Firefox*, *Safari*, *Edge*.

## Conclusion

&nbsp; Hoping this to be helpful, i share it gracefully, thanks to post your feedback to <www@pier-infor.fr>

&nbsp; **Enjoy !**