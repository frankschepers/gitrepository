/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.MessageToast");jQuery.sap.require("sap.ui.core.Popup");jQuery.sap.require("sap.m.InstanceManager");sap.m.MessageToast={};sap.m.MessageToast._aPopups=[];sap.m.MessageToast._iOpenedPopups=0;sap.m.MessageToast._bNotBoundToOrientationChange=true;
sap.m.MessageToast._validateSettings=function(s){var m=s.my.split(" "),a=s.at.split(" "),c=sap.ui.core,D=c.Popup.Dock,M=this._getDockFormat(m),A=this._getDockFormat(a),r=/^(ease|linear|ease-in|ease-out|ease-in-out)$/i,b=/^(fit|flip|none|flipfit|flipflip|flip flip|flip fit|fitflip|fitfit|fit fit|fit flip)$/i,d=this+"._validateSettings";if(typeof s.duration!=="number"||!isFinite(s.duration)||!(Math.floor(s.duration)===s.duration)||s.duration<=0){throw new Error('"duration" needs to be a finite positive nonzero integer on '+d)}if(!c.CSSSize.isValid(s.width)){throw new Error(s.width+' is not of type '+'"sap.ui.core.CSSSize" for property "width" on '+d)}if(typeof M!=="string"||!(M in D)){throw new Error(s.my+' is not of type '+'"sap.ui.core.Popup.Dock" for property "my" on '+d)}if(typeof A!=="string"||!(A in D)){throw new Error(s.at+' is not of type '+'"sap.ui.core.Popup.Dock" for property "at" on '+d)}if(typeof s.offset!=="string"){throw new Error(s.offset+' is of type '+typeof s.offset+', expected "string" for property "offset" on '+d)}if(!b.test(s.collision)){throw new Error('"collision" needs to be a single value “fit”, “flip”, or “none”, or a pair for horizontal and vertical e.g. "fit flip”, "fit none", "flipfit"'+" on "+d)}if(typeof s.onClose!=="function"&&s.onClose!==null){throw new Error('"onClose" should be a function or null on '+d)}if(typeof s.autoClose!=="boolean"){throw new Error('"autoClose" should be a boolean on '+d)}if(!r.test(s.animationTimingFunction)){throw new Error('"animationTimingFunction" should be a string, expected values: '+"ease, linear, ease-in, ease-out, ease-in-out on "+d)}if(typeof s.animationDuration!=="number"||!isFinite(s.animationDuration)||!(Math.floor(s.animationDuration)===s.animationDuration)||s.animationDuration<0){throw new Error('"animationDuration" needs to be a finite positive integer on '+d)}};
sap.m.MessageToast._getDockFormat=function(m){return m.map(function(M){return M.charAt(0).toUpperCase()+M.slice(1)}).join("")};
sap.m.MessageToast._handleOrientationChange=function(){var i=0,p,P;for(;i<this._aPopups.length;i++){p=this._aPopups[i];if(p instanceof sap.ui.core.Popup){P=p._oPosition;p.setPosition(P.my,P.at,P.of,P.offset)}}};
sap.m.MessageToast._isDefaulPosition=function(o){var p=["my","at","of","offset"],i=0;for(;i<p.length;i++){if(o[p[i]]!==undefined){return false}}return true};
sap.m.MessageToast._createHTMLMarkup=function(s){var m=document.createElement("div");m.style.width=s.width;m.className="sapMMT";m.setAttribute("tabindex","-1");m.appendChild(document.createTextNode(s.message));return m};
sap.m.MessageToast.toString=function(){return"sap.m.MessageToast"};
sap.m.MessageToast.show=function(m,o){var s=this,$=jQuery,S=jQuery.extend({duration:3000,width:"15em",my:"center bottom",at:"center bottom",of:window,offset:"0 0",collision:"fit fit",onClose:null,animationTimingFunction:"ease",animationDuration:1000,autoClose:true},{message:m}),p=new sap.ui.core.Popup(),h,P,M;if(o){if(this._isDefaulPosition(o)){o.offset="0 -64"}$.extend(S,o)}else{S.offset="0 -64"}this._validateSettings.call(this,S);M=this._createHTMLMarkup(S);P=this._aPopups.push(p)-1;p.setContent(M);p.setPosition(S.my,S.at,S.of,S.offset,S.collision);if(jQuery.support.cssTransitions&&!jQuery.os.android){p.setAnimations(function fnMTOpen(a,d,O){O()},function fnMTClose(a,d,c){var C="opacity "+S.animationTimingFunction+" "+S.animationDuration+"ms";if(S.animationDuration>0){a[0].style.webkitTransition=C;a[0].style.transition=C;a[0].style.opacity=0;a.on("webkitTransitionEnd.sapMMessageToast transitionend.sapMMessageToast",function handleMTTransitionEnd(){a.off("webkitTransitionEnd.sapMMessageToast transitionend.sapMMessageToast");c()})}else{c()}})}p.setShadow(false);p.setAutoClose(S.autoClose);sap.m.InstanceManager.addPopoverInstance(p);if(this._bNotBoundToOrientationChange){this._bNotBoundToOrientationChange=false;$(window).on("resize.sapMMessageToast",jQuery.proxy(this._handleOrientationChange,this))}p.attachOpened(function handleMTOpened(){jQuery.sap.focus(s._aPopups[P].getContent())});p.open();this._iOpenedPopups++;p.attachClosed(function h(){sap.m.InstanceManager.removePopoverInstance(s._aPopups[P]);$(s._aPopups[P].getContent()).remove();s._aPopups[P].detachClosed(h);s._aPopups[P].destroy();s._aPopups[P]=null;s._iOpenedPopups--;if(s._iOpenedPopups===0){s._aPopups=[];$(window).off("resize.sapMMessageToast");s._bNotBoundToOrientationChange=true}if(typeof S.onClose==="function"){S.onClose.call(s)}});setTimeout(function(){var O=p.getOpenState();if(!(O==="CLOSED"||O==="CLOSING")){p.close()}},S.duration)};
