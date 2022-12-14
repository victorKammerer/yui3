YUI.add("transition-timer",function(h,t){var p=h.Transition;h.mix(p.prototype,{_start:function(){p.useNative?this._runNative():this._runTimer()},_runTimer:function(){var t=this;t._initAttrs(),(p._running[h.stamp(t)]=t)._startTime=new Date,p._startTimer()},_endTimer:function(){delete p._running[h.stamp(this)],this._startTime=null},_runFrame:function(){var t=new Date-this._startTime;this._runAttrs(t)},_runAttrs:function(t){var e,n,i,r,o,s,a,_,u,m,T=this,d=T._node,l=T._config,c=h.stamp(d),f=p._nodeAttrs[c],g=p.behaviors,E=!1;for(i in f)(r=f[i])&&r.transition===T&&(_=r.duration,n={type:"propertyEnd",propertyName:i,config:l,elapsedTime:s=((u=t)-(a=r.delay))/1e3},o=m in g&&"set"in g[m]?g[m].set:p.DEFAULT_SETTER,e=_<=u,_<u&&(u=_),!a||a<=t)&&(o(T,i,r.from,r.to,u-a,_-a,r.easing,r.unit),e)&&(delete f[i],T._count--,l[i]&&l[i].on&&l[i].on.end&&l[i].on.end.call(h.one(d),n),!E)&&T._count<=0&&(E=!0,T._end(s),T._endTimer())},_initAttrs:function(){var t,e,n,i,r,o,s,a,_,u=this,m=p.behaviors,T=h.stamp(u._node),d=p._nodeAttrs[T];for(r in d)(t=d[r])&&t.transition===u&&(e=1e3*t.duration,n=1e3*t.delay,i=t.easing,_=t.value,r in u._node.style||r in h.DOM.CUSTOM_STYLES?(a=r in m&&"get"in m[r]?m[r].get(u,r):p.DEFAULT_GETTER(u,r),o=p.RE_UNITS.exec(a),s=p.RE_UNITS.exec(_),a=o?o[1]:a,_=s?s[1]:_,!(s=s?s[2]:o?o[2]:"")&&p.RE_DEFAULT_UNIT.test(r)&&(s=p.DEFAULT_UNIT),"string"==typeof i&&(-1<i.indexOf("cubic-bezier")?i=i.substring(13,i.length-1).split(","):p.easings[i]&&(i=p.easings[i])),t.from=Number(a),t.to=Number(_),t.unit=s,t.easing=i,t.duration=e+n,t.delay=n):(delete d[r],u._count--))},destroy:function(){this.detachAll(),this._node=null}},!0),h.mix(h.Transition,{_runtimeAttrs:{},RE_DEFAULT_UNIT:/^width|height|top|right|bottom|left|margin.*|padding.*|border.*$/i,DEFAULT_UNIT:"px",intervalTime:20,behaviors:{left:{get:function(t,e){return h.DOM._getAttrOffset(t._node,e)}}},DEFAULT_SETTER:function(t,e,n,i,r,o,s,a){n=Number(n),i=Number(i);var _=t._node,s=n+p.cubicBezier(s,r/o)[0]*(i-n);_?(e in _.style||e in h.DOM.CUSTOM_STYLES)&&h.DOM.setStyle(_,e,s+(a=a||"")):t._end()},DEFAULT_GETTER:function(t,e){var t=t._node,n="";return n=e in t.style||e in h.DOM.CUSTOM_STYLES?h.DOM.getComputedStyle(t,e):n},_startTimer:function(){p._timer||(p._timer=setInterval(p._runFrame,p.intervalTime))},_stopTimer:function(){clearInterval(p._timer),p._timer=null},_runFrame:function(){var t,e=!0;for(t in p._running)p._running[t]._runFrame&&(e=!1,p._running[t]._runFrame());e&&p._stopTimer()},cubicBezier:function(t,e){var n=t[0],i=t[1],r=t[2],t=t[3];return[(((1-3*r+3*n)*e+(3*r-6*n+0))*e+3*n)*e+0,(((0-3*t+3*i)*e+(3*t-6*i+0))*e+3*i)*e+0]},easings:{ease:[.25,0,1,.25],linear:[0,0,1,1],"ease-in":[.42,0,1,1],"ease-out":[0,0,.58,1],"ease-in-out":[.42,0,.58,1]},_running:{},_timer:null,RE_UNITS:/^(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/},!0),p.behaviors.top=p.behaviors.bottom=p.behaviors.right=p.behaviors.left,h.Transition=p},"@VERSION@",{requires:["transition"]});