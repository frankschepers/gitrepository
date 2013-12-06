sap.ui.controller("view.HomePage", {
    onInit: function(){	
		this.getView().addEventDelegate({
			onAfterHide: function(evt) {
				//This event is fired every time when the NavContainer has made this child control invisible.
			},
			onAfterShow: function(evt) {
				//This event is fired every time when the NavContainer has made this child control visible.
			},
			onBeforeFirstShow: function(evt) {
				//This event is fired before the NavContainer shows this child control for the first time.
			},
			onBeforeHide: function(evt) {
				//This event is fired every time before the NavContainer hides this child control.
			},
			onBeforeShow: function(evt) {
				//This event is fired every time before the NavContainer shows this child control.
			}
		});
	},
	onAfterRendering: function(evt){
	},
	
	homePage_onNavButtonTap: function() {
	},
	
	btn_onTap: function() {
        var bus = sap.ui.getCore().getEventBus();
        bus.publish("nav", "to", { 
            id : "appView--detailPageView"
        });
    },

	onHelloButton: function(evt) {
	//Get the controls
		var helloLabel = this.byId("helloLabel");
		var helloInput = this.byId("helloInput");
		//Get the value of helloInput
		var newLabel = helloInput.getValue();
		//Check the newLavel value is not empty and set the label
		if(newLabel.length > 0) {
			helloLabel.setText(newLabel);
		}
	}
});