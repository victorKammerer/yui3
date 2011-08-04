YUI.add("calendar",function(a){var e=a.ClassNameManager.getClassName,m="calendar",h=e(m,"header"),d=e(m,"day-selected"),b=e(m,"day"),l=e(m,"prevmonth-day"),j=e(m,"nextmonth-day"),k=a.DataType.Date,i=a.delegate,g=e(m,"pane"),f=a.UA.os;function c(n){c.superclass.constructor.apply(this,arguments);}a.Calendar=a.extend(c,a.CalendarBase,{_lastSelectedDate:null,initializer:function(){this.plug(a.Plugin.CalendarNavigator);},syncUI:function(){},_bindCalendarEvents:function(){var n=this.get("contentBox"),o=n.one("."+g);o.on("selectstart",function(p){p.preventDefault();});o.delegate("click",this._clickCalendar,"."+b,this);},_clickCalendar:function(q){var r=q.target,o=r.hasClass(b)&&!r.hasClass(l)&&!r.hasClass(j),n=r.hasClass(d);switch(this.get("selectionMode")){case ("single"):if(o){if(!n){this._clearSelection(true);this._addDateToSelection(this._nodeToDate(r));}}break;case ("multiple-sticky"):if(o){if(n){this._removeDateFromSelection(this._nodeToDate(r));}else{this._addDateToSelection(this._nodeToDate(r));}}break;case ("multiple"):if(!q.metaKey&&!q.ctrlKey&&!q.shiftKey){this._clearSelection(true);this._lastSelectedDate=this._nodeToDate(r);this._addDateToSelection(this._lastSelectedDate);}else{if(((f=="macintosh"&&q.metaKey)||(f!="macintosh"&&q.ctrlKey))&&!q.shiftKey){if(n){this._removeDateFromSelection(this._nodeToDate(r));this._lastSelectedDate=null;}else{this._lastSelectedDate=this._nodeToDate(r);this._addDateToSelection(this._lastSelectedDate);}}else{if(((f=="macintosh"&&q.metaKey)||(f!="macintosh"&&q.ctrlKey))&&q.shiftKey){if(this._lastSelectedDate!=null){var p=this._nodeToDate(r);this._addDateRangeToSelection(p,this._lastSelectedDate);this._lastSelectedDate=p;}else{this._lastSelectedDate=this._nodeToDate(r);this._addDateToSelection(this._lastSelectedDate);}}else{if(q.shiftKey){if(this._lastSelectedDate!=null){var p=this._nodeToDate(r);this._clearSelection(true);this._addDateRangeToSelection(p,this._lastSelectedDate);this._lastSelectedDate=p;}else{this._clearSelection(true);this._lastSelectedDate=this._nodeToDate(r);this._addDateToSelection(this._lastSelectedDate);}}}}}break;}if(o){this.fire("dateClick",{cell:r,date:this._nodeToDate(r)});}else{if(r.hasClass(l)){this.fire("prevMonthClick");}else{if(r.hasClass(j)){this.fire("nextMonthClick");}}}},subtractMonth:function(n){this.set("date",k.addMonths(this.get("date"),-1));n.halt();},subtractYear:function(n){this.set("date",k.addYears(this.get("date"),-1));n.halt();},addMonth:function(n){this.set("date",k.addMonths(this.get("date"),1));n.halt();},addYear:function(n){this.set("date",k.addYears(this.get("date"),1));n.halt();},},{NAME:"Calendar",ATTRS:{selectionMode:{value:"single"},date:{value:new Date(),setter:function(s){var o=this._normalizeDate(s),p=k.addMonths(o,this._paneNumber-1),q=this.get("minimumDate"),r=this.get("maximumDate");if((q==null||k.isGreaterOrEqual(o,q))&&(r==null||k.isGreaterOrEqual(r,p))){return o;}else{if(q!=null&&k.isGreater(q,o)){return q;}else{if(r!=null&&k.isGreater(p,r)){var n=k.addMonths(r,-1*(this._paneNumber-1));return n;}}}}},minimumDate:{value:null,setter:function(p){if(p!=null){var o=this.get("date"),n=this._normalizeDate(p);if(o!=null&&!k.isGreaterOrEqual(o,n)){this.set("date",n);}return n;}else{return p;}}},maximumDate:{value:null,setter:function(p){if(p!=null){var n=this.get("date"),o=this._normalizeDate(p);if(n!=null&&!k.isGreaterOrEqual(p,k.addMonths(n,this._paneNumber-1))){this.set("date",k.addMonths(o,-1*(this._paneNumber-1)));}return o;}else{return p;}}}}});},"@VERSION@",{lang:["en","ru"],requires:["calendar-base","calendarnavigator"]});