jQuery.sap.declare("ui.common.HintUI");

jQuery.sap.require("jquery.sap.resources");
jQuery.sap.includeStyleSheet("/sap/hana/xs/selfService/user/ui/common/common.css");
ui.common.HintUI = function() {

    var bundle = jQuery.sap.resources({
        url: "/sap/hana/xs/selfService/user/resources/global.hdbtextbundle",
        locale: sap.ui.getCore().getConfiguration().getLanguage()
    });

    var policy = {};
    var minimalPasswordLength = 8;
    var passwordLayout = "";
    var isSpecialCharactersCompulsory = false;
    var isDigitsCompulsory = true;

    var PASSWORD_REQUIREMENTS_HEADER = bundle.getText ("PASSWORD_REQUIREMENTS_HEADER") + ": ";
    var PASSWORD_LENGTH = bundle.getText ("PASSWORD_LENGTH", [minimalPasswordLength]);
    var PASSWORD_MINIMUM_STMT = bundle.getText("PASSWORD_MINIMUM_STMT");
    var PASSWORD_UPPERCASE_STMT = bundle.getText("PASSWORD_UPPERCASE_STMT");
    var PASSWORD_LOWERCASE_STMT = bundle.getText ("PASSWORD_LOWERCASE_STMT");
    var PASSWORD_NUMERALS_STMT = bundle.getText("PASSWORD_NUMERALS_STMT");
    var PASSWORD_SPECIAL_CHARACTERS_STMT = bundle.getText("PASSWORD_SPECIAL_CHARACTERS_STMT");


    var getPasswordPolicy = function() {

        var request = $.ajax({
            url: "/sap/hana/xs/selfService/user/selfService.xsjs?action=getPasswordPolicy",
            async: false,
            type: "GET",
        });

        request.done(function(body, status, xhr) {
            policy = JSON.parse(body);

            minimalPasswordLength = parseInt(policy.minimal_password_length);
            PASSWORD_LENGTH = bundle.getText ("PASSWORD_LENGTH", [minimalPasswordLength]);

            passwordLayout = policy.password_layout;
            isSpecialCharactersCompulsory = !(/^[a-zA-Z0-9- ]*$/.test(passwordLayout));
            isDigitsCompulsory = /[0-9]/.test(passwordLayout);
        });

        request.error(function(body, status, xhr) {

        });

    }

    this.getUI = function() {
        this.hint = new sap.m.FlexBox({
            id: "uss_password_hint",
            visible: false,
            alignItems: sap.m.FlexAlignItems.Stretch,
            justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
            direction: "Column",
            items: [
                new sap.m.Text({
                    text: PASSWORD_REQUIREMENTS_HEADER,
                }).addStyleClass("uss_password_hint"),
                new sap.m.Text({
                    wrapping: true,
                    text: PASSWORD_LENGTH,
                }).addStyleClass("uss_password_hint"),
                new sap.m.Text({
                    wrapping: true,
                    text: PASSWORD_MINIMUM_STMT,
                }).addStyleClass("uss_password_hint"),
                new sap.m.Text({
                    text: PASSWORD_UPPERCASE_STMT,
                }).addStyleClass("uss_password_hint"),
                new sap.m.Text({
                    text: PASSWORD_LOWERCASE_STMT,
                }).addStyleClass("uss_password_hint"),
            ]
        }).addStyleClass("uss_password_hint").setWidth("100%");

        if (isSpecialCharactersCompulsory)
            this.hint.addItem(new sap.m.Text({
                text: PASSWORD_SPECIAL_CHARACTERS_STMT,
            }).addStyleClass("uss_password_hint"));

        if (isDigitsCompulsory)
            this.hint.addItem(new sap.m.Text({
                text: PASSWORD_NUMERALS_STMT,
            }).addStyleClass("uss_password_hint"));

        return this.hint;
    };

    this.setVisible = function(bool) {
        this.hint.setVisible(bool);
    };

    getPasswordPolicy();

    return this;
}