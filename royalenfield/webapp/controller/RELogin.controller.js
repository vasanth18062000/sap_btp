sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("ns.royalenfield.controller.RELogin", {

        onInit: function () {
            // Check if there is a logged-in user in localStorage
            var oLoggedInUser = localStorage.getItem("loggedInUser");
            if (oLoggedInUser) {
                // If the user is already logged in, redirect to the main page
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("royalEnfield");
            }
        },
        onTogglePasswordVisibility: function (oEvent) {
            // Get the Input control and its current type
            var oInput = this.byId("passwordInput");
            var sCurrentType = oInput.getType();
        
            // Toggle between Password and Text
            if (sCurrentType === "Password") {
                oInput.setType("Text");
                oEvent.getSource().setIcon("sap-icon://hide");
                oEvent.getSource().setTooltip("Hide Password");
            } else {
                oInput.setType("Password");
                oEvent.getSource().setIcon("sap-icon://show");
                oEvent.getSource().setTooltip("Show Password");
            }
        },

        onSignInPress: function () {
            var emailId = this.byId("emailInput");
            var password = this.byId("passwordInput");
            var sUsername = emailId.getValue();
            var sPassword = password.getValue();

            // Validate email format
            if (!this.validateEmailFormat(sUsername)) {
                emailId.setValueState("Error");
                emailId.setValueStateText("Please enter a valid email address.");
                MessageToast.show("Invalid email address.");
                return;
            } else {
                emailId.setValueState("None"); // Reset value state if valid
            }

            if (!sPassword) {
                MessageToast.show("Password cannot be empty.");
                return;
            }

            // Call method to validate credentials against OData
            this.validateCredentials(sUsername, sPassword);
        },
        onLiveChangeEmail: function (oEvent) {
            // Get the input value
            var sEmail = oEvent.getParameter("value");
            var oEmailInput = oEvent.getSource();
        
            // Define email validation regex
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
            // Validate the email
            if (emailRegex.test(sEmail)) {
                // Set ValueState to None if valid
                oEmailInput.setValueState("None");
                oEmailInput.setValueStateText("");
            } else {
                // Set ValueState to Error if invalid
                oEmailInput.setValueState("Error");
                oEmailInput.setValueStateText("Please enter a valid email address.");
            }
        },
        

        validateEmailFormat: function (sEmail) {
            // Simple regex for email validation
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(sEmail);
        },

        validateCredentials: async function (sUsername, sPassword) {
            try {
                var oModel = this.getView().getModel();
        
                // Wrap the oModel.read call in a Promise
                const fetchCustomer = () => {
                    return new Promise((resolve, reject) => {
                        oModel.read("/Customer", {
                            filters: [
                                new sap.ui.model.Filter("emailId", sap.ui.model.FilterOperator.EQ, sUsername),
                                new sap.ui.model.Filter("password", sap.ui.model.FilterOperator.EQ, sPassword) // Note: avoid using plaintext passwords
                            ],
                            success: resolve,
                            error: reject
                        });
                    });
                };
        
                const oData = await fetchCustomer();
        
                if (oData && oData.results.length > 0) {
                    MessageToast.show("LoggedIn Successfully!");
        
                    const navigateToRelogin = async () => {
                        return new Promise((resolve) => {
                            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                            oRouter.navTo("relogin");
                            setTimeout(() => resolve(), 100);
                        });
                    };
        
                    const reloadPage = async () => {
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                window.location.reload();
                                resolve();
                            }, 100); 
                        });
                    };
                    await navigateToRelogin();
                    await reloadPage();
                } else {
                    MessageToast.show("Invalid UserId or Email Address.");
                }
            } catch (error) {
                console.error("Error during login validation:", error);
                MessageToast.show("An error occurred during login.");
            }
        },
        
        onSignUpPress: function () {
            console.log("onSignUpPress Customer button clicked!");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("royalEnfieldCustomer");
        },
        onNavRoyalMain: function () {
            console.log("RoyalEnfield Customer button clicked!");
          

}


    });
});
