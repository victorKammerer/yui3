YUI.add("graphics-vml",function(p,t){var e,i,s,r,o,n,h,d="vml",u="shape",a=/[a-z][^a-z]*/gi,l=/[\-]?[0-9]*[0-9|\.][0-9]*/g,c=p.Lang,v=c.isNumber,_=c.isArray,f=p.DOM,g=p.Selector,m=p.config.doc,y=p.AttributeLite,M=p.ClassNameManager.getClassName;function w(){}w.prototype={_pathSymbolToMethod:{M:"moveTo",m:"relativeMoveTo",L:"lineTo",l:"relativeLineTo",C:"curveTo",c:"relativeCurveTo",Q:"quadraticCurveTo",q:"relativeQuadraticCurveTo",z:"closePath",Z:"closePath"},_coordSpaceMultiplier:100,_round:function(t){return Math.round(t*this._coordSpaceMultiplier)},_addToPath:function(t){this._path=this._path||"",this._movePath&&(this._path+=this._movePath,this._movePath=null),this._path+=t},_currentX:0,_currentY:0,curveTo:function(){return this._curveTo.apply(this,[p.Array(arguments),!1]),this},relativeCurveTo:function(){return this._curveTo.apply(this,[p.Array(arguments),!0]),this},_curveTo:function(t,e){for(var i,s,r,o,n,h,a,l,d,u,c=e?" v ":" c ",p=e?parseFloat(this._currentX):0,_=e?parseFloat(this._currentY):0,f=t.length-5,g=c,m=0;m<f;m+=6)r=parseFloat(t[m]),o=parseFloat(t[m+1]),n=parseFloat(t[m+2]),h=parseFloat(t[m+3]),i=parseFloat(t[m+4]),s=parseFloat(t[m+5]),0<m&&(g+=", "),g=g+this._round(r)+", "+this._round(o)+", "+this._round(n)+", "+this._round(h)+", "+this._round(i)+", "+this._round(s),r+=p,o+=_,n+=p,h+=_,i+=p,s+=_,a=Math.max(i,Math.max(r,n)),d=Math.max(s,Math.max(o,h)),l=Math.min(i,Math.min(r,n)),u=Math.min(s,Math.min(o,h)),a=Math.abs(a-l),l=Math.abs(d-u),d=[[this._currentX,this._currentY],[r,o],[n,h],[i,s]],this._setCurveBoundingBox(d,a,l),this._currentX=i,this._currentY=s;this._addToPath(g)},quadraticCurveTo:function(){return this._quadraticCurveTo.apply(this,[p.Array(arguments),!1]),this},relativeQuadraticCurveTo:function(){return this._quadraticCurveTo.apply(this,[p.Array(arguments),!0]),this},_quadraticCurveTo:function(t,e){for(var i,s,r,o,n,h,a=this._currentX,l=this._currentY,d=t.length-3,u=[],c=e?parseFloat(this._currentX):0,p=e?parseFloat(this._currentY):0,_=0;_<d;_+=4)i=parseFloat(t[_])+c,s=parseFloat(t[_+1])+p,r=(i=a+.67*(i-a))+.34*((n=parseFloat(t[_+2])+c)-a),o=(s=l+.67*(s-l))+.34*((h=parseFloat(t[_+3])+p)-l),u.push(i),u.push(s),u.push(r),u.push(o),u.push(n),u.push(h);this._curveTo.apply(this,[u,!1])},drawRect:function(t,e,i,s){return this.moveTo(t,e),this.lineTo(t+i,e),this.lineTo(t+i,e+s),this.lineTo(t,e+s),this.lineTo(t,e),this._currentX=t,this._currentY=e,this},drawRoundRect:function(t,e,i,s,r,o){return this.moveTo(t,e+o),this.lineTo(t,e+s-o),this.quadraticCurveTo(t,e+s,t+r,e+s),this.lineTo(t+i-r,e+s),this.quadraticCurveTo(t+i,e+s,t+i,e+s-o),this.lineTo(t+i,e+o),this.quadraticCurveTo(t+i,e,t+i-r,e),this.lineTo(t+r,e),this.quadraticCurveTo(t,e,t,e+o),this},drawCircle:function(t,e,i){var s=2*i;return this._drawingComplete=!1,this._trackSize(t+s,e+s),this.moveTo(t+s,e+i),this._addToPath(" ae "+this._round(t+i)+", "+this._round(e+i)+", "+this._round(i)+", "+this._round(i)+", 0, 23592600"),this},drawEllipse:function(t,e,i,s){var r=.5*i,o=.5*s;return this._drawingComplete=!1,this._trackSize(t+i,e+s),this.moveTo(t+i,e+o),this._addToPath(" ae "+this._round(t+r)+", "+this._round(t+r)+", "+this._round(e+o)+", "+this._round(r)+", "+this._round(o)+", 0, 23592600"),this},drawDiamond:function(t,e,i,s){var r=.5*i,o=.5*s;return this.moveTo(t+r,e),this.lineTo(t+i,e+o),this.lineTo(t+r,e+s),this.lineTo(t,e+o),this.lineTo(t+r,e),this},drawWedge:function(t,e,i,s,r){var o=2*r;return 360<Math.abs(s)&&(s=360),this._currentX=t,this._currentY=e,i*=-65535,s*=65536,i=Math.round(i),s=Math.round(s),this.moveTo(t,e),this._addToPath(" ae "+this._round(t)+", "+this._round(e)+", "+this._round(r)+" "+this._round(r)+", "+i+", "+s),this._trackSize(o,o),this},lineTo:function(){return this._lineTo.apply(this,[p.Array(arguments),!1]),this},relativeLineTo:function(){return this._lineTo.apply(this,[p.Array(arguments),!0]),this},_lineTo:function(t,e){var i,s,r,o,n=t[0],h=e?" r ":" l ",a=e?parseFloat(this._currentX):0,l=e?parseFloat(this._currentY):0;if("string"==typeof n||"number"==typeof n)for(s=t.length-1,i=0;i<s;i+=2)r=parseFloat(t[i]),o=parseFloat(t[i+1]),h+=" "+this._round(r)+", "+this._round(o),o+=l,this._currentX=r+=a,this._currentY=o,this._trackSize.apply(this,[r,o]);else for(s=t.length,i=0;i<s;i+=1)r=parseFloat(t[i][0]),o=parseFloat(t[i][1]),h+=" "+this._round(r)+", "+this._round(o),o+=l,this._currentX=r+=a,this._currentY=o,this._trackSize.apply(this,[r,o]);return this._addToPath(h),this},moveTo:function(){return this._moveTo.apply(this,[p.Array(arguments),!1]),this},relativeMoveTo:function(){return this._moveTo.apply(this,[p.Array(arguments),!0]),this},_moveTo:function(t,e){var i=parseFloat(t[0]),t=parseFloat(t[1]),s=e?" t ":" m ",r=e?parseFloat(this._currentX):0,e=e?parseFloat(this._currentY):0;this._movePath=s+this._round(i)+", "+this._round(t),this._trackSize(i+=r,t+=e),this._currentX=i,this._currentY=t},_closePath:function(){var t=this.get("fill"),e=this.get("stroke"),i=this.node,s=this.get("width"),r=this.get("height"),o=this._path,n="",h=this._coordSpaceMultiplier;this._fillChangeHandler(),this._strokeChangeHandler(),o&&(t&&t.color&&(n+=" x"),e)&&(n+=" e"),o&&(i.path=o+n),isNaN(s)||isNaN(r)||(i.coordOrigin=this._left+", "+this._top,i.coordSize=s*h+", "+r*h,i.style.position="absolute",i.style.width=s+"px",i.style.height=r+"px"),this._path=o,this._movePath=null,this._updateTransform()},end:function(){return this._closePath(),this},closePath:function(){return this._addToPath(" x e"),this},clear:function(){return this._right=0,this._bottom=0,this._width=0,this._height=0,this._left=0,this._top=0,this._path="",this._movePath=null,this},getBezierData:function(t,e){for(var i,s=t.length,r=[],o=0;o<s;++o)r[o]=[t[o][0],t[o][1]];for(i=1;i<s;++i)for(o=0;o<s-i;++o)r[o][0]=(1-e)*r[o][0]+e*r[parseInt(o+1,10)][0],r[o][1]=(1-e)*r[o][1]+e*r[parseInt(o+1,10)][1];return[r[0][0],r[0][1]]},_setCurveBoundingBox:function(t,e,i){for(var s,r=this._currentX,o=r,n=this._currentY,h=n,a=Math.round(Math.sqrt(e*e+i*i)),l=1/a,
d=0;d<a;++d)s=this.getBezierData(t,l*d),r=isNaN(r)?s[0]:Math.min(s[0],r),o=isNaN(o)?s[0]:Math.max(s[0],o),n=isNaN(n)?s[1]:Math.min(s[1],n),h=isNaN(h)?s[1]:Math.max(s[1],h);r=Math.round(10*r)/10,o=Math.round(10*o)/10,n=Math.round(10*n)/10,h=Math.round(10*h)/10,this._trackSize(o,h),this._trackSize(r,n)},_trackSize:function(t,e){t>this._right&&(this._right=t),t<this._left&&(this._left=t),e<this._top&&(this._top=e),e>this._bottom&&(this._bottom=e),this._width=this._right-this._left,this._height=this._bottom-this._top},_left:0,_right:0,_top:0,_bottom:0,_width:0,_height:0},p.VMLDrawing=w,(e=function(){this._transforms=[],this.matrix=new p.Matrix,this._normalizedMatrix=new p.Matrix,e.superclass.constructor.apply(this,arguments)}).NAME="shape",p.extend(e,p.GraphicBase,p.mix({_type:"shape",init:function(){this.initializer.apply(this,arguments)},initializer:function(t){var t=t.graphic,e=this.get("data");this.createNode(),t&&this._setGraphic(t),e&&this._parsePathData(e),this._updateHandler()},_setGraphic:function(t){t instanceof p.VMLGraphic?this._graphic=t:((t=new p.VMLGraphic({render:t}))._appendShape(this),this._graphic=t,this._appendStrokeAndFill())},_appendStrokeAndFill:function(){this._strokeNode&&this.node.appendChild(this._strokeNode),this._fillNode&&this.node.appendChild(this._fillNode)},createNode:function(){var t=this._camelCaseConcat,e=this.get("x"),i=this.get("y"),s=this.get("width"),r=this.get("height"),o=this.name,n=this.get("visible")?"visible":"hidden",h=this.get("id"),a="path"===this._type?"shape":this._type,o=M(u)+" "+M(t(d,u))+" "+M(o)+" "+M(t(d,o))+" "+d+a,t=this._getStrokeProps(),l=this._getFillProps(),h="<"+a+'  xmlns="urn:schemas-microsft.com:vml" id="'+h+'" class="'+o+'" style="behavior:url(#default#VML);display:inline-block;position:absolute;left:'+e+"px;top:"+i+"px;width:"+s+"px;height:"+r+"px;visibility:"+n+'"';t&&t.weight&&0<t.weight?(o=t.endcap,e=parseFloat(t.opacity),i=t.joinstyle,s=t.miterlimit,r=t.dashstyle,h+=' stroked="t" strokecolor="'+t.color+'" strokeWeight="'+t.weight+'px"',n='<stroke class="vmlstroke" xmlns="urn:schemas-microsft.com:vml" on="t" style="behavior:url(#default#VML);display:inline-block;" opacity="'+e+'"',o&&(n+=' endcap="'+o+'"'),i&&(n+=' joinstyle="'+i+'"'),s&&(n+=' miterlimit="'+s+'"'),r&&(n+=' dashstyle="'+r+'"'),this._strokeNode=m.createElement(n+="></stroke>"),h+=' stroked="t"'):h+=' stroked="f"',l&&(l.node&&(t=l.node,this._fillNode=m.createElement(t)),l.color&&(h+=' fillcolor="'+l.color+'"'),h+=' filled="'+l.filled+'"'),e=m.createElement(h=h+">"+("</"+a+">")),this.node=e,this._strokeFlag=!1,this._fillFlag=!1},addClass:function(t){var e=this.node;f.addClass(e,t)},removeClass:function(t){var e=this.node;f.removeClass(e,t)},getXY:function(){var t=this._graphic.getXY(),e=this.get("x"),i=this.get("y");return[t[0]+e,t[1]+i]},setXY:function(t){var e=this._graphic.getXY();this.set("x",t[0]-e[0]),this.set("y",t[1]-e[1])},contains:function(t){return(t instanceof p.Node?t._node:t)===this.node},compareTo:function(t){return this.node===t},test:function(t){return g.test(this.node,t)},_getStrokeProps:function(){var t,e,i,s,r,o,n,h=this.get("stroke"),a="",l=0;if(h&&h.weight&&0<h.weight){if(t={},o=h.linecap||"flat",n=h.linejoin||"round","round"!==o&&"square"!==o&&(o="flat"),e=parseFloat(h.opacity),i=h.dashstyle||"none",h.color=h.color||"#000000",h.weight=h.weight||1,h.opacity=v(e)?e:1,t.stroked=!0,t.color=h.color,t.weight=h.weight,t.endcap=o,t.opacity=h.opacity,_(i))for(a=[],r=i.length,l=0;l<r;++l)s=i[l],a[l]=s/h.weight;"round"===n||"bevel"===n?t.joinstyle=n:(n=parseInt(n,10),v(n)&&(t.miterlimit=Math.max(n,1),t.joinstyle="miter")),t.dashstyle=a}return t},_strokeChangeHandler:function(){if(this._strokeFlag){var t,e,i,s,r,o,n=this.node,h=this.get("stroke"),a="",l=0;if(h&&h.weight&&0<h.weight){if(r=h.linecap||"flat",o=h.linejoin||"round","round"!==r&&"square"!==r&&(r="flat"),t=parseFloat(h.opacity),e=h.dashstyle||"none",h.color=h.color||"#000000",h.weight=h.weight||1,h.opacity=v(t)?t:1,n.stroked=!0,n.strokeColor=h.color,n.strokeWeight=h.weight+"px",this._strokeNode||(this._strokeNode=this._createGraphicNode("stroke"),n.appendChild(this._strokeNode)),this._strokeNode.endcap=r,this._strokeNode.opacity=h.opacity,_(e))for(a=[],s=e.length,l=0;l<s;++l)i=e[l],a[l]=i/h.weight;"round"===o||"bevel"===o?this._strokeNode.joinstyle=o:(o=parseInt(o,10),v(o)&&(this._strokeNode.miterlimit=Math.max(o,1),this._strokeNode.joinstyle="miter")),this._strokeNode.dashstyle=a,this._strokeNode.on=!0}else this._strokeNode&&(this._strokeNode.on=!1),n.stroked=!1;this._strokeFlag=!1}},_getFillProps:function(){var t,e,i,s,r,o=this.get("fill"),n=!1;if(o){if(e={},"radial"===o.type||"linear"===o.type){for(s in t=parseFloat(o.opacity),n=!0,r='<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;" opacity="'+(t=v(t)?t:1)+'"',i=this._getGradientFill(o))i.hasOwnProperty(s)&&(r+=" "+s+'="'+i[s]+'"');e.node=r+=" />"}else o.color&&(t=parseFloat(o.opacity),n=!0,e.color=o.color,v(t))&&(t=Math.max(Math.min(t,1),0),(e.opacity=t)<1)&&(e.node='<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;" type="solid" opacity="'+t+'"/>');e.filled=n}return e},_fillChangeHandler:function(){if(this._fillFlag){var t,e,i,s,r=this.node,o=this.get("fill"),n=!1;if(o)if("radial"===o.type||"linear"===o.type)if(n=!0,s=this._getGradientFill(o),this._fillNode)for(i in s)s.hasOwnProperty(i)&&("colors"===i?this._fillNode.colors.value=s[i]:this._fillNode[i]=s[i]);else{for(i in e='<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;"',s)s.hasOwnProperty(i)&&(e+=" "+i+'="'+s[i]+'"');this._fillNode=m.createElement(e+=" />"),r.appendChild(this._fillNode)}else o.color&&(r.fillcolor=o.color,t=parseFloat(o.opacity),n=!0,v(t)&&t<1?(o.opacity=t,this._fillNode?("solid"!==this._fillNode.getAttribute("type")&&(this._fillNode.type="solid"),
this._fillNode.opacity=t):(this._fillNode=m.createElement(e='<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;" type="solid" opacity="'+t+'"/>'),r.appendChild(this._fillNode))):this._fillNode&&(this._fillNode.opacity=1,this._fillNode.type="solid"));r.filled=n,this._fillFlag=!1}},_updateFillNode:function(t){this._fillNode||(this._fillNode=this._createGraphicNode("fill"),t.appendChild(this._fillNode))},_getGradientFill:function(t){var e,i,s,r,o,n={},h=t.type,a=this.get("width"),l=this.get("height"),d=v,u=t.stops,c=u.length,p="",_=t.cx,f=t.cy,g=t.fx,m=t.fy,y=t.r,t=t.rotation||0;for("linear"===h?(t=t<=270?Math.abs(t-270):t<360?360-t+270:270,n.type="gradient",n.angle=t):"radial"===h&&(g=2*y*(g-.5),m=2*y*(m-.5),g+=_,m+=f,n.focussize=a*(2*y)/a/10+"% "+l*(2*y)/l/10+"%",n.alignshape=!1,n.type="gradientradial",n.focus="100%",n.focusposition=Math.round(100*g)+"% "+Math.round(100*m)+"%"),r=0;r<c;++r)s=(e=u[r]).color,i=d(i=e.opacity)?i:1,o=e.offset||r/(c-1),o*=2*y,o=Math.round(100*o)+"%",n["opacity"+(0<r?r+1:"")]=i+"",p+=", "+o+" "+s;return parseFloat(o)<100&&(p+=", 100% "+s),n.colors=p.substr(2),n},_addTransform:function(t,e){e=p.Array(e),this._transform=c.trim(this._transform+" "+t+"("+e.join(", ")+")"),e.unshift(t),this._transforms.push(e),this.initialized&&this._updateTransform()},_updateTransform:function(){var t,e,i,s,r,o=this.node,n=this.get("x"),h=this.get("y"),a=this.matrix,l=this._normalizedMatrix,d=this instanceof p.VMLPath,u=this._transforms.length;if(this._transforms&&0<this._transforms.length){for(s=this.get("transformOrigin"),d&&l.translate(this._left,this._top),i=s[0]-.5,s=s[1]-.5,i=Math.max(-.5,Math.min(.5,i)),s=Math.max(-.5,Math.min(.5,s)),r=0;r<u;++r)(t=this._transforms[r].shift())&&(l[t].apply(l,this._transforms[r]),a[t].apply(a,this._transforms[r]));d&&l.translate(-this._left,-this._top),e=l.a+","+l.c+","+l.b+","+l.d+",0,0"}this._graphic.addToRedrawQueue(this),e&&(this._skew||(this._skew=m.createElement('<skew class="vmlskew" xmlns="urn:schemas-microsft.com:vml" on="false" style="behavior:url(#default#VML);display:inline-block;"/>'),this.node.appendChild(this._skew)),this._skew.matrix=e,this._skew.on=!0,this._skew.origin=i+", "+s),"path"!==this._type&&(this._transforms=[]),o.style.left=n+this._getSkewOffsetValue(l.dx)+"px",o.style.top=h+this._getSkewOffsetValue(l.dy)+"px"},_getSkewOffsetValue:function(t){var e=p.MatrixUtil.sign(t),i=Math.abs(t);return t=Math.min(i,32767)*e},_translateX:0,_translateY:0,_transform:"",translate:function(t,e){this._translateX+=t,this._translateY+=e,this._addTransform("translate",arguments)},translateX:function(t){this._translateX+=t,this._addTransform("translateX",arguments)},translateY:function(t){this._translateY+=t,this._addTransform("translateY",arguments)},skew:function(){this._addTransform("skew",arguments)},skewX:function(){this._addTransform("skewX",arguments)},skewY:function(){this._addTransform("skewY",arguments)},rotate:function(){this._addTransform("rotate",arguments)},scale:function(){this._addTransform("scale",arguments)},on:function(t,e){return p.Node.DOM_EVENTS[t]?p.on(t,e,"#"+this.get("id")):p.on.apply(this,arguments)},_draw:function(){},_updateHandler:function(){var t=this.node;this._fillChangeHandler(),this._strokeChangeHandler(),t.style.width=this.get("width")+"px",t.style.height=this.get("height")+"px",this._draw(),this._updateTransform()},_createGraphicNode:function(t){return t=t||this._type,m.createElement("<"+t+' xmlns="urn:schemas-microsft.com:vml" style="behavior:url(#default#VML);display:inline-block;" class="vml'+t+'"/>')},_getDefaultFill:function(){return{type:"solid",opacity:1,cx:.5,cy:.5,fx:.5,fy:.5,r:.5}},_getDefaultStroke:function(){return{weight:1,dashstyle:"none",color:"#000",opacity:1}},set:function(){y.prototype.set.apply(this,arguments),this.initialized&&this._updateHandler()},getBounds:function(){var t=this instanceof p.VMLPath,e=this.get("width"),i=this.get("height"),s=this.get("x"),r=this.get("y");return t&&(s+=this._left,r+=this._top,e=this._right-this._left,i=this._bottom-this._top),this._getContentRect(e,i,s,r)},_getContentRect:function(t,e,i,s){var r,o,n,h=this.get("transformOrigin"),a=h[0]*t,h=h[1]*e,l=this.matrix.getTransformArray(this.get("transform")),d=new p.Matrix,u=l.length,c=this instanceof p.VMLPath;for(c&&d.translate(this._left,this._top),a=isNaN(a)?0:a,h=isNaN(h)?0:h,d.translate(a,h),r=0;r<u;r+=1)(n=(o=l[r]).shift())&&d[n].apply(d,o);return d.translate(-a,-h),c&&d.translate(-this._left,-this._top),d.getContentRect(t,e,i,s)},toFront:function(){var t=this.get("graphic");t&&t._toFront(this)},toBack:function(){var t=this.get("graphic");t&&t._toBack(this)},_parsePathData:function(t){var e,i,s,r,o=p.Lang.trim(t.match(a)),n=this._pathSymbolToMethod;if(o){for(this.clear(),s=o.length||0,i=0;i<s;i+=1)e=(r=o[i]).substr(0,1),r=r.substr(1).match(l),(e=n[e])&&(r?this[e].apply(this,r):this[e].apply(this));this.end()}},destroy:function(){var t=this.get("graphic");t?t.removeShape(this):this._destroy()},_destroy:function(){this.node&&(this._fillNode&&(this.node.removeChild(this._fillNode),this._fillNode=null),this._strokeNode&&(this.node.removeChild(this._strokeNode),this._strokeNode=null),p.Event.purgeElement(this.node,!0),this.node.parentNode&&this.node.parentNode.removeChild(this.node),this.node=null)}},p.VMLDrawing.prototype)),e.ATTRS={transformOrigin:{valueFn:function(){return[.5,.5]}},transform:{setter:function(t){var e,i;for(this.matrix.init(),this._normalizedMatrix.init(),this._transforms=this.matrix.getTransformArray(t),i=this._transforms.length,e=0;e<i;++e)this._transforms[e];return this._transform=t},getter:function(){return this._transform}},x:{value:0},y:{value:0},id:{valueFn:function(){return p.guid()},setter:function(t){var e=this.node;return e&&e.setAttribute("id",t),t}},width:{value:0},height:{value:0},visible:{value:!0,setter:function(t){var e=this.node;return e&&(e.style.visibility=t?"visible":"hidden"),t}},fill:{
valueFn:"_getDefaultFill",setter:function(t){var e,i,s=this.get("fill")||this._getDefaultFill();if(t)for(e in t.hasOwnProperty("color")&&(t.type="solid"),t)t.hasOwnProperty(e)&&(s[e]=t[e]);return(i=s)&&i.color&&(i.color===undefined||"none"===i.color?i.color=null:-1<i.color.toLowerCase().indexOf("rgba")&&(i.opacity=p.Color._getAlpha(i.color),i.color=p.Color.toHex(i.color))),this._fillFlag=!0,i}},stroke:{valueFn:"_getDefaultStroke",setter:function(t){var e,i,s=this.get("stroke")||this._getDefaultStroke();if(t)for(e in t.hasOwnProperty("weight")&&(i=parseInt(t.weight,10),isNaN(i)||(t.weight=i)),t)t.hasOwnProperty(e)&&(s[e]=t[e]);return s.color&&-1<s.color.toLowerCase().indexOf("rgba")&&(s.opacity=p.Color._getAlpha(s.color),s.color=p.Color.toHex(s.color)),i=s,this._strokeFlag=!0,i}},autoSize:{value:!1},pointerEvents:{value:"visiblePainted"},node:{readOnly:!0,getter:function(){return this.node}},data:{setter:function(t){return this.get("node")&&this._parsePathData(t),t}},graphic:{readOnly:!0,getter:function(){return this._graphic}}},p.VMLShape=e,(s=function(){s.superclass.constructor.apply(this,arguments)}).NAME="path",p.extend(s,p.VMLShape),s.ATTRS=p.merge(p.VMLShape.ATTRS,{width:{getter:function(){return Math.max(this._right-this._left,0)}},height:{getter:function(){return Math.max(this._bottom-this._top,0)}},path:{readOnly:!0,getter:function(){return this._path}}}),p.VMLPath=s,(r=function(){r.superclass.constructor.apply(this,arguments)}).NAME="rect",p.extend(r,p.VMLShape,{_type:"rect"}),r.ATTRS=p.VMLShape.ATTRS,p.VMLRect=r,(o=function(){o.superclass.constructor.apply(this,arguments)}).NAME="ellipse",p.extend(o,p.VMLShape,{_type:"oval"}),o.ATTRS=p.merge(p.VMLShape.ATTRS,{xRadius:{lazyAdd:!1,getter:function(){var t=this.get("width");return Math.round(t/2*100)/100},setter:function(t){return this.set("width",2*t),t}},yRadius:{lazyAdd:!1,getter:function(){var t=this.get("height");return Math.round(t/2*100)/100},setter:function(t){return this.set("height",2*t),t}}}),p.VMLEllipse=o,(i=function(){i.superclass.constructor.apply(this,arguments)}).NAME="circle",p.extend(i,e,{_type:"oval"}),i.ATTRS=p.merge(e.ATTRS,{radius:{lazyAdd:!1,value:0},width:{setter:function(t){return this.set("radius",t/2),t},getter:function(){var t=this.get("radius");return t&&0<t?2*t:0}},height:{setter:function(t){return this.set("radius",t/2),t},getter:function(){var t=this.get("radius");return t&&0<t?2*t:0}}}),p.VMLCircle=i,(h=function(){h.superclass.constructor.apply(this,arguments)}).NAME="vmlPieSlice",p.extend(h,p.VMLShape,p.mix({_type:"shape",_draw:function(){var t=this.get("cx"),e=this.get("cy"),i=this.get("startAngle"),s=this.get("arc"),r=this.get("radius");this.clear(),this.drawWedge(t,e,i,s,r),this.end()}},p.VMLDrawing.prototype)),h.ATTRS=p.mix({cx:{value:0},cy:{value:0},startAngle:{value:0},arc:{value:0},radius:{value:0}},p.VMLShape.ATTRS),p.VMLPieSlice=h,(n=function(){n.superclass.constructor.apply(this,arguments)}).NAME="vmlGraphic",n.ATTRS={render:{},id:{valueFn:function(){return p.guid()},setter:function(t){var e=this._node;return e&&e.setAttribute("id",t),t}},shapes:{readOnly:!0,getter:function(){return this._shapes}},contentBounds:{readOnly:!0,getter:function(){return this._contentBounds}},node:{readOnly:!0,getter:function(){return this._node}},width:{setter:function(t){return this._node&&(this._node.style.width=t+"px"),t}},height:{setter:function(t){return this._node&&(this._node.style.height=t+"px"),t}},autoSize:{value:!1},preserveAspectRatio:{value:"xMidYMid"},resizeDown:{resizeDown:!1},x:{getter:function(){return this._x},setter:function(t){return this._x=t,this._node&&(this._node.style.left=t+"px"),t}},y:{getter:function(){return this._y},setter:function(t){return this._y=t,this._node&&(this._node.style.top=t+"px"),t}},autoDraw:{value:!0},visible:{value:!0,setter:function(t){return this._toggleVisible(t),t}}},p.extend(n,p.GraphicBase,{set:function(){var t,e=arguments[0],i={autoDraw:!0,autoSize:!0,preserveAspectRatio:!0,resizeDown:!0},s=!1;if(y.prototype.set.apply(this,arguments),!0===this._state.autoDraw&&0<p.Object.size(this._shapes))if(c.isString&&i[e])s=!0;else if(c.isObject(e))for(t in i)if(i.hasOwnProperty(t)&&e[t]){s=!0;break}s&&this._redraw()},_x:0,_y:0,getXY:function(){var t,e=this.parentNode,i=this.get("x"),s=this.get("y");return e?((t=p.DOM.getXY(e))[0]+=i,t[1]+=s):t=p.DOM._getOffset(this._node),t},initializer:function(){var t=this.get("render"),e=this.get("visible")?"visible":"hidden";this._shapes={},this._contentBounds={left:0,top:0,right:0,bottom:0},this._node=this._createGraphic(),this._node.style.left=this.get("x")+"px",this._node.style.top=this.get("y")+"px",this._node.style.visibility=e,this._node.setAttribute("id",this.get("id")),t&&this.render(t)},render:function(t){var e,i=t||m.body,s=this._node;return t instanceof p.Node?i=t._node:p.Lang.isString(t)&&(i=p.Selector.query(t,m.body,!0)),t=this.get("width")||parseInt(p.DOM.getComputedStyle(i,"width"),10),e=this.get("height")||parseInt(p.DOM.getComputedStyle(i,"height"),10),i.appendChild(s),this.parentNode=i,this.set("width",t),this.set("height",e),this},destroy:function(){this.removeAllShapes(),this._node&&(this._removeChildren(this._node),this._node.parentNode&&this._node.parentNode.removeChild(this._node),this._node=null)},addShape:function(t){(t.graphic=this).get("visible")||(t.visible=!1);t=new(this._getShapeClass(t.type))(t);return this._appendShape(t),t._appendStrokeAndFill(),t},_appendShape:function(t){var t=t.node,e=this._frag||this._node;(this.get("autoDraw")||"sizeContentToGraphic"===this.get("autoSize")?e:this._getDocFrag()).appendChild(t)},removeShape:function(t){t instanceof e||c.isString(t)&&(t=this._shapes[t]),t&&t instanceof e&&(t._destroy(),this._shapes[t.get("id")]=null,delete this._shapes[t.get("id")]),this.get("autoDraw")&&this._redraw()},removeAllShapes:function(){var t,e=this._shapes;for(t in e)e.hasOwnProperty(t)&&e[t].destroy();this._shapes={}},_removeChildren:function(t){if(t.hasChildNodes())for(
var e;t.firstChild;)e=t.firstChild,this._removeChildren(e),t.removeChild(e)},clear:function(){this.removeAllShapes(),this._removeChildren(this._node)},_toggleVisible:function(t){var e,i=this._shapes,s=t?"visible":"hidden";if(i)for(e in i)i.hasOwnProperty(e)&&i[e].set("visible",t);this._node&&(this._node.style.visibility=s),this._node&&(this._node.style.visibility=s)},setSize:function(t,e){t=Math.round(t),e=Math.round(e),this._node.style.width=t+"px",this._node.style.height=e+"px"},setPosition:function(t,e){t=Math.round(t),e=Math.round(e),this._node.style.left=t+"px",this._node.style.top=e+"px"},_createGraphic:function(){return m.createElement('<group xmlns="urn:schemas-microsft.com:vml" style="behavior:url(#default#VML);padding:0px 0px 0px 0px;display:block;position:absolute;top:0px;left:0px;zoom:1;"/>')},_createGraphicNode:function(t){return m.createElement("<"+t+' xmlns="urn:schemas-microsft.com:vml" style="behavior:url(#default#VML);display:inline-block;zoom:1;"/>')},getShapeById:function(t){return this._shapes[t]},_getShapeClass:function(t){var e=this._shapeClass[t];return e||t},_shapeClass:{circle:p.VMLCircle,rect:p.VMLRect,path:p.VMLPath,ellipse:p.VMLEllipse,pieslice:p.VMLPieSlice},batch:function(t){var e=this.get("autoDraw");this.set("autoDraw",!1),t.apply(),this.set("autoDraw",e)},_getDocFrag:function(){return this._frag||(this._frag=m.createDocumentFragment()),this._frag},addToRedrawQueue:function(t){var e;this._shapes[t.get("id")]=t,this.get("resizeDown")||(t=t.getBounds(),(e=this._contentBounds).left=(e.left<t.left?e:t).left,e.top=(e.top<t.top?e:t).top,e.right=(e.right>t.right?e:t).right,e.bottom=(e.bottom>t.bottom?e:t).bottom,e.width=e.right-e.left,e.height=e.bottom-e.top,this._contentBounds=e),this.get("autoDraw")&&this._redraw()},_redraw:function(){var t,e,i,s=this.get("autoSize"),r=this.parentNode,o=parseFloat(p.DOM.getComputedStyle(r,"width")),r=parseFloat(p.DOM.getComputedStyle(r,"height")),n=0,h=0,a=this.get("resizeDown")?this._getUpdatedContentBounds():this._contentBounds,l=a.left,d=a.right,u=a.top,d=d-l,a=a.bottom-u,c=this.get("visible");this._node.style.visibility="hidden",s?("sizeContentToGraphic"===s?("none"===(s=this.get("preserveAspectRatio"))||d/a==o/r?(n=l,h=u,t=d,e=a):o<d*r/a?(i=o*(a/(t=d))*((e=d*(r/o))/r),h=u+(h=this._calculateCoordOrigin(s.slice(5).toLowerCase(),i,e)),n=l):(i=r*(d/(e=a))*((t=a*(o/r))/o),n=this._calculateCoordOrigin(s.slice(1,4).toLowerCase(),i,t),n+=l,h=u),this._node.style.width=o+"px",this._node.style.height=r+"px",this._node.coordOrigin=n+", "+h):(e=a,this._node.style.width=(t=d)+"px",this._node.style.height=a+"px",this._state.width=d,this._state.height=a),this._node.coordSize=t+", "+e):(this._node.style.width=o+"px",this._node.style.height=r+"px",this._node.coordSize=o+", "+r),this._frag&&(this._node.appendChild(this._frag),this._frag=null),c&&(this._node.style.visibility="visible")},_calculateCoordOrigin:function(t,e,i){var s;switch(t){case"min":s=0;break;case"mid":s=(e-i)/2;break;case"max":s=e-i}return s},_getUpdatedContentBounds:function(){var t,e,i=this._shapes,s={};for(e in i)i.hasOwnProperty(e)&&(t=i[e].getBounds(),s.left=c.isNumber(s.left)?Math.min(s.left,t.left):t.left,s.top=c.isNumber(s.top)?Math.min(s.top,t.top):t.top,s.right=c.isNumber(s.right)?Math.max(s.right,t.right):t.right,s.bottom=c.isNumber(s.bottom)?Math.max(s.bottom,t.bottom):t.bottom);return s.left=c.isNumber(s.left)?s.left:0,s.top=c.isNumber(s.top)?s.top:0,s.right=c.isNumber(s.right)?s.right:0,s.bottom=c.isNumber(s.bottom)?s.bottom:0,this._contentBounds=s},_toFront:function(t){var e=this._node;t instanceof p.VMLShape&&(t=t.get("node")),e&&t&&e.appendChild(t)},_toBack:function(t){var e,i=this._node;t instanceof p.VMLShape&&(t=t.get("node")),i&&t&&((e=i.firstChild)?i.insertBefore(t,e):i.appendChild(t))}}),p.VMLGraphic=n},"@VERSION@",{requires:["graphics","color-base"]});