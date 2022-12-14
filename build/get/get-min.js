YUI.add("get",function(h,e){var r,_,a,u=h.Lang;h.Get=_={cssOptions:{attributes:{rel:"stylesheet"},doc:h.config.linkDoc||h.config.doc,pollInterval:50},jsOptions:{autopurge:!0,doc:h.config.scriptDoc||h.config.doc},options:{attributes:{charset:"utf-8"},purgethreshold:20},REGEX_CSS:/\.css(?:[?;].*)?$/i,REGEX_JS:/\.js(?:[?;].*)?$/i,_insertCache:{},_pending:null,_purgeNodes:[],_queue:[],abort:function(e){var t,s,i,n,r;if(!e.abort)if(s=e,e=null,(r=this._pending)&&r.transaction.id===s)e=r.transaction,this._pending=null;else for(t=0,n=this._queue.length;t<n;++t)if((i=this._queue[t].transaction).id===s){e=i,this._queue.splice(t,1);break}e&&e.abort()},css:function(e,t,s){return this._load("css",e,t,s)},js:function(e,t,s){return this._load("js",e,t,s)},load:function(e,t,s){return this._load(null,e,t,s)},_autoPurge:function(e){e&&this._purgeNodes.length>=e&&this._purge(this._purgeNodes)},_getEnv:function(){var e=h.config.doc,t=h.UA;return this._env={"async":e&&!0===e.createElement("script")["async"]||10<=t.ie,cssFail:9<=t.gecko||0<=t.compareVersions(t.webkit,535.24),cssLoad:(!t.gecko&&!t.webkit||9<=t.gecko||0<=t.compareVersions(t.webkit,535.24))&&!(t.chrome&&t.chrome<=18),preservesScriptOrder:!!(t.gecko||t.opera||t.ie&&10<=t.ie)}},_getTransaction:function(e,t){var s,i,n,r,o=[];for(u.isArray(e)||(e=[e]),(t=h.merge(this.options,t)).attributes=h.merge(this.options.attributes,t.attributes),s=0,i=e.length;s<i;++s){if(n={attributes:{}},"string"==typeof(r=e[s]))n.url=r;else{if(!r.url)continue;h.mix(n,r,!1,null,0,!0),r=r.url}h.mix(n,t,!1,null,0,!0),n.type||(this.REGEX_CSS.test(r)?n.type="css":(this.REGEX_JS.test(r),n.type="js")),h.mix(n,"js"===n.type?this.jsOptions:this.cssOptions,!1,null,0,!0),n.attributes.id||(n.attributes.id=h.guid()),n.win?n.doc=n.win.document:n.win=n.doc.defaultView||n.doc.parentWindow,n.charset&&(n.attributes.charset=n.charset),o.push(n)}return new a(o,t)},_load:function(e,t,s,i){return"function"==typeof s&&(i=s,s={}),(s=s||{}).type=e,s._onFinish=_._onTransactionFinish,this._env||this._getEnv(),e=this._getTransaction(t,s),this._queue.push({callback:i,transaction:e}),this._next(),e},_onTransactionFinish:function(){_._pending=null,_._next()},_next:function(){var e;this._pending||(e=this._queue.shift())&&(this._pending=e).transaction.execute(e.callback)},_purge:function(e){for(var t,s=this._purgeNodes,i=e!==s;t=e.pop();)t._yuiget_finished&&(t.parentNode&&t.parentNode.removeChild(t),i)&&-1<(t=h.Array.indexOf(s,t))&&s.splice(t,1)}},_.script=_.js,_.Transaction=a=function(e,t){var s=this;s.id=a._lastId+=1,s.data=t.data,s.errors=[],s.nodes=[],s.options=t,s.requests=e,s._callbacks=[],s._queue=[],s._reqsWaiting=0,s.tId=s.id,s.win=t.win||h.config.win},a._lastId=0,a.prototype={_state:"new",abort:function(e){this._pending=null,this._pendingCSS=null,this._pollTimer=clearTimeout(this._pollTimer),this._queue=[],this._reqsWaiting=0,this.errors.push({error:e||"Aborted"}),this._finish()},execute:function(e){var t,s,i,n,r=this,o=r.requests,a=r._state;if("done"===a)e&&e(r.errors.length?r.errors:null,r);else if(e&&r._callbacks.push(e),"executing"!==a){for(r._state="executing",r._queue=i=[],r.options.timeout&&(r._timeout=setTimeout(function(){r.abort("Timeout")},r.options.timeout)),r._reqsWaiting=o.length,t=0,s=o.length;t<s;++t)(n=o[t])["async"]||"css"===n.type?r._insert(n):i.push(n);r._next()}},purge:function(){_._purge(this.nodes)},_createNode:function(e,t,s){var i,n=s.createElement(e);for(i in r||((e=s.createElement("div")).setAttribute("class","a"),r="a"===e.className?{}:{"for":"htmlFor","class":"className"}),t)t.hasOwnProperty(i)&&n.setAttribute(r[i]||i,t[i]);return n},_finish:function(){var e,t,s,i=this.errors.length?this.errors:null,n=this.options,r=n.context||this;if("done"!==this._state){for(this._state="done",t=0,s=this._callbacks.length;t<s;++t)this._callbacks[t].call(r,i,this);e=this._getEventData(),i?(n.onTimeout&&"Timeout"===i[i.length-1].error&&n.onTimeout.call(r,e),n.onFailure&&n.onFailure.call(r,e)):n.onSuccess&&n.onSuccess.call(r,e),n.onEnd&&n.onEnd.call(r,e),n._onFinish&&n._onFinish()}},_getEventData:function(e){return e?h.merge(this,{abort:this.abort,purge:this.purge,request:e,url:e.url,win:e.win}):this},_getInsertBefore:function(e){var t,s,i=e.doc,e=e.insertBefore;return e?"string"==typeof e?i.getElementById(e):e:(e=(t=_._insertCache)[s=h.stamp(i)])||((e=i.getElementsByTagName("base")[0])?t[s]=e:(e=i.head||i.getElementsByTagName("head")[0])?(e.appendChild(i.createTextNode("")),t[s]=e.lastChild):t[s]=i.getElementsByTagName("script")[0])},_insert:function(e){var t,s,i=_._env,n=this._getInsertBefore(e),r="js"===e.type,o=e.node,a=this,u=h.UA;function c(){a._progress("Failed to load "+e.url,e)}function l(){t&&clearTimeout(t),a._progress(null,e)}o||(r?s="script":!i.cssLoad&&u.gecko?s="style":(s="link",delete e.attributes.charset),o=e.node=this._createNode(s,e.attributes,e.doc)),r?(o.setAttribute("src",e.url),e["async"]?o["async"]=!0:(i["async"]&&(o["async"]=!1),i.preservesScriptOrder||(this._pending=e))):!i.cssLoad&&u.gecko?o.innerHTML=(e.attributes.charset?'@charset "'+e.attributes.charset+'";':"")+'@import "'+e.url+'";':o.setAttribute("href",e.url),r&&u.ie&&(u.ie<9||document.documentMode&&document.documentMode<9)?o.onreadystatechange=function(){/loaded|complete/.test(o.readyState)&&(o.onreadystatechange=null,l())}:r||i.cssLoad?(10<=u.ie?(o.onerror=function(){setTimeout(c,0)},o.onload=function(){setTimeout(l,0)}):(o.onerror=c,o.onload=l),i.cssFail||r||(t=setTimeout(c,e.timeout||3e3))):this._poll(e),this.nodes.push(o),n.parentNode.insertBefore(o,n)},_next:function(){this._pending||(this._queue.length?this._insert(this._queue.shift()):this._reqsWaiting||this._finish())},_poll:function(e){var t,s,i,n,r,o=this,a=o._pendingCSS,u=h.UA.webkit;if(!e||((a=a||(o._pendingCSS=[])).push(e),!o._pollTimer)){for(o._pollTimer=null,t=0;t<a.length;++t)if(n=a[t],u){for(s=(r=n.doc.styleSheets).length,i=n.node.href;0<=--s;)if(r[s].href===i){a.splice(t,1),--t,o._progress(null,n);break}}else try{
n.node.sheet.cssRules,a.splice(t,1),--t,o._progress(null,n)}catch(c){}a.length&&(o._pollTimer=setTimeout(function(){o._poll.call(o)},o.options.pollInterval))}},_progress:function(e,t){var s=this.options;e&&(t.error=e,this.errors.push({error:e,request:t})),t.node._yuiget_finished=t.finished=!0,s.onProgress&&s.onProgress.call(s.context||this,this._getEventData(t)),t.autopurge&&(_._autoPurge(this.options.purgethreshold),_._purgeNodes.push(t.node)),this._pending===t&&(this._pending=null),--this._reqsWaiting,this._next()}}},"@VERSION@",{requires:["yui-base"]});