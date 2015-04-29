jQuery.sap.declare("Application");
jQuery.sap.require("sap.ui.app.Application");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");

sap.ui.app.Application.extend("Application", {

	init : function () {
		  var oModel = new sap.ui.model.json.JSONModel({})
          sap.ui.getCore().setModel(oModel, "header"); 	
		  var oModel = new sap.ui.model.json.JSONModel({})
          sap.ui.getCore().setModel(oModel, "item"); 		  
	},
	
	main : function () {
	    

		// create app view and put to html root element
		var root = this.getRoot();
		var page = new sap.m.Page("pageID",{
		    title: "Workshop CDS Schema/Table Test",
		    content: new sap.ui.xmlview("App", "cdsView.App")
		});
		page.setBusyIndicatorDelay(10);
		var app = new sap.m.App();
		app.addPage(page);
		app.placeAt(root);
	}
});          