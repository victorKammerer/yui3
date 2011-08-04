YUI.add("widget-position-align",function(b){var m=b.Lang,e="align",g="bindUI",c="syncUI",f="offsetWidth",o="offsetHeight",q="viewportRegion",l="region",h="window",a="resize",n="scroll",i="visible",k="boundingBox",p="alignChange",j="visibleChange";function d(r){if(!this._posNode){b.error("WidgetPosition needs to be added to the Widget, before WidgetPositionAlign is added");}b.after(this._syncUIPosAlign,this,c);b.after(this._bindUIPosAlign,this,g);}d.ATTRS={align:{value:null},centered:{setter:"_setAlignCenter",lazyAdd:false,value:false},alignOn:{valueFn:function(){return[{node:b.one(h),eventName:a},{node:b,eventName:n}];},validator:b.Lang.isArray}};d.TL="tl";d.TR="tr";d.BL="bl";d.BR="br";d.TC="tc";d.RC="rc";d.BC="bc";d.LC="lc";d.CC="cc";d.prototype={_syncUIPosAlign:function(){var r=this.get(e);this._uiSetHostVisible(this.get(i));if(r){this._uiSetAlign(r.node,r.points);}},_bindUIPosAlign:function(){this.after(p,this._afterAlignChange);this.after(j,this._afterVisibleChange);this.after("alignOnChange",this._afterAlignOnChange);},_attachUIHandles:function(){if(this._uiHandles){return;}var t=b.bind(this._syncAlign,this),u=this.get("alignOn"),w=this.get(k),r=[],s=0,v={node:undefined,ev:undefined};for(;s<u.length;s++){v.node=u[s].node;v.ev=u[s].eventName;if(!v.node&&v.ev){r.push(w.on(v.ev,t));}else{if(v.node&&v.ev){r.push(v.node.on(v.ev,t));}else{}}}this.after("destroy",this._detachUIHandles);this._uiHandles=r;},_detachUIHandles:function(){if(this._uiHandles){new b.EventHandle(this._uiHandles).detach();this._uiHandles=null;}},_syncAlign:function(){this._syncUIPosAlign();},_setAlignCenter:function(r){if(r){this.set(e,{node:r===true?null:r,points:[d.CC,d.CC]});}return r;},_afterAlignChange:function(r){if(r.newVal){this._uiSetAlign(r.newVal.node,r.newVal.points);}},_uiSetHostVisible:function(r){if(r){this._attachUIHandles();}else{this._detachUIHandles();}},_afterVisibleChange:function(r){this._uiSetHostVisible(r.newVal);},_uiSetAlign:function(u,t){if(!m.isArray(t)||t.length!=2){b.error("align: Invalid Points Arguments");return;}var s=this._getRegion(u),r,v,w;if(s){r=t[0];v=t[1];switch(v){case d.TL:w=[s.left,s.top];break;case d.TR:w=[s.right,s.top];break;case d.BL:w=[s.left,s.bottom];break;case d.BR:w=[s.right,s.bottom];break;case d.TC:w=[s.left+Math.floor(s.width/2),s.top];break;case d.BC:w=[s.left+Math.floor(s.width/2),s.bottom];break;case d.LC:w=[s.left,s.top+Math.floor(s.height/2)];break;case d.RC:w=[s.right,s.top+Math.floor(s.height/2),r];break;case d.CC:w=[s.left+Math.floor(s.width/2),s.top+Math.floor(s.height/2),r];break;default:break;}if(w){this._doAlign(r,w[0],w[1]);}}},_doAlign:function(s,r,v){var u=this._posNode,t;switch(s){case d.TL:t=[r,v];break;case d.TR:t=[r-u.get(f),v];break;case d.BL:t=[r,v-u.get(o)];break;case d.BR:t=[r-u.get(f),v-u.get(o)];break;case d.TC:t=[r-(u.get(f)/2),v];break;case d.BC:t=[r-(u.get(f)/2),v-u.get(o)];break;case d.LC:t=[r,v-(u.get(o)/2)];break;case d.RC:t=[(r-u.get(f)),v-(u.get(o)/2)];break;case d.CC:t=[r-(u.get(f)/2),v-(u.get(o)/2)];break;default:break;}if(t){this.move(t);}},_getRegion:function(s){var r;if(!s){r=this._posNode.get(q);}else{s=b.Node.one(s);if(s){r=s.get(l);}}return r;},_afterAlignOnChange:function(r){this._detachUIHandles();if(this.get(i)){this._attachUIHandles();}},align:function(s,r){this.set(e,{node:s,points:r});},centered:function(r){this.align(r,[d.CC,d.CC]);}};b.WidgetPositionAlign=d;},"@VERSION@",{requires:["widget-position"]});