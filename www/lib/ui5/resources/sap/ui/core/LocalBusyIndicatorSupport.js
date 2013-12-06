/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ui.core.LocalBusyIndicatorSupport");
sap.ui.core.LocalBusyIndicatorSupport=function(){if(this===sap.ui.core.Control.prototype){this._sapUiCoreLocalBusy_oPopup;this._sapUiCoreLocalBusy_busyIndicator;this._sapUiCoreLocalBusy_previousFocus=null;this._sapUiCoreLocalBusy_tabIndices=[];this._sapUiCoreLocalBusy_delay=1000;this.setBusy=function(b){if(this._sapUiCoreLocalBusy_isBusy===b){return}var t=this,$=this.$(),p="focusin focusout keydown keypress keyup";this._sapUiCoreLocalBusy_isBusy=b;if(b){jQuery.sap.require("sap.ui.core.Popup");if(this._sapUiCoreLocalBusy_busyIndicator){delete this._sapUiCoreLocalBusy_busyIndicator}if($.length<=0){return}$.attr("aria-busy",true);var w=$.outerWidth()+"px";var h=$.outerHeight()+"px";this._sapUiCoreLocalBusy_busyIndicator=new sap.ui.core.LocalBusyIndicator({width:w,height:h});var T=$.find('[tabindex]');T.each(function(i,o){var r=jQuery(o),a=r.attr('tabindex');if(a<0)return true;t._sapUiCoreLocalBusy_tabIndices.push({ref:r,tabindex:a});r.attr('tabindex',-1);r.bind(p,t._sapUiCoreLocalBusyPreventEvents)});this._sapUiCoreLocalBusy_oPopup=new sap.ui.core.Popup(this._sapUiCoreLocalBusy_busyIndicator,false,false,false);this._sapUiCoreLocalBusy_oPopup.attachOpened(jQuery.proxy(this._sapUiCoreLocalBusyPopupOpened,this));this._sapUiCoreLocalBusy_oPopup.attachClosed(jQuery.proxy(this._sapUiCoreLocalBusyPopupClosed,this));this._delayedCallId=jQuery.sap.delayedCall(this._sapUiCoreLocalBusy_delay,this,"_sapUiCoreLocalBusyPopupOpen")}else{if($.length>0){$.attr("aria-busy",false)}if(this._delayedCallId){jQuery.sap.clearDelayedCall(this._delayedCallId);delete this._delayedCallId;if(this._sapUiCoreLocalBusy_busyIndicator){this._sapUiCoreLocalBusy_busyIndicator.destroy();delete this._sapUiCoreLocalBusy_busyIndicator}}jQuery.each(this._sapUiCoreLocalBusy_tabIndices,function(i,o){o.ref.attr('tabindex',o.tabindex);o.ref.unbind(p,t._sapUiCoreLocalBusyPreventEvents)});this._sapUiCoreLocalBusy_tabIndices=[];if(this._sapUiCoreLocalBusy_oPopup){this._sapUiCoreLocalBusy_oPopup.close()}}};this.isBusy=function(){return this._sapUiCoreLocalBusy_isBusy};this.setBusyIndicatorDelay=function(d){this._sapUiCoreLocalBusy_delay=d};this.getBusyIndicatorDelay=function(){return this._sapUiCoreLocalBusy_delay};this._sapUiCoreLocalBusyPreventEvents=function(e){e.preventDefault();e.stopImmediatePropagation()};this._sapUiCoreLocalBusyPreventDelegate={onAny:function(){}};this._sapUiCoreLocalBusyPopupOpen=function(){this._sapUiCoreLocalBusy_oPopup.open(sap.ui.core.Popup.Dock.BeginTop,sap.ui.core.Popup.Dock.BeginTop,this,"0 0",null,true)};this._sapUiCoreLocalBusyPopupOpened=function(){jQuery.sap.clearDelayedCall(this._delayedCallId);delete this._delayedCallId;if(this._sapUiCoreLocalBusy_oPopup){jQuery.sap.focus(this._sapUiCoreLocalBusy_oPopup.getContent().$())}};this._sapUiCoreLocalBusyPopupClosed=function(){jQuery.sap.clearDelayedCall(this._delayedCallId);delete this._delayedCallId;if(this._sapUiCoreLocalBusy_busyIndicator){this._sapUiCoreLocalBusy_busyIndicator.destroy();delete this._sapUiCoreLocalBusy_busyIndicator}};this._sapUiCoreLocalBusy_Exit=function(){if(this._delayedCallId){jQuery.sap.clearDelayedCall(this._delayedCallId);delete this._delayedCallId}if(this._sapUiCoreLocalBusy_busyIndicator){this._sapUiCoreLocalBusy_busyIndicator.destroy();delete this._sapUiCoreLocalBusy_busyIndicator}if(this._sapUiCoreLocalBusy_oPopup){this._sapUiCoreLocalBusy_oPopup.detachOpened(this._sapUiCoreLocalBusyPopupOpened);this._sapUiCoreLocalBusy_oPopup.detachClosed(this._sapUiCoreLocalBusyPopupClosed);this._sapUiCoreLocalBusy_oPopup.destroy();delete this._sapUiCoreLocalBusy_oPopup}};this._sapUiCoreLocalBusy_initBusyIndicator=function(){this._sapUiCoreLocalBusy_isBusy=false;var d={onAfterRendering:function(){if(this._sapUiCoreLocalBusy_isBusy){var t=this;setTimeout(function(){t._sapUiCoreLocalBusy_isBusy=!t._sapUiCoreLocalBusy_isBusy;var D=t._sapUiCoreLocalBusy_delay;t.setBusyIndicatorDelay(0);t.setBusy(true);t.setBusyIndicatorDelay(D)},0)}}};this.addDelegate(d,false,this)}}else{jQuery.sap.log.error("Only controls can use the LocalBusyIndicator",this)}};
jQuery.sap.require("sap.ui.core.Element");
