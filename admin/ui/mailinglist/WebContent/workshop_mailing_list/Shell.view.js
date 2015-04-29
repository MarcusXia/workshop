sap.ui.jsview("workshop_mailing_list.Shell", {

	getControllerName : function() {
		return "workshop_mailing_list.Shell";
	},

	createContent : function(oController) {
		
		oController.oShell = new sap.ui.ux3.Shell("myShell", {
			appIcon : "./images/sap_18.png",
			appIconTooltip : "SAP",
			appTitle : "Workshop Mailing List",
			showInspectorTool : false,
			showFeederTool : false,
			showSearchTool : false
		});

		oController.oShell.attachLogout(oController.handleExitShell);

		createShell(oController);
		buildShellPersonalization(oController);
		buildShellNavigation(oController);

		var oLayout = new sap.ui.commons.layout.MatrixLayout();		
		
		// Based on URL, inject content accordingly
		var url = document.URL;
	    if (url.search("/workshop/admin/ui/mailinglist/WebContent/entry.html") != -1) {
			var oEntryView = sap.ui.view({id:"entry_view", viewName:"workshop_mailing_list.Entry", type:sap.ui.core.mvc.ViewType.JS});
			oLayout.createRow(oEntryView);
	    }else if (url.search("/workshop/admin/ui/mailinglist/WebContent/display.html") != -1){
			var oTableView = sap.ui.view({id:"table_view", viewName:"workshop_mailing_list.Table", type:sap.ui.core.mvc.ViewType.JS});
			oLayout.createRow(oTableView); 
	    }else{
	    	oLayout.createRow('No Implementation'); 
	    } 
 	    
		oController.oShell.setContent(oLayout);		
		
		return oController.oShell;
	}
});

function getURLParameter(name) {
	return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [
			, null ])[1]);
}

function createShell(oController) {

	var oUserTxt = new sap.ui.commons.TextView({
		tooltip : "Welcome" 
	});
	oController.oShell.addHeaderItem(oUserTxt);
	oController.getSessionInfo(oController,oUserTxt);
	oController.oShell.addHeaderItem(new sap.ui.commons.Button({
		text : "Personalize",
		tooltip : "Personalize",
		press : oController.handlePersonalizeShell
	}));

	oController.oShell.addHeaderItem(new sap.ui.commons.MenuButton({
		text : "Help",
		tooltip : "Help Menu",
		menu : new sap.ui.commons.Menu("menu1", {
			items : [ new sap.ui.commons.MenuItem("menuitem1", {
				text : "Help"
			}), new sap.ui.commons.MenuItem("menuitem2", {
				text : "Report Incident"
			}), new sap.ui.commons.MenuItem("menuitem3", {
				text : "About"
			}) ]
		})
	})); 
}

function buildShellPersonalization(oController) {
	// EXPERIMENTAL - THIS WILL CHANGE!!
	oController.oShell._getPersonalization().attachPersonalizationChange(
			oController.handlePersonalizeShellChange);
	// initialize settings
	if (JSON && window["localStorage"]) { // only in browsers with native JSON
		// and offline storage support
		var sSettings = localStorage.getItem("sapUiShellTestSettings");
		if (sSettings) {
			oController.oShell.initializePersonalization(JSON.parse(sSettings));
		}
	}
}

function buildShellNavigation(oController) {
	var WI = sap.ui.ux3.NavigationItem;
	oController.oShell.addWorksetItem(new WI("wi_home", {
		key : "wi_home",
		text : 'Workshop Mailing List' }));
}


