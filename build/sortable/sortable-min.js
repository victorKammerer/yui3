YUI.add("sortable",function(a,e){var r=function(){r.superclass.constructor.apply(this,arguments)},o="currentNode",n="opacityNode",d="container",i="id",s="zIndex",g="opacity",l="parentNode",u="nodes",h="node";a.extend(r,a.Base,{delegate:null,drop:null,initializer:function(){var e="sortable-"+a.guid(),t={container:this.get(d),nodes:this.get(u),target:!0,invalid:this.get("invalid"),dragConfig:{groups:[e]}};this.get("handles")&&(t.handles=this.get("handles")),t=new a.DD.Delegate(t),this.set(i,e),t.dd.plug(a.Plugin.DDProxy,{moveOnEnd:!1,cloneNode:!0}),this.drop=new a.DD.Drop({node:this.get(d),bubbleTarget:t,groups:t.dd.get("groups")}),this.drop.on("drop:enter",a.bind(this._onDropEnter,this)),t.on({"drag:start":a.bind(this._onDragStart,this),"drag:end":a.bind(this._onDragEnd,this),"drag:over":a.bind(this._onDragOver,this),"drag:drag":a.bind(this._onDrag,this)}),this.delegate=t,r.reg(this,e)},_up:null,_y:null,_onDrag:function(e){e.pageY<this._y?this._up=!0:e.pageY>this._y&&(this._up=!1),this._y=e.pageY},_onDropEnter:function(e){var t=e.drop.get(h),e=e.drag.get(h);t.test(this.get(u))||e.get(l).compareTo(t)||t.append(e)},_onDragOver:function(e){if(e.drop.get(h).test(this.get(u))&&e.drag.get(h)!==e.drop.get(h)&&!e.drag.get(h).contains(e.drop.get(h))){var t,o,r,n=!1,s=this.get("moveType").toLowerCase();switch(s=(n=e.drag.get(h).get(l).contains(e.drop.get(h))?!0:n)&&"move"===s?"insert":s){case"insert":o=this._up?"before":"after",r=e.drop.get(h),a.Sortable._test(r,this.get(d))?r.append(e.drag.get(h)):r.insert(e.drag.get(h),o);break;case"swap":a.DD.DDM.swapNode(e.drag,e.drop);break;case"move":case"copy":if(!(o=a.Sortable.getSortable(e.drop.get(h).get(l))))return;a.DD.DDM.getDrop(e.drag.get(h)).addToGroup(o.get(i)),n?a.DD.DDM.swapNode(e.drag,e.drop):("copy"===this.get("moveType")&&((t=(r=e.drag.get(h)).cloneNode(!0)).set(i,""),e.drag.set(h,t),o.delegate.createDrop(t,[o.get(i)]),r.setStyles({top:"",left:""})),e.drop.get(h).insert(e.drag.get(h),"before"))}this.fire(s,{same:n,drag:e.drag,drop:e.drop}),this.fire("moved",{same:n,drag:e.drag,drop:e.drop})}},_onDragStart:function(){var e=this.delegate,t=e.get("lastNode");t&&t.getDOMNode()&&t.setStyle(s,""),e.get(this.get(n)).setStyle(g,this.get(g)),e.get(o).setStyle(s,"999")},_onDragEnd:function(){this.delegate.get(this.get(n)).setStyle(g,1),this.delegate.get(o).setStyle(s,""),this.delegate.get(o).setStyles({top:"",left:""}),this.sync()},plug:function(e,t){return e&&"sort"===e.NAME.substring(0,4).toLowerCase()?this.constructor.superclass.plug.call(this,e,t):this.delegate.dd.plug(e,t),this},sync:function(){return this.delegate.syncTargets(),this},destructor:function(){this.drop.destroy(),this.delegate.destroy(),r.unreg(this,this.get(i))},join:function(e,t){return e instanceof a.Sortable?this[t="_join_"+(t=(t=t||"full").toLowerCase())]&&this[t](e):a.error("Sortable: join needs a Sortable Instance"),this},_join_none:function(e){this.delegate.dd.removeFromGroup(e.get(i)),e.delegate.dd.removeFromGroup(this.get(i))},_join_full:function(e){this.delegate.dd.addToGroup(e.get(i)),e.delegate.dd.addToGroup(this.get(i))},_join_outer:function(e){this.delegate.dd.addToGroup(e.get(i))},_join_inner:function(e){e.delegate.dd.addToGroup(this.get(i))},getOrdering:function(t){var o=[];return a.Lang.isFunction(t)||(t=function(e){return e}),a.one(this.get(d)).all(this.get(u)).each(function(e){o.push(t(e))}),o}},{NAME:"sortable",ATTRS:{handles:{value:!1},container:{value:"body"},nodes:{value:".dd-draggable"},opacity:{value:".75"},opacityNode:{value:"currentNode"},id:{value:null},moveType:{value:"insert"},invalid:{value:""}},_sortables:{},_test:function(e,t){t=t instanceof a.Node?t===e:e.test(t);return t},getSortable:function(t){var e,o=null;return(e=(t=a.one(t)).get(i))&&a.Sortable._sortables[e]?a.Sortable._sortables[e]:(a.Object.each(a.Sortable._sortables,function(e){a.Sortable._test(t,e.get(d))&&(o=e)}),o)},reg:function(e,t){t=t||e.get(i),a.Sortable._sortables[t]=e},unreg:function(o,e){(e=e||o.get(i))&&a.Sortable._sortables[e]?delete a.Sortable._sortables[e]:a.Object.each(a.Sortable._sortables,function(e,t){e===o&&delete r._sortables[t]})}}),a.Sortable=r},"@VERSION@",{requires:["dd-delegate","dd-drop-plugin","dd-proxy"]});