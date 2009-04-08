YUI.add("event-custom",function(E){(function(){E.Env.eventHandles={};E.Env.eventAdaptors={};})();(function(){var F=0,G=1;E.Do={objs:{},before:function(I,K,L,M){var J=I,H;if(M){H=[I,M].concat(E.Array(arguments,4,true));J=E.rbind.apply(E,H);}return this._inject(F,J,K,L);},after:function(I,K,L,M){var J=I,H;if(M){H=[I,M].concat(E.Array(arguments,4,true));J=E.rbind.apply(E,H);}return this._inject(G,J,K,L);},_inject:function(H,J,K,M){var N=E.stamp(K),L,I;if(!this.objs[N]){this.objs[N]={};}L=this.objs[N];if(!L[M]){L[M]=new E.Do.Method(K,M);K[M]=function(){return L[M].exec.apply(L[M],arguments);};}I=N+E.stamp(J)+M;L[M].register(I,J,H);return new E.EventHandle(L[M],I);},detach:function(H){if(H.detach){H.detach();}},_unload:function(I,H){}};E.Do.Method=function(H,I){this.obj=H;this.methodName=I;this.method=H[I];this.before={};this.after={};};E.Do.Method.prototype.register=function(I,J,H){if(H){this.after[I]=J;}else{this.before[I]=J;}};E.Do.Method.prototype._delete=function(H){delete this.before[H];delete this.after[H];};E.Do.Method.prototype.exec=function(){var J=E.Array(arguments,0,true),K,I,N,L=this.before,H=this.after,M=false;for(K in L){if(L.hasOwnProperty(K)){I=L[K].apply(this.obj,J);if(I){switch(I.constructor){case E.Do.Halt:return I.retVal;case E.Do.AlterArgs:J=I.newArgs;break;case E.Do.Prevent:M=true;break;default:}}}}if(!M){I=this.method.apply(this.obj,J);}for(K in H){if(H.hasOwnProperty(K)){N=H[K].apply(this.obj,J);if(N&&N.constructor==E.Do.Halt){return N.retVal;}else{if(N&&N.constructor==E.Do.AlterReturn){I=N.newRetVal;}}}}return I;};E.Do.AlterArgs=function(I,H){this.msg=I;this.newArgs=H;};E.Do.AlterReturn=function(I,H){this.msg=I;this.newRetVal=H;};E.Do.Halt=function(I,H){this.msg=I;this.retVal=H;};E.Do.Prevent=function(H){this.msg=H;};E.Do.Error=E.Do.Halt;})();var B="_event:onsub",D="after",A=["broadcast","bubbles","context","configured","currentTarget","defaultFn","details","emitFacade","fireOnce","host","preventable","preventedFn","queuable","silent","stoppedFn","target","type"],C=9;E.EventHandle=function(F,G){this.evt=F;this.sub=G;};E.EventHandle.prototype={detach:function(){if(this.evt){this.evt._delete(this.sub);}}};E.CustomEvent=function(F,G){G=G||{};this.id=E.stamp(this);this.type=F;this.context=E;this.logSystem=(F=="yui:log");this.broadcast=0;this.silent=this.logSystem;this.queuable=false;this.subscribers={};this.afters={};this.fired=false;this.fireOnce=false;this.stopped=0;this.prevented=0;this.host=null;this.defaultFn=null;this.stoppedFn=null;this.preventedFn=null;this.preventable=true;this.bubbles=true;this.signature=C;this.emitFacade=false;this.applyConfig(G,true);this.log("Creating "+this.type);if(F!==B){this.subscribeEvent=new E.CustomEvent(B,{context:this,silent:true});}};E.CustomEvent.prototype={_YUI_EVENT:true,applyConfig:function(G,F){if(G){E.mix(this,G,F,A);}},_subscribe:function(J,H,G,F){if(!J){E.error("Invalid callback for CE: "+this.type);}var K=this.subscribeEvent,I;if(K){K.fire.apply(K,G);}I=new E.Subscriber(J,H,G,F);if(this.fireOnce&&this.fired){E.later(0,this,this._notify,I);}if(F==D){this.afters[I.id]=I;}else{this.subscribers[I.id]=I;}return new E.EventHandle(this,I);},subscribe:function(G,F){return this._subscribe(G,F,arguments,true);},on:function(G,F){return this._subscribe(G,F,arguments,true);},after:function(G,F){return this._subscribe(G,F,arguments,D);},detach:function(J,H){if(J&&J.detach){return J.detach();}if(!J){return this.unsubscribeAll();}var K=false,G=this.subscribers,F,I;for(F in G){if(G.hasOwnProperty(F)){I=G[F];if(I&&I.contains(J,H)){this._delete(I);K=true;}}}return K;},unsubscribe:function(){return this.detach.apply(this,arguments);},_getFacade:function(G){var F=this._facade,H;if(!F){F=new E.EventFacade(this,this.currentTarget);}H=G&&G[0];if(E.Lang.isObject(H,true)&&!H._yuifacade){E.mix(F,H,true);}F.details=this.details;F.target=this.target;F.currentTarget=this.currentTarget;F.stopped=0;F.prevented=0;this._facade=F;return this._facade;},_notify:function(J,H,F){this.log(this.type+"->"+": "+J);var G,I;if(this.emitFacade){if(!F){F=this._getFacade(H);H[0]=F;}}I=(H&&E.Lang.isObject(H[0])&&H[0].currentTarget);G=J.notify(I||this.context,H,this);if(false===G||this.stopped>1){this.log(this.type+" cancelled by subscriber");return false;}return true;},log:function(G,F){if(!this.silent){}},fire:function(){var O=E.Env._eventstack,H,P,N,I,J,F,K,G,L,M=true;if(O){if(this.queuable&&this.type!=O.next.type){this.log("queue "+this.type);O.queue.push([this,arguments]);return true;}}else{E.Env._eventstack={id:this.id,next:this,silent:this.silent,logging:(this.type==="yui:log"),stopped:0,prevented:0,queue:[]};O=E.Env._eventstack;}if(this.fireOnce&&this.fired){this.log("fireOnce event: "+this.type+" already fired");}else{H=E.merge(this.subscribers);N=E.Array(arguments,0,true);this.stopped=0;this.prevented=0;this.target=this.target||this.host;this.currentTarget=this.host||this.currentTarget;this.fired=true;this.details=N.slice();this.log("Firing "+this.type);L=false;O.lastLogState=O.logging;J=null;if(this.emitFacade){this._facade=null;J=this._getFacade(N);N[0]=J;}for(I in H){if(H.hasOwnProperty(I)){if(!L){O.logging=(O.logging||(this.type==="yui:log"));L=true;}if(this.stopped==2){break;}P=H[I];if(P&&P.fn){M=this._notify(P,N,J);if(false===M){this.stopped=2;}}}}O.logging=(O.lastLogState);if(this.bubbles&&this.host&&!this.stopped){O.stopped=0;O.prevented=0;M=this.host.bubble(this);this.stopped=Math.max(this.stopped,O.stopped);this.prevented=Math.max(this.prevented,O.prevented);}if(this.defaultFn&&!this.prevented){this.defaultFn.apply(this.host||this,N);}if(!this.prevented&&this.stopped<2){H=E.merge(this.afters);for(I in H){if(H.hasOwnProperty(I)){if(!L){O.logging=(O.logging||(this.type==="yui:log"));L=true;}if(this.stopped==2){break;}P=H[I];if(P&&P.fn){M=this._notify(P,N,J);if(false===M){this.stopped=2;}}}}}}if(O.id===this.id){K=O.queue;while(K.length){F=K.pop();G=F[0];O.stopped=0;O.prevented=0;O.next=G;M=G.fire.apply(G,F[1]);}E.Env._eventstack=null;}return(M!==false);},unsubscribeAll:function(){var H=this.subscribers,G,F=0;
for(G in H){if(H.hasOwnProperty(G)){this._delete(H[G]);F++;}}this.subscribers={};return F;},_delete:function(F){if(F){delete F.fn;delete F.context;delete this.subscribers[F.id];delete this.afters[F.id];}},toString:function(){return this.type;},stopPropagation:function(){this.stopped=1;E.Env._eventstack.stopped=1;if(this.stoppedFn){this.stoppedFn.call(this.host||this,this);}},stopImmediatePropagation:function(){this.stopped=2;E.Env._eventstack.stopped=2;if(this.stoppedFn){this.stoppedFn.call(this.host||this,this);}},preventDefault:function(){if(this.preventable){this.prevented=1;E.Env._eventstack.prevented=1;}if(this.preventedFn){this.preventedFn.call(this.host||this,this);}}};E.Subscriber=function(H,G,F){this.fn=H;this.context=G;this.id=E.stamp(this);this.wrappedFn=H;if(G){this.wrappedFn=E.rbind.apply(E,F);}};E.Subscriber.prototype={notify:function(F,H,K){var L=this.context||F,G=true,I=function(){switch(K.signature){case 0:G=this.fn.call(L,K.type,H,this.context);break;case 1:G=this.fn.call(L,H[0]||null,this.context);break;default:G=this.wrappedFn.apply(L,H||[]);}};if(E.config.throwFail){I.call(this);}else{try{I.call(this);}catch(J){E.error(this+" failed: "+J.message,J);}}return G;},contains:function(G,F){if(F){return((this.fn==G)&&this.context==F);}else{return(this.fn==G);}},toString:function(){return"Subscriber "+this.id;}};(function(){var F=E.Lang,H=":",I="~AFTER~",J=function(L,N){if(!F.isString(N)){return N;}var M=N,O=L._yuievt.config.prefix;if(M.indexOf(H)==-1&&O){M=O+H+M;}return M;},G=function(L,O){if(!F.isString(O)){return O;}var N=O,Q,P,R,M=N.indexOf(I);if(M>-1){R=true;N=N.substr(I.length);}Q=N.split(/,\s*/);if(Q.length>1){P=Q[0];N=Q[1];}N=J(L,N);return[P,N,R];},K=function(L){var M=(F.isObject(L))?L:{};this._yuievt={events:{},targets:{},config:M,defaults:{context:this,host:this,emitFacade:M.emitFacade||false,bubbles:("bubbles" in M)?M.bubbles:true}};};K.prototype={on:function(W,X,N){var P=G(this,W),S,V,U,T,O,L,R,Y=E.Env.eventHandles,Z,M,Q;if(F.isObject(W,true)){S=X;V=N;U=E.Array(arguments,0,true);T={};M=W._after;delete W._after;E.each(W,function(b,a){if(b){S=b.fn||S;V=b.context||V;}U[0]=(M)?I+a:a;U[1]=S;U[2]=V;T[a]=this.on.apply(this,U);},this);return(E.config.chainOn)?this:T;}else{if(F.isFunction(W)){return E.Do.before.apply(E.Do,arguments);}}L=P[0];W=P[1];M=P[2];if(this instanceof YUI){Q=E.Env.eventAdaptors[W];if(Q&&Q.on){return Q.on.apply(E,arguments);}else{if(!Q&&W.indexOf(":")==-1){return E.Event.attach.apply(E.Event,arguments);}}}O=this._yuievt.events[W]||this.publish(W);U=E.Array(arguments,1,true);S=(P[2])?O.after:O.on;R=S.apply(O,U);if(L){Z=P[0]+P[1];if(!Y[Z]){Y[Z]=[];}Y[Z].push(R);}return(E.config.chainOn)?this:R;},subscribe:function(){return this.on.apply(this,arguments);},detach:function(U,V,N){var P=G(this,U),L=P[0],W,M,S,R,X=this._yuievt.events,O,Q,T=true;if(L){W=P[0]+P[1];M=E.Env.eventHandles[W];if(M){while(M.length){S=M.pop();S.detach();}return this;}}if(F.isObject(U)&&U.detach){return U.detach();}U=P[1];R=E.Env.eventAdaptors[U];if(this instanceof YUI){if(R&&R.detach){return R.detach.apply(E,arguments);}else{if(!R&&U.indexOf(":")==-1){return E.Event.detach.apply(E.Event,arguments);}}}if(U){O=X[U];if(O){return O.detach(V,N);}}else{for(Q in X){if(X.hasOwnProperty(Q)){T=T&&X[Q].detach(V,N);}}return T;}return this;},unsubscribe:function(){return this.detach.apply(this,arguments);},detachAll:function(L){L=J(this,L);return this.detach(L);},unsubscribeAll:function(){return this.detachAll.apply(this,arguments);},publish:function(N,O){N=J(this,N);var M,P,L,Q;if(F.isObject(N)){L={};E.each(N,function(S,R){L[R]=this.publish(R,S||O);},this);return L;}M=this._yuievt.events;P=M[N];if(P){P.applyConfig(O,true);}else{Q=O||{};E.mix(Q,this._yuievt.defaults);P=new E.CustomEvent(N,Q);M[N]=P;if(Q.onSubscribeCallback){P.subscribeEvent.subscribe(Q.onSubscribeCallback);}}return M[N];},addTarget:function(L){this._yuievt.targets[E.stamp(L)]=L;this._yuievt.hasTargets=true;},removeTarget:function(L){delete this._yuievt.targets[E.stamp(L)];},fire:function(O){var Q=F.isString(O),N=(Q)?O:(O&&O.type),P,L,M;N=J(this,N);P=this.getEvent(N);if(!P){if(this._yuievt.hasTargets){P=this.publish(N);P.details=E.Array(arguments,(Q)?1:0,true);return this.bubble(P);}return true;}L=E.Array(arguments,(Q)?1:0,true);M=P.fire.apply(P,L);P.target=null;return M;},getEvent:function(L){L=J(this,L);var M=this._yuievt.events;return(M&&L in M)?M[L]:null;},bubble:function(M){var R=this._yuievt.targets,N=true,P,Q,S,L,O;if(!M.stopped&&R){for(O in R){if(R.hasOwnProperty(O)){P=R[O];Q=M.type;S=P.getEvent(Q);L=M.target||this;if(!S){S=P.publish(Q,M);S.context=(M.host===M.context)?P:M.context;S.host=P;S.defaultFn=null;S.preventedFn=null;S.stoppedFn=null;}S.target=L;S.currentTarget=P;N=N&&S.fire.apply(S,M.details);if(S.stopped){break;}}}}return N;},after:function(N,M){var L=E.Array(arguments,0,true);switch(F.type(N)){case"function":return E.Do.after.apply(E.Do,arguments);case"object":L[0]._after=true;break;default:L[0]=I+N;}return this.on.apply(this,L);},before:function(){return this.on.apply(this,arguments);}};E.EventTarget=K;E.mix(E,K.prototype,false,false,{bubbles:false});K.call(E);})();(function(){var H={"altKey":1,"cancelBubble":1,"ctrlKey":1,"clientX":1,"clientY":1,"detail":1,"keyCode":1,"metaKey":1,"shiftKey":1,"type":1,"x":1,"y":1},G=E.UA,F={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9},I=function(K){if(!K){return null;}try{if(G.webkit&&3==K.nodeType){K=K.parentNode;}}catch(J){}return E.Node.get(K);};E.EventFacade=function(T,L,K,J){var P=T,N=L,Q=E.config.doc,U=Q.body,V=P.pageX,S=P.pageY,M=(T._YUI_EVENT),O,R,W;for(O in H){if(H.hasOwnProperty(O)){this[O]=P[O];}}if(!V&&0!==V){V=P.clientX||0;S=P.clientY||0;if(G.ie){V+=Math.max(Q.documentElement.scrollLeft,U.scrollLeft);S+=Math.max(Q.documentElement.scrollTop,U.scrollTop);}}this._yuifacade=true;this.pageX=V;this.pageY=S;R=P.keyCode||P.charCode||0;if(G.webkit&&(R in F)){R=F[R];}this.keyCode=R;this.charCode=R;this.button=P.which||P.button;this.which=this.button;this.details=J;
this.time=P.time||new Date().getTime();this.target=(M)?P.target:I(P.target||P.srcElement);this.currentTarget=(M)?N:I(N);W=P.relatedTarget;if(!W){if(P.type=="mouseout"){W=P.toElement;}else{if(P.type=="mouseover"){W=P.fromElement;}}}this.relatedTarget=(M)?W:I(W);this.stopPropagation=function(){if(P.stopPropagation){P.stopPropagation();}else{P.cancelBubble=true;}if(K){K.stopPropagation();}};this.stopImmediatePropagation=function(){if(P.stopImmediatePropagation){P.stopImmediatePropagation();}else{this.stopPropagation();}if(K){K.stopImmediatePropagation();}};this.preventDefault=function(){if(P.preventDefault){P.preventDefault();}else{P.returnValue=false;}if(K){K.preventDefault();}};this.halt=function(X){if(X){this.stopImmediatePropagation();}else{this.stopPropagation();}this.preventDefault();};};})();},"@VERSION@");