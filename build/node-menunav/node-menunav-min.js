YUI.add("node-menunav",function(s,n){var c=s.UA,r=s.later,i=s.ClassNameManager.getClassName,a="menu",_="menuitem",l="parentNode",t="children",P="offsetHeight",K="offsetWidth",m="id",h=".",v="handledMouseOut",d="handledMouseOver",X="active",e="label",z="a",M="mousedown",f="keydown",U="click",g="role",V="presentation",Y="descendants",b="activeDescendant",j="useARIA",p="aria-hidden",q="content",S="host",B=b+"Change",I="autoSubmenuDisplay",W="mouseOutHideDelay",G=i(a),o=i(a,"hidden"),J=i(a,"horizontal"),T=i(a,e),Q=i(a,e,X),A=i(a,e,a+"visible"),Z=i(_),u=i(_,X),w=h+G,y=h+i(a,"toggle"),D=h+i(a,q),$=">"+D+">ul>li>a",ee=">"+D+">ul>li>"+(h+T)+">a:first-child",ne=function(e){return e.previous()||(e=e.get(l).get(t)).item(e.size()-1)},te=function(e){return e.next()||e.get(l).get(t).item(0)},C=function(e){var n=!1;return n=e?e.get("nodeName").toLowerCase()===z:n},ue=function(e){return e.hasClass(Z)},k=function(e){return e.hasClass(T)},O=function(e){return e.hasClass(J)},H=function(e){return e.hasClass(A)},oe=function(e){return C(e)?e:e.one(z)},F=function(e,n,t){var u;return u=e&&!(u=e.hasClass(n)?e:u)&&t?e.ancestor(h+n):u},x=function(e){return e.ancestor(w)},ie=function(e,n){return F(e,G,n)},se=function(e,n){var t;return t=e?F(e,Z,n):t},E=function(e,n){var t;return t=e?n?F(e,T,n):F(e,T)||e.one(h+T):t},R=function(e,n){var t;return t=e?se(e,n)||E(e,n):t},L=function(e){return R(e.one("li"))},ae=function(e){return ue(e)?u:Q},ce=function(e,n){return e&&!e[d]&&(e.compareTo(n)||e.contains(n))},re=function(e,n){return e&&!e[v]&&!e.compareTo(n)&&!e.contains(n)},N=function(){N.superclass.constructor.apply(this,arguments)};N.NAME="nodeMenuNav",N.NS="menuNav",N.SHIM_TEMPLATE_TITLE="Menu Stacking Shim",N.SHIM_TEMPLATE='<iframe frameborder="0" tabindex="-1" class="'+i("shim")+'" title="'+N.SHIM_TEMPLATE_TITLE+'" src="javascript:false;"></iframe>',N.ATTRS={useARIA:{value:!0,writeOnce:!0,lazyAdd:!1,setter:function(e){var n,t,u,o=this.get(S);e&&(o.set(g,a),o.all("ul,li,"+D).set(g,V),o.all(h+i(_,q)).set(g,_),o.all(h+T).each(function(e){(u=(n=e).one(y))&&(u.set(g,V),n=u.previous()),n.set(g,_),n.set("aria-haspopup",!0),(t=e.next())&&(t.set(g,a),n=t.previous(),(u=n.one(y))&&(n=u),u=s.stamp(n),n.get(m)||n.set(m,u),t.set("aria-labelledby",u),t.set(p,!0))}))}},autoSubmenuDisplay:{value:!0,writeOnce:!0},submenuShowDelay:{value:250,writeOnce:!0},submenuHideDelay:{value:250,writeOnce:!0},mouseOutHideDelay:{value:750,writeOnce:!0}},s.extend(N,s.Plugin.Base,{_rootMenu:null,_activeItem:null,_activeMenu:null,_hasFocus:!1,_blockMouseEvent:!1,_currentMouseX:0,_movingToSubmenu:!1,_showSubmenuTimer:null,_hideSubmenuTimer:null,_hideAllSubmenusTimer:null,_firstItem:null,initializer:function(e){var n=this,t=this.get(S),u=[];t&&((n._rootMenu=t).all("ul:first-child").addClass("first-of-type"),t.all(w).addClass(o),u.push(t.on("mouseover",n._onMouseOver,n)),u.push(t.on("mouseout",n._onMouseOut,n)),u.push(t.on("mousemove",n._onMouseMove,n)),u.push(t.on(M,n._toggleSubmenuDisplay,n)),u.push(s.on("key",n._toggleSubmenuDisplay,t,"down:13",n)),u.push(t.on(U,n._toggleSubmenuDisplay,n)),u.push(t.on("keypress",n._onKeyPress,n)),u.push(t.on(f,n._onKeyDown,n)),t=t.get("ownerDocument"),u.push(t.on(M,n._onDocMouseDown,n)),u.push(t.on("focus",n._onDocFocus,n)),this._eventHandlers=u,n._initFocusManager())},destructor:function(){var e=this._eventHandlers;e&&(s.Array.each(e,function(e){e.detach()}),this._eventHandlers=null),this.get(S).unplug("focusManager")},_isRoot:function(e){return this._rootMenu.compareTo(e)},_getTopmostSubmenu:function(e){var n=x(e),e=!n||this._isRoot(n)?e:this._getTopmostSubmenu(n);return e},_clearActiveItem:function(){var e=this._activeItem;e&&e.removeClass(ae(e)),this._activeItem=null},_setActiveItem:function(e){e&&(this._clearActiveItem(),e.addClass(ae(e)),this._activeItem=e)},_focusItem:function(e){var n,t=this;e&&t._hasFocus&&(n=x(e),e=oe(e),n&&!n.compareTo(t._activeMenu)&&(t._activeMenu=n,t._initFocusManager()),t._focusManager.focus(e))},_showMenu:function(e){var n=x(e),t=e.get(l),u=t.getXY();this.get(j)&&e.set(p,!1),O(n)?u[1]=u[1]+t.get(P):u[0]=u[0]+t.get(K),e.setXY(u),c.ie&&c.ie<8&&(6!==c.ie||e.hasIFrameShim||(e.appendChild(s.Node.create(N.SHIM_TEMPLATE)),e.hasIFrameShim=!0),e.setStyles({height:"",width:""}),e.setStyles({height:e.get(P)+"px",width:e.get(K)+"px"})),e.previous().addClass(A),e.removeClass(o)},_hideMenu:function(e,n){var t=e.previous();t.removeClass(A),n&&(this._focusItem(t),this._setActiveItem(t)),(n=e.one(h+u))&&n.removeClass(u),e.setStyles({left:"",top:""}),e.addClass(o),this.get(j)&&e.set(p,!0)},_hideAllSubmenus:function(e){var n=this;e.all(w).each(s.bind(function(e){n._hideMenu(e)},n))},_cancelShowSubmenuTimer:function(){var e=this._showSubmenuTimer;e&&(e.cancel(),this._showSubmenuTimer=null)},_cancelHideSubmenuTimer:function(){var e=this._hideSubmenuTimer;e&&(e.cancel(),this._hideSubmenuTimer=null)},_initFocusManager:function(){var e,n=this,t=n._rootMenu,u=n._activeMenu||t,o=n._isRoot(u)?"":"#"+u.get("id"),i=n._focusManager,u=O(u)?(e=o+$+","+o+ee,{next:"down:39",previous:"down:37"}):(e=o+$,{next:"down:40",previous:"down:38"});i?(i.set(b,-1),i.set(Y,e),i.set("keys",u)):(t.plug(s.Plugin.NodeFocusManager,{descendants:e,keys:u,circular:!0}),i=t.focusManager,o="#"+t.get("id")+w+" a,"+y,t.all(o).set("tabIndex",-1),i.on(B,this._onActiveDescendantChange,i,this),i.after(B,this._afterActiveDescendantChange,i,this),n._focusManager=i)},_onActiveDescendantChange:function(e,n){"UI"===e.src&&n._activeMenu&&!n._movingToSubmenu&&n._hideAllSubmenus(n._activeMenu)},_afterActiveDescendantChange:function(e,n){"UI"===e.src&&(e=R(this.get(Y).item(e.newVal),!0),n._setActiveItem(e))},_onDocFocus:function(e){var n,t=this,e=(t._activeItem,e.target);t._rootMenu.contains(e)?t._hasFocus?(n=x(e),t._activeMenu.compareTo(n)||(t._activeMenu=n,t._initFocusManager(),t._focusManager.set(b,e),t._setActiveItem(R(e,!0)))):(t._hasFocus=!0,(n=R(e,!0))&&t._setActiveItem(n)):(t._clearActiveItem(),t._cancelShowSubmenuTimer(),t._hideAllSubmenus(
t._rootMenu),t._activeMenu=t._rootMenu,t._initFocusManager(),t._focusManager.set(b,0),t._hasFocus=!1)},_onMenuMouseOver:function(e,n){var t=this,u=t._hideAllSubmenusTimer;u&&(u.cancel(),t._hideAllSubmenusTimer=null),t._cancelHideSubmenuTimer(),e&&!e.compareTo(t._activeMenu)&&(t._activeMenu=e,t._hasFocus)&&t._initFocusManager(),t._movingToSubmenu&&O(e)&&(t._movingToSubmenu=!1)},_hideAndFocusLabel:function(){var e=this,n=e._activeMenu;e._hideAllSubmenus(e._rootMenu),n&&(n=e._getTopmostSubmenu(n),e._focusItem(n.previous()))},_onMenuMouseOut:function(e,n){var t=this,u=t._activeMenu,n=n.relatedTarget,o=t._activeItem;u&&!u.contains(n)&&((u=x(u))&&!u.contains(n)?0<t.get(W)&&(t._cancelShowSubmenuTimer(),t._hideAllSubmenusTimer=r(t.get(W),t,t._hideAndFocusLabel)):o&&(n=x(o),t._isRoot(n)||t._focusItem(n.previous())))},_onMenuLabelMouseOver:function(n,e){var t,u=this,o=u._activeMenu,i=u._isRoot(o),i=u.get(I)&&i||!i,s=u.get("submenuShowDelay"),a=function(e){u._cancelHideSubmenuTimer(),u._cancelShowSubmenuTimer(),H(n)||(t=n.next())&&(u._hideAllSubmenus(o),u._showSubmenuTimer=r(e,u,u._showMenu,t))};u._focusItem(n),u._setActiveItem(n),i&&(u._movingToSubmenu?u._hoverTimer=r(s,u,function(){a(0)}):a(s))},_onMenuLabelMouseOut:function(e,n){var t=this,u=t._isRoot(t._activeMenu),u=t.get(I)&&u||!u,n=n.relatedTarget,e=e.next(),o=t._hoverTimer;o&&o.cancel(),t._clearActiveItem(),u&&(t._movingToSubmenu&&!t._showSubmenuTimer&&e?t._hideSubmenuTimer=r(t.get("submenuHideDelay"),t,t._hideMenu,e):t._movingToSubmenu||!e||n&&(e.contains(n)||n.compareTo(e))||(t._cancelShowSubmenuTimer(),t._hideMenu(e)))},_onMenuItemMouseOver:function(e,n){var t=this,u=t._activeMenu,o=t._isRoot(u),o=t.get(I)&&o||!o;t._focusItem(e),t._setActiveItem(e),o&&!t._movingToSubmenu&&t._hideAllSubmenus(u)},_onMenuItemMouseOut:function(e,n){this._clearActiveItem()},_onVerticalMenuKeyDown:function(e){var n,t,u,o,i=this,s=i._activeMenu,a=i._rootMenu,c=e.target,r=!1;switch(e.keyCode){case 37:(t=x(s))&&O(t)?(i._hideMenu(s),u=ne(s.get(l)),(o=R(u))&&(k(o)&&(n=o.next())?(i._showMenu(n),i._focusItem(L(n)),i._setActiveItem(L(n))):(i._focusItem(o),i._setActiveItem(o)))):i._isRoot(s)||i._hideMenu(s,!0),r=!0;break;case 39:k(c)?(n=c.next())&&(i._showMenu(n),i._focusItem(L(n)),i._setActiveItem(L(n))):O(a)&&(n=i._getTopmostSubmenu(s),u=te(n.get(l)),o=R(u),i._hideAllSubmenus(a),o)&&(k(o)&&(n=o.next())?(i._showMenu(n),i._focusItem(L(n)),i._setActiveItem(L(n))):(i._focusItem(o),i._setActiveItem(o))),r=!0}r&&e.preventDefault()},_onHorizontalMenuKeyDown:function(e){var n=this,t=n._activeMenu,u=e.target,u=R(u,!0),o=!1;40===e.keyCode&&(n._hideAllSubmenus(t),k(u))&&((t=u.next())&&(n._showMenu(t),n._focusItem(L(t)),n._setActiveItem(L(t))),o=!0),o&&e.preventDefault()},_onMouseMove:function(e){var n=this;r(10,n,function(){n._currentMouseX=e.pageX})},_onMouseOver:function(e){var n,t,u,o,i=this;i._blockMouseEvent?i._blockMouseEvent=!1:(n=e.target,u=ie(n,!0),t=E(n,!0),o=se(n,!0),ce(u,n)&&(i._onMenuMouseOver(u,e),u[d]=!0,u[v]=!1,u=x(u))&&(u[v]=!0,u[d]=!1),ce(t,n)&&(i._onMenuLabelMouseOver(t,e),t[d]=!0,t[v]=!1),ce(o,n)&&(i._onMenuItemMouseOver(o,e),o[d]=!0,o[v]=!1))},_onMouseOut:function(e){var n,t,u,o=this,i=o._activeMenu,s=!1;o._movingToSubmenu=i&&!O(i)&&e.pageX-5>o._currentMouseX,i=e.target,n=e.relatedTarget,t=ie(i,!0),u=E(i,!0),i=se(i,!0),re(u,n)&&(o._onMenuLabelMouseOut(u,e),u[v]=!0,u[d]=!1),re(i,n)&&(o._onMenuItemMouseOut(i,e),i[v]=!0,i[d]=!1),u&&(i=u.next())&&n&&(n.compareTo(i)||i.contains(n))&&(s=!0),(re(t,n)||s)&&(o._onMenuMouseOut(t,e),t[v]=!0,t[d]=!1)},_toggleSubmenuDisplay:function(e){var n,t,u,o=this,i=e.target,s=E(i,!0),a=e.type;s&&(n=C(i)?i:i.ancestor(C))&&(u=(n=n.getAttribute("href",2)).indexOf("#"),t=n.length,0===u)&&1<t&&(u=n.substr(1,t),t=s.next())&&t.get(m)===u&&(a!==M&&a!==f||((c.opera||c.gecko||c.ie)&&a===f&&!o._preventClickHandle&&(o._preventClickHandle=o._rootMenu.on("click",function(e){e.preventDefault(),o._preventClickHandle.detach(),o._preventClickHandle=null})),a==M&&(e.preventDefault(),e.stopImmediatePropagation(),o._hasFocus=!0),o._isRoot(x(i))?H(s)?(o._hideMenu(t),o._focusItem(s),o._setActiveItem(s)):(o._hideAllSubmenus(o._rootMenu),o._showMenu(t),o._focusItem(L(t)),o._setActiveItem(L(t))):o._activeItem==s?(o._showMenu(t),o._focusItem(L(t)),o._setActiveItem(L(t))):s._clickHandle||(s._clickHandle=s.on("click",function(){o._hideAllSubmenus(o._rootMenu),o._hasFocus=!1,o._clearActiveItem(),s._clickHandle.detach(),s._clickHandle=null}))),a===U)&&e.preventDefault()},_onKeyPress:function(e){switch(e.keyCode){case 37:case 38:case 39:case 40:e.preventDefault()}},_onKeyDown:function(e){var n=this,t=n._activeItem,u=e.target,o=x(u);o&&(n._activeMenu=o,O(o)?n._onHorizontalMenuKeyDown(e):n._onVerticalMenuKeyDown(e),27===e.keyCode)&&(n._isRoot(o)?t&&(k(t)&&H(t)?(u=t.next())&&n._hideMenu(u):(n._focusManager.blur(),n._clearActiveItem(),n._hasFocus=!1)):(c.opera?r(0,n,function(){n._hideMenu(o,!0)}):n._hideMenu(o,!0),e.stopPropagation(),n._blockMouseEvent=!!c.gecko))},_onDocMouseDown:function(e){var n=this._rootMenu,e=e.target;n.compareTo(e)||n.contains(e)||(this._hideAllSubmenus(n),c.webkit&&(this._hasFocus=!1,this._clearActiveItem()))}}),s.namespace("Plugin"),s.Plugin.NodeMenuNav=N},"@VERSION@",{requires:["node","classnamemanager","plugin","node-focusmanager"],skinnable:!0});