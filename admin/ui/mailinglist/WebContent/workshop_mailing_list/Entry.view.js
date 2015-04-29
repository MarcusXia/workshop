sap.ui.jsview("workshop_mailing_list.Entry", {

	getControllerName : function() {
		return "workshop_mailing_list.Entry";
	},

	createContent : function(oController) {

		// Set Panel Header
		var oPanel = new sap.ui.commons.Panel({showCollapseIcon: false});
		oPanel.setTitle(new sap.ui.commons.Title({text: "Contact Data", icon: "./images/sap_18.png"}));
		oPanel.setAreaDesign(sap.ui.commons.enums.AreaDesign.Plain);
		oPanel.setBorderDesign(sap.ui.commons.enums.BorderDesign.None);
		
		var oLayout = new sap.ui.commons.layout.MatrixLayout({
			id : 'matrix2',
			layoutFixed : true,
			width : '1000px', 
			columns : 2,
			widths : [ '35px', '250px' ]
		});

		// Set Session Id Label and Field
		var oLabel = new sap.ui.commons.Label({
			id : 'SessionID_Label',
			text : 'Session ID'
		});

		var oSessionIDField = new sap.ui.commons.TextField({
			id : 'SessionID_Field',
			tooltip : 'Session ID',
			editable : true,
			width : '100px'
		});

		oLabel.setLabelFor(oSessionIDField);
		oLayout.createRow(oLabel, oSessionIDField);

		// Set First Name Label and Field
		var oLabel = new sap.ui.commons.Label({
			id : 'FName_Label',
			text : 'First Name'
		});

		var oFNameField = new sap.ui.commons.TextField({
			id : 'FName_Field',
			tooltip : 'First Name',
			editable : true,
			width : '150px'
		});

		oLabel.setLabelFor(oFNameField);
		oLayout.createRow(oLabel, oFNameField);

		// Set Last Name Label and Field
		var oLabel = new sap.ui.commons.Label({
			id : 'LName_Label',
			text : 'Last Name'
		});

		var oLNameField = new sap.ui.commons.TextField({
			id : 'LName_Field',
			tooltip : 'Last Name',
			editable : true,
			width : '150px'
		});

		oLabel.setLabelFor(oLNameField);
		oLayout.createRow(oLabel, oLNameField);

		// Set Email Address Label and Field
		var oLabel = new sap.ui.commons.Label({
			id : 'Email_Label',
			text : 'Email Address'
		});

		var oEmailField = new sap.ui.commons.TextField({
			id : 'Email_Field',
			tooltip : 'Email Address',
			editable : true,
			width : '250px'
		});

		oLabel.setLabelFor(oEmailField);
		oLayout.createRow(oLabel, oEmailField);

		// Set Submit Button
		var oSubmitButton = new sap.ui.commons.Button("submitButton", {
			tooltip : 'Submit',
			text : 'Submit',
			width : '5em',
			press : function(oEvent) {
				oController.onButtonPress(oEvent, oController);
			}
		});

		oLayout.createRow(oSubmitButton);
		oPanel.addContent(oLayout);

		return oPanel;
	}
});