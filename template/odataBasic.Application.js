jQuery.sap.declare("Application");
jQuery.sap.require("sap.ui.app.Application");

sap.ui.app.Application.extend("Application", {

	init : function () {
		  //To-Do Insert Model Here
	},
	
	main : function () {
	    

		// create app view and put to html root element
		var root = this.getRoot();
		var page = new sap.m.Page({
		    title: "OData Basic Exercise",
		    content: new sap.ui.jsview("app", "view.App")
		});        
		var app = new sap.m.App();
		app.addPage(page);
		app.placeAt(root);
	}
}); 