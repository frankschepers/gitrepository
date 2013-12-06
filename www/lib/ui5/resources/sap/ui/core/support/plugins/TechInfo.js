/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ui.core.support.plugins.TechInfo");jQuery.sap.require("sap.ui.core.support.Plugin");jQuery.sap.require("jquery.sap.encoder");jQuery.sap.require("jquery.sap.script");(function(){sap.ui.core.support.Plugin.extend("sap.ui.core.support.plugins.TechInfo",{constructor:function(S){sap.ui.core.support.Plugin.apply(this,["sapUiSupportTechInfo","Technical Information",S]);this._aEventIds=this.isToolPlugin()?[this.getId()+"Data"]:[this.getId()+"ToggleDebug",this.getId()+"Refresh"]}});sap.ui.core.support.plugins.TechInfo.prototype.onsapUiSupportTechInfoData=function(e){var t=this;var d=e.getParameter("data");d.modules.sort();var h=["<div class='sapUiSupportToolbar'>","<a href='javascript:void(0);' id='",t.getId(),"-Refresh' class='sapUiSupportLink'>Refresh</a>","<div><div class='sapUiSupportTechInfoCntnt'>","<table border='0' cellpadding='3'>"];l(h,true,true,"SAPUI5 Version",function(b){b.push(d.version," (built at ",d.build,", last change ",d.change,")")});l(h,true,true,"User Agent",function(b){b.push(d.useragent,(d.docmode?", Document Mode '"+d.docmode+"'":""))});l(h,true,true,"Debug Sources",function(b){b.push((d.debug?"ON":"OFF"),"<a href='javascript:void(0);' id='",t.getId(),"-tggleDbgSrc' class='sapUiSupportLink'>Toggle</a>")});l(h,true,true,"Application",d.appurl);m(h,true,true,"Configuration (bootstrap)",d.bootconfig);m(h,true,true,"Configuration (computed)",d.config);l(h,true,true,"Loaded Modules",function(b){jQuery.each(d.modules,function(i,v){if(v.indexOf("sap.ui.core.support")<0){b.push("<span>",v,"</span>");if(i<d.modules.length-1){b.push(", ")}}})});m(h,true,true,"URI Parameters",d.uriparams);h.push("</table></div>");this.$().html(h.join(""));jQuery.sap.byId(this.getId()+"-tggleDbgSrc").bind("click",function(){sap.ui.core.support.Support.getStub().sendEvent(t.getId()+"ToggleDebug",{})});jQuery.sap.byId(this.getId()+"-Refresh").bind("click",function(){sap.ui.core.support.Support.getStub().sendEvent(t.getId()+"Refresh",{})})};sap.ui.core.support.plugins.TechInfo.prototype.onsapUiSupportTechInfoToggleDebug=function(e){jQuery.sap.debug(!!!jQuery.sap.debug());s(this)};sap.ui.core.support.plugins.TechInfo.prototype.onsapUiSupportTechInfoRefresh=function(e){s(this)};sap.ui.core.support.plugins.TechInfo.prototype.init=function(S){sap.ui.core.support.Plugin.prototype.init.apply(this,arguments);if(!this.isToolPlugin()){s(this);return}this.$().html("No Information available")};function s(p){var c=sap.ui.getCore().getConfiguration();var C={"theme":c.getTheme(),"language":c.getLanguage(),"formatLocale":c.getFormatLocale(),"accessibility":""+c.getAccessibility(),"animation":""+c.getAnimation(),"rtl":""+c.getRTL(),"debug":""+c.getDebug(),"inspect":""+c.getInspect(),"originInfo":""+c.getOriginInfo(),"noDuplicateIds":""+c.getNoDuplicateIds()};sap.ui.core.support.Support.getStub().sendEvent(p.getId()+"Data",{data:{"version":sap.ui.version,"build":sap.ui.buildinfo.buildtime,"change":sap.ui.buildinfo.lastchange,"useragent":navigator.userAgent,"docmode":document.documentMode?document.documentMode:"","debug":jQuery.sap.debug(),"bootconfig":window["sap-ui-config"]?window["sap-ui-config"]:{},"config":C,"modules":jQuery.sap.getAllDeclaredModules(),"uriparams":jQuery.sap.getUriParameters().mParams,"appurl":window.location.href}})};function l(b,r,a,c,d){b.push("<tr><td ",r?"align='right' ":"","valign='top'>","<label class='sapUiSupportLabel'>",jQuery.sap.escapeHTML(c),"</label></td><td",a?" class='sapUiSupportTechInfoBorder'":"",">");var e=d;if(jQuery.isFunction(d)){e=d(b)||""}b.push(jQuery.sap.escapeHTML(e));b.push("</td></tr>")};function m(b,r,a,c,d){l(b,r,a,c,function(b){b.push("<table border='0' cellspacing='0' cellpadding='3'>");jQuery.each(d,function(i,v){var e="";if(v){if(typeof(v)==="string"||typeof(v)==="string"||typeof(v)==="boolean"){e=v}else if((jQuery.isArray(v)||jQuery.isPlainObject(v))&&window.JSON){e=window.JSON.stringify(v)}}l(b,false,false,i,""+e)});b.push("</table>")})}}());
