sap.ui.jsview("exercise_management.Search", {

	getControllerName : function() {
		return "exercise_management.Search";
	},

	createContent : function(oController) {
		  //Filter By Panel
	      var searchPanel = new sap.ui.commons.Panel().setText('Select Workshop');
	      searchPanel.setWidth("100%");
	      var layoutNew = new sap.ui.commons.layout.MatrixLayout({width:"auto"});
	      searchPanel.addContent(layoutNew);

	      var oWorkshopListBox = new sap.ui.commons.ListBox("lbWorkshop",{ visibleItems : 5, width: "200px",
	    	  select: function(oEvent){
		        	oController.onWorkshopSelect(oEvent,oController);} }); 
	      
	     oController.getWorkshopList(oController);
		 
	     var oSaveButton = new sap.ui.commons.Button({
	          text : "Save Workshop to Server",
	          icon : "./images/save-icon.gif",
	          press : function(){ saveWorkshop(sap.ui.getCore().byId("lbWorkshop").getSelectedItem().getText()); } 
	      });

	     
	     layoutNew.createRow(new sap.ui.commons.Label({text: "Workshop: "}), oWorkshopListBox, oSaveButton );
		 var oLayout = new sap.ui.commons.layout.MatrixLayout({width:"100%"});
		 oLayout.createRow(searchPanel);

		return oLayout;

	}
});