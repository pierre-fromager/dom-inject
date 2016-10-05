# dom-inject

>####Weary using iframe and postMessage ?
    
>#### => Try dom injection !

>>**dom-inject** is a *vanilla js* remote dom injector from external source to a local page.

>>Using *Xhr request* implies *cross domain origin policy* to be set.

>>You can easily set it with a *specific header* from yours favourite languages or middlewares.

>>Keep in mind you need to trust a single domain or a domain list from the remote.


## Js Libs

### common.js

>is ready function, means Dom Ready.

### remotePage.js

>is Xhr mechanism to set remote Dom into the response as a document.

>The interface is fluent for methods chaining.

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

>When local dom page is ready **remotePage** instance request xhr onto target url.

>**remotePage** response is passed to **localPage** contructor instance as first parameter.

>**localPage** parses response and create the relevant elements matching the response with inject method.

>Scripts need a specific treatment because of *dom re-create requirement* with a onload bind event to allow
>them to be injected keeping the rolling dependencies order.

    
## Compliancy

>Dom-inject has been tested on

>* *Windows*, *Osx*, *Linux* plateforms.
>* *Chrome*, *Firefox*, *Safari* navigators.

## Conclusion

>Hoping this to be helpful, i share it gracefully, thanks to post your feedback to <www@pier-infor.fr>

>**Enjoy !**