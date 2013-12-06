/*
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ui.app.MockServer");jQuery.sap.require("sap.ui.base.ManagedObject");jQuery.sap.require("sap.ui.thirdparty.sinon");if(jQuery.browser.msie){jQuery.sap.require("sap.ui.thirdparty.sinon-ie")}(function(){sap.ui.base.ManagedObject.extend("sap.ui.app.MockServer",{constructor:function(i,s,S){sap.ui.base.ManagedObject.apply(this,arguments);sap.ui.app.MockServer._aServers.push(this)},metadata:{properties:{rootUri:"string",requests:{type:"object[]",defaultValue:[]}}},_oServer:null,_aFilter:null});sap.ui.app.MockServer.prototype.start=function(){this._oServer=sap.ui.app.MockServer._getInstance();this._aFilters=[];var r=this.getRequests();var l=r.length;for(var i=0;i<l;i++){var R=r[i];this._addRequestHandler(R.method,R.path,R.response)}};sap.ui.app.MockServer.prototype.stop=function(){if(this.isStarted()){this._removeAllRequestHandlers();this._removeAllFilters();this._oServer=null}};sap.ui.app.MockServer.prototype.isStarted=function(){return!!this._oServer};sap.ui.app.MockServer.prototype.simulate=function(m,M){var o={};var a=jQuery.sap.sjax({url:m,dataType:"xml"}).data;var e={};jQuery(a).find("EntitySet").each(function(i,E){var $=jQuery(E);var d=$.attr("EntityType").split(".");e[$.attr("Name")]={"schema":d[0],"type":d[1],"keys":[],"navprops":{}}});var r=function(d,f){var E=jQuery(jQuery(a).find("End[Role="+d+"][EntitySet]")).attr("EntitySet");var p=[];jQuery(a).find("[Role="+d+"]").find("PropertyRef").each(function(i,P){p.push(jQuery(P).attr("Name"))});return{"entitySet":E,"propRef":p}};var G=function(E,k){var f;jQuery.each(o[E],function(i,d){if(k==="("+c(e[E].keys,d)+")"){f=d;return true}});return f};jQuery.each(e,function(E,d){var k=jQuery(a).find("EntityType[Name="+d.type+"] PropertyRef");jQuery.each(k,function(i,p){d.keys.push(jQuery(p).attr("Name"))});var n=jQuery(a).find("EntityType[Name="+d.type+"] NavigationProperty");jQuery.each(n,function(i,N){var $=jQuery(N);d.navprops[$.attr("Name")]={"from":r($.attr("FromRole")),"to":r($.attr("ToRole"))}})});if(!jQuery.sap.endsWith(M,"/")){M+="/"}var c=function(k,E){var K="";jQuery.each(k,function(i,d){if(K){K+=","}K+=d+"='"+E[d]+"'"});return K};var R=function(E,f,n){var N=e[E].navprops[n];if(N&&N.to){var d=[];jQuery.each(o[N.to.entitySet],function(I,t){var h=true;for(var i=0,l=N.from.propRef.length;i<l;i++){if(f[N.from.propRef[i]]!=t[N.to.propRef[i]]){h=false;break}}if(h){d.push(t)}});return d}};var s=this.getRootUri();jQuery.each(e,function(E,d){var f=M+d.type+".json";o[E]=jQuery.sap.sjax({url:f,dataType:"json"}).data;jQuery.each(o[E],function(i,h){h.__metadata={uri:s+E+"("+c(d.keys,h)+")"};jQuery.each(d.navprops,function(k,n){h[k]={__deferred:{uri:s+E+"("+c(d.keys,h)+")/"+k}}})})});var b=[];b.push({method:"GET",path:"\\$metadata",response:function(x){x.respondFile(200,null,m)}});jQuery.each(e,function(E,d){jQuery.each(d.navprops,function(k,n){b.push({method:"GET",path:"("+E+")(\\([^/\\?#]+\\))/("+k+")/\\$count",response:function(x,E,K,N){var f=G(E,K);if(f){var h=R(E,f,N);x.respond(200,{"Content-Type":"text/plain;charset=utf-8"},""+h.length)}else{x.respond(404)}}});b.push({method:"GET",path:"("+E+")(\\([^/\\?#]+\\))/("+k+")/?(.*)?",response:function(x,E,K,N){var f=G(E,K);if(f){var h=R(E,f,N);x.respond(200,{"Content-Type":"application/json;charset=utf-8"},JSON.stringify({d:{results:h}}))}else{x.respond(404)}}})});b.push({method:"GET",path:"("+E+")/\\$count",response:function(x,E){x.respond(200,{"Content-Type":"text/plain;charset=utf-8"},""+o[E].length)}});b.push({method:"GET",path:"("+E+")(\\([^/\\?#]+\\))/?(.*)?",response:function(x,E,k){var f=G(E,k);if(f){x.respond(200,{"Content-Type":"application/json;charset=utf-8"},JSON.stringify({d:f}))}else{x.respond(404)}}});b.push({method:"GET",path:"("+E+")/?(.*)?",response:function(x,E){x.respond(200,{"Content-Type":"application/json;charset=utf-8"},JSON.stringify({d:{results:o[E]}}))}})});this.setRequests(b)};sap.ui.app.MockServer.prototype._removeAllRequestHandlers=function(){var r=this.getRequests();var l=r.length;for(var i=0;i<l;i++){sap.ui.app.MockServer._removeResponse(r[i].response)}};sap.ui.app.MockServer.prototype._removeAllFilters=function(){for(var i=0;i<this._aFilters.length;i++){sap.ui.app.MockServer._removeFilter(this._aFilters[i])}this._aFilters=null};sap.ui.app.MockServer.prototype._addRequestHandler=function(m,p,r){m=m?m.toUpperCase():m;if(typeof m!=="string"){throw new Error("Error in request configuration: value of 'method' has to be a string")}if(typeof p!=="string"){throw new Error("Error in request configuration: value of 'path' has to be a string")}if(typeof r!=="function"){throw new Error("Error in request configuration: value of 'response' has to be a function")}var u=this.getRootUri();p=this._createRegExpPattern(p);var P=u?(u+p):p;var R=this._createRegExp(P);this._addFilter(this._createFilter(m,R));this._oServer.respondWith(m,R,r)};sap.ui.app.MockServer.prototype._createRegExp=function(p){return new RegExp("^"+p+"$")};sap.ui.app.MockServer.prototype._createRegExpPattern=function(p){return p.replace(/:([\w\d]+)/g,"([^\/]+)")};sap.ui.app.MockServer.prototype._addFilter=function(f){this._aFilters.push(f);sap.ui.app.MockServer._addFilter(f)};sap.ui.app.MockServer.prototype._createFilter=function(r,R){return function(m,u,a,U,p){return r===m&&R.test(u)}};sap.ui.app.MockServer.prototype.destroy=function(s){sap.ui.base.ManagedObject.prototype.destroy.apply(this,arguments);this.stop();var S=sap.ui.app.MockServer._aServers;var i=jQuery.inArray(this,S);S.splice(i,1)};sap.ui.app.MockServer._aFilters=[];sap.ui.app.MockServer._oServer=null;sap.ui.app.MockServer._aServers=[];sap.ui.app.MockServer._getInstance=function(){if(!this._oServer){this._oServer=window.sinon.fakeServer.create();this._oServer.autoRespond=true}return this._oServer};sap.ui.app.MockServer.config=function(c){var s=this._getInstance();s.autoRespond=c.autoRespond===false?false:true;s.autoRespondAfter=c.autoRespondAfter||0;s.fakeHTTPMethods=c.fakeHTTPMethods||false};sap.ui.app.MockServer.respond=function(){this._getInstance().respond()};sap.ui.app.MockServer.startAll=function(){for(var i=0;i<this._aServers.length;i++){this._aServers[i].start()}};sap.ui.app.MockServer.stopAll=function(){for(var i=0;i<this._aServers.length;i++){this._aServers[i].stop()}this._getInstance().restore();this._oServer=null};sap.ui.app.MockServer.destroyAll=function(){this.stopAll();for(var i=0;i<this._aServers.length;i++){this._aServers[i].destroy()}};sap.ui.app.MockServer._addFilter=function(f){this._aFilters.push(f)};sap.ui.app.MockServer._removeFilter=function(f){var i=jQuery.inArray(f,this._aFilters);if(i!==-1){this._aFilters.splice(i,1)}return i!==-1};sap.ui.app.MockServer._removeResponse=function(r){var R=this._oServer.responses;var l=R.length;for(var i=0;i<l;i++){if(R[i].response===r){R.splice(i,1);return true}}return false};window.sinon.FakeXMLHttpRequest.useFilters=true;window.sinon.FakeXMLHttpRequest.addFilter(function(m,u,a,U,p){var f=sap.ui.app.MockServer._aFilters;for(var i=0;i<f.length;i++){var F=f[i];if(F(m,u,a,U,p)){return false}}return true});var g=function(f){if(/.*\.json$/.test(f)){return"JSON"}if(/.*\.xml$/.test(f)){return"XML"}return null};window.sinon.FakeXMLHttpRequest.prototype.respondFile=function(s,h,f){var r=jQuery.sap.sjax({url:f,dataType:"text"});if(!r.success)throw new Error("Could not load file from: "+f);var d=r.data;var m=g(f);if(this["respond"+m]){this["respond"+m](s,h,d)}else{this.respond(s,h,d)}};window.sinon.FakeXMLHttpRequest.prototype.respondJSON=function(s,h,j){h=h||{};h["Content-Type"]=h["Content-Type"]||"application/json";this.respond(s,h,typeof j==="string"?j:JSON.stringify(j))};window.sinon.FakeXMLHttpRequest.prototype.respondXML=function(s,h,x){h=h||{};h["Content-Type"]=h["Content-Type"]||"application/xml";this.respond(s,h,x)}})();
