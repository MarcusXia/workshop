sap.ui.jsview(
				"workshop_exercise_solutions_templates.NewShell",
				{

					getControllerName : function() {
						return "workshop_exercise_solutions_templates.NewShell";
					},
       
					createContent : function(oController) {
						jQuery.ajax({
							url : gUrl,
							method : 'GET',
							dataType : 'json',
							success : onLoadExercises,
							error : onErrorCall,
							async : false
						});
						var appIcon = "./images/sap_18.png";
						var appTitle =  " Exercise Solutions & Templates";
	                    if(workshopId=='openSAP'){
	                    	appIcon = "./images/logo_sap.png";
	                    }
						oShell = new sap.ui.ux3.Shell(
								"myShell",
								{
									appIcon : appIcon,
									appIconTooltip : "SAP",
									appTitle : appTitle,
									showInspectorTool : false,
									showFeederTool : false,
									showSearchTool : false,
									worksetItemSelected : onLoadContent
								});

						for ( var i = 0; i < oExerciseJSON.exercises.length; i++) {
							var oNavItem = new sap.ui.ux3.NavigationItem(
									oExerciseJSON.exercises[i].key, {
										key : oExerciseJSON.exercises[i].key,
										text : oExerciseJSON.exercises[i].text
									});
							oShell.addWorksetItem(oNavItem);

							for ( var isub = 0; isub < oExerciseJSON.exercises[i].steps.length; isub++) {
								oNavItem
										.addSubItem(new sap.ui.ux3.NavigationItem(
												oExerciseJSON.exercises[i].steps[isub].key,
												{
													key : oExerciseJSON.exercises[i].steps[isub].key,
													text : oExerciseJSON.exercises[i].steps[isub].text
												}));
							}
						}

						oShell.attachLogout(oController.handleExitShell);
						createShell(oController);
						buildShellPersonalization(oController);
						
						var oSel = getURLParameter("sub");
						if (oSel === 'null') {
							getContent(oExerciseJSON.exercises[0].steps[0].key);
						} else {
							oShell.setSelectedWorksetItem(oSel);
							getContent(oSel);
						}



						return oShell;
					}
				});



function createShell(oController) {

	var oUserTxt = new sap.ui.commons.TextView({
		tooltip : "Welcome to the wonderful world of SAP HANA" 
	});
	oShell.addHeaderItem(oUserTxt);
	oController.getSessionInfo(oController,oUserTxt);		
	
	oShell.addHeaderItem(new sap.ui.commons.Button({
		text : "Personalize",
		tooltip : "Personalize",
		press : oController.handlePersonalizeShell
	}));

	oShell.addHeaderItem(new sap.ui.commons.MenuButton({
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
function onLoadExercises(myJSON) {
	oExerciseJSON = myJSON;
}

function onErrorCall(jqXHR, textStatus, errorThrown) {
	 alert("Workshop "+ workshopId + " is not valid. Please correct the URL");	
	return;	
}
function onLoadContent(oEvent) {
	var sId = oEvent.getParameter("id");
	getContent(sId);

}
function getContent(sId) {
	for ( var i = 0; i < oExerciseJSON.exercises.length; i++) {
		for ( var isub = 0; isub < oExerciseJSON.exercises[i].steps.length; isub++) {
			if (oExerciseJSON.exercises[i].steps[isub].key === sId) {
				
				var ShortUrl = '/sap/hana/xs/dt/base/file/';
			 	var package = oExerciseJSON.exercises[i].steps[isub].package;
				var lPath = package.replace(/[.]/g, '/');
				var aUrl = ShortUrl + lPath;
				aUrl = aUrl + '/'
				+ oExerciseJSON.exercises[i].steps[isub].object
				+ '.'
				+ oExerciseJSON.exercises[i].steps[isub].extension;	
				
				 var oSapBackPack = new Object();
		         oSapBackPack.Workspace='SHINE_DATA';
		         var sapBackPack = JSON.stringify(oSapBackPack);
	
				jQuery.ajax({
					url : aUrl,
					method : 'GET',
					dataType : 'text',
					headers : {
	                    "SapBackPack" : sapBackPack,
	                },						
					success : onInsertContent,
					error : onErrorCall,
					async : true
				});
			}
		}
	}

}
function onInsertContent(myTXT) {

    var parts = gUserName.split("_");
    var grpNumber = parts[1];
    if (typeof(grpNumber) != 'undefined' && grpNumber != null){
    	myTXT = myTXT.replace(/<group number>/g,grpNumber);
    	myTXT = myTXT.replace(/<group_number>/g,grpNumber);  
    	myTXT = myTXT.replace(/<group>/g,grpNumber);     	
    	myTXT = myTXT.replace(/<Your User>/g,gUserName);
   	}
	var html = new sap.ui.core.HTML({
		// static content
		content : '<div id="content1" class="wiki"><div class="code"><pre>'
				+ escapeHtml(myTXT) + '\n' + '</pre></div></div>',
		preferDOM : false
	});
	oShell.setContent(html);
}
function buildShellPersonalization(oController) {
	// EXPERIMENTAL - THIS WILL CHANGE!!
	oShell._getPersonalization().attachPersonalizationChange(
			oController.handlePersonalizeShellChange);
	// initialize settings
	if (JSON && window["localStorage"]) { // only in browsers with native JSON
		// and offline storage support
		var sSettings = localStorage.getItem("sapUiShellTestSettings");
		if (sSettings) {
			oShell.initializePersonalization(JSON.parse(sSettings));
		}
	}
}

var entityMap = {
	"&" : "&amp;",
	"<" : "&lt;",
	">" : "&gt;",
	'"' : '&quot;',
	"'" : '&#39;',
	"/" : '&#x2F;'
};

function escapeHtml(string) {
	return String(string).replace(/[&<>"'\/]/g, function(s) {
		return entityMap[s];
	});
}
