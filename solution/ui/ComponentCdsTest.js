jQuery.sap.declare("sap.workshop.cdsTest.Component");


sap.ui.core.UIComponent.extend("sap.workshop.cdsTest.Component", {
	init: function(){
		jQuery.sap.require("sap.m.MessageBox");
		jQuery.sap.require("sap.m.MessageToast");		
		
		  var oModel = new sap.ui.model.json.JSONModel({})
          sap.ui.getCore().setModel(oModel, "header"); 	
		  var oModel = new sap.ui.model.json.JSONModel({})
          sap.ui.getCore().setModel(oModel, "item"); 
	          
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
	},
	
	createContent: function() {
     
		var settings = {
				ID: "App",
				title: "Workshop CDS Schema/Table Test",
				description: "Workshop CDS Schema/Table Test",
			};
		
		var oView = sap.ui.view({
			id: "App",
			viewName: "cdsView.App",
			type: "XML",
			viewData: settings
		});
		
		var page = new sap.m.Page("pageID",{
		    title: "Workshop CDS Schema/Table Test",
		    content: oView
		});
		page.setBusyIndicatorDelay(10);
		 oView.setModel(sap.ui.getCore().getModel("header"), "header");
		 oView.setModel(sap.ui.getCore().getModel("item"), "item");			
		return page;	
	 
	
	}
});