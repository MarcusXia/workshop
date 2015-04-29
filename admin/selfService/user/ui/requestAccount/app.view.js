sap.ui.jsview("ui.requestaccount.app", {

    getControllerName: function() {
        return "ui.requestaccount.app";
    },

    createContent: function(oController) {

        $(".sapUiSraLoginCopyright").text(oBundle.getText("COPYRIGHT"));
        this.setDisplayBlock(false);
        this.app = new sap.m.App("requestAccountApp");

        var requestAccountPage = new sap.m.Page("requestAccount.page", {
            showHeader: false,
            content: getUIBox(oController)
        });

        var registerSuccessPage = new sap.m.Page("registerSuccess.page", {
            showHeader: false,
            content: getSuccessPage()
        })

        this.app.addPage(requestAccountPage, false);
        this.app.addPage(registerSuccessPage, false);

        return this.app;

    }
});

function getUIBox(oController) {
    var box = new sap.m.FlexBox("uss_requestAccount_box", {
        alignItems: sap.m.FlexAlignItems.Stretch,
        justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
        items: [
            new sap.m.Label({
                id: "uss_requestAccount_title",
                text: oBundle.getText("SAP_HANA"),
                design: sap.m.LabelDesign.Bold
            }),
            new sap.m.Label({
                id: "uss_requestAccount_subtitle",
                text: oBundle.getText('REQUEST_ACCOUNT'),
                design: sap.m.LabelDesign.Standard
            }),
/*            new sap.m.Input({
                id: "username",
                placeholder: oBundle.getText('ENTER_USERNAME'),

            }),*/
            new sap.m.Input({
                id: "email",
                placeholder: oBundle.getText('ENTER_EMAIL'),
            }),
            new sap.m.Button({
                text: "Submit",
                type: sap.m.ButtonType.Emphasized,
                press: oController.sendNewUserDetails
            }).setWidth("100%"),
        ],
        direction: "Column"
    });

    return box;

}

function getSuccessPage() {
    var box = new sap.m.FlexBox("uss_successMessage_box", {
        alignItems: sap.m.FlexAlignItems.Stretch,
        justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
        items: [
            new sap.m.Label({
                id: "uss_requestAccount_title_Page2",
                text: oBundle.getText("SAP_HANA"),
                design: sap.m.LabelDesign.Bold
            }),
            new sap.m.Label({
                id: "uss_requestAccount_subtitle_Page2",
                text: oBundle.getText('REQUEST_NEW_USER'),
                design: sap.m.LabelDesign.Standard
            }),
            new sap.m.Text({
                id: "uss_successPage_Message",
                text: oBundle.getText('SUCCESS_MAIL_MESSAGE'),
            })
        ],
        direction: "Column"
    });
    return box;
}