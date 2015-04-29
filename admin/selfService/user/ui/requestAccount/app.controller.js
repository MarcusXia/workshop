sap.ui.controller("ui.requestaccount.app", {

    sendNewUserDetails: function() {

        sap.ui.core.BusyIndicator.show(0);
        var email = sap.ui.getCore().getControl("email").getValue();
        //var username = sap.ui.getCore().getControl("username").getValue();
        
/*        if (username === "") {
            sap.ui.getCore().getControl("username").setValueState(sap.ui.core.ValueState.Error);
            sap.ui.getCore().getControl("username").setValueStateText(oBundle.getText("INVALID_USERNAME"));
        }*/
        
        if (!validateEmail(email)) {
            sap.ui.getCore().getControl("email").setValueState(sap.ui.core.ValueState.Error);
            sap.ui.getCore().getControl("email").setValueStateText(oBundle.getText("INVALID_EMAIL"));
        }
        if (validateEmail(email)) {
            var origin = getParameterByName("x-sap-origin-location");
            var data = {
                "action": "createNewUser",
                //"username": sap.ui.getCore().getControl("username").getValue(),
                "email": sap.ui.getCore().getControl("email").getValue(),
                "x-sap-origin-location": origin
            };
            
            var request = $.ajax({
                url: "/workshop/admin/selfService/user/selfService.xsjs",
                type: "POST",
                dataType: "text",
                data: JSON.stringify(data),
                success: successRegister,
            });

            request.error(function(body, status, xhr) {
                sap.ui.core.BusyIndicator.hide();
                var error = JSON.parse(body.responseText);
/*                if (error.name == "UserError") {
                    sap.ui.getCore().getControl("email").setValueState(sap.ui.core.ValueState.Error);
                    sap.ui.getCore().getControl("email").setValueStateText(error.message);
                }*/
                if (error.name == 'SystemError') {
                    sap.ui.getCore().getControl("email").setValueState(sap.ui.core.ValueState.Error);
                    sap.ui.getCore().getControl("email").setValueStateText(error.message);
                }else{
                    sap.ui.getCore().getControl("email").setValueState(sap.ui.core.ValueState.Error);
                    sap.ui.getCore().getControl("email").setValueStateText(error.message);                	
                }
            });

        } else {
            sap.ui.core.BusyIndicator.hide();
        }
    },




    onInit: function() {
        function displayListener(oEvent) {
            var bShow = oEvent.getParameter("show");
            var sStatus;
            if (bShow) {
                sStatus = sap.ui.ux3.NotificationBarStatus.Default;
                notificationBar.setVisibleStatus(sStatus);
            } else {
                sStatus = sap.ui.ux3.NotificationBarStatus.None;
                notificationBar.setVisibleStatus(sStatus);
            }
        }

        function clickListener(oEvent) {
            $('#notificationBar-ArrowUp').trigger('click');
        }

        var messageNotifier = new sap.ui.ux3.Notifier('messageNotifier', {
            title: "Notifications"
        });
        messageNotifier.attachMessageSelected(clickListener);

        var notificationBar = new sap.ui.ux3.NotificationBar('notificationBar', {
            display: displayListener,
            visibleStatus: "None"
        });
        notificationBar.addStyleClass("sapUiNotificationBarDemokit");
        notificationBar.setMessageNotifier(messageNotifier);
        notificationBar.placeAt("content");
    },

    onBeforeRendering: function() {

    },

    onAfterRendering: function() {

    },

    onExit: function() {

    }
});

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && match[1].replace(/\+/g, ' ');
}

/*********** success handlers **********/
function successRegister(body) {
    sap.ui.core.BusyIndicator.hide();
    sap.ui.getCore().byId("requestAccountApp").to("registerSuccess.page");
}


function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}