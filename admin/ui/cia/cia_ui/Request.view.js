sap.ui.jsview("cia_ui.Request", {

	getControllerName : function() {
		return "cia_ui.Request";
	},

	createContent : function(oController) {

		// Set Panel Header
		var oPanel = new sap.ui.commons.Panel({showCollapseIcon: false});
		oPanel.setTitle(new sap.ui.commons.Title({text: "Workshop Remote Client Instance Assignment"  }));
		oPanel.setAreaDesign(sap.ui.commons.enums.AreaDesign.Plain);
		oPanel.setBorderDesign(sap.ui.commons.enums.BorderDesign.None);
		
		var oLayout = new sap.ui.commons.layout.MatrixLayout({
			id : 'matrix2',
			layoutFixed : true,
			width : '1000px', 
			columns : 2,
			widths : [ '75px', '250px' ]
		});

		// Set User Id
		var oLabel = new sap.ui.commons.Label({
			id : 'UserID_Label',
			text : 'User ID'
		});

		var oUserIDField = new sap.ui.commons.TextField({
			id : 'UserID_Field',
			tooltip : 'User ID',
			editable : false,
			width : '200px'
		});

		oLabel.setLabelFor(oUserIDField);
		oLayout.createRow(oLabel, oUserIDField);

		// Set Client Instance
		var oLabel = new sap.ui.commons.Label({
			id : 'CI_Label',
			text : 'Client Instance IP Address'
		});

		var oCIField = new sap.ui.commons.Link({
			id: 'CI_Field',
			tooltip: "Client Instance IP Address",
			width: '200px',
			press: function(oEvent){
	          	  oController.onLinkPress(oEvent,oController)}});
	
//		var oCIField = new sap.ui.commons.TextField({
//			id : 'CI_Field',
//			tooltip : 'Client Instance IP Address',
//			editable : false,
//			width : '200px'
//		});

		oLabel.setLabelFor(oCIField);
		oLayout.createRow(oLabel, oCIField);		
		
		
		// Set Timestamp
		var oLabel = new sap.ui.commons.Label({
			id : 'Timestamp_Label',
			text : 'Assignment Date/Time'
		});

		var oTimestampField = new sap.ui.commons.TextField({
			id : 'Timestamp_Field',
			tooltip : 'Assignment Date/Time',
			editable : false,
			width : '200px'
		});
	
		
		oLabel.setLabelFor(oTimestampField);
		oLayout.createRow(oLabel, oTimestampField);
	
		oPanel.addContent(oLayout);

		return oPanel;
	}
});