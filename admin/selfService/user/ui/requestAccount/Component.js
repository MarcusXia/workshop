jQuery.sap.declare("ui.requestaccount.Component");

sap.ui.core.UIComponent.extend("ui.requestaccount.Component", {
    
    metadata: {
        includes : [ "app.css" ],  
    },
    
    createContent: function() {

        var appView = sap.ui.view({
            id: "ui.requestaccount.app",
            viewName: "ui.requestaccount.app",
            type: "JS"
        });
        
        return appView;

    }
});