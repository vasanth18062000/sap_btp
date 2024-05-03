sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("ns.proposalnew.controller.Login", {
      onLoginPress: function () {
        var emailId = this.byId("usernameInput");
        var password = this.byId("passwordInput");
        var sUsername = emailId.getValue();
        var sPassword = password.getValue();
        this.validateCredentials(sUsername, sPassword);
      },
      validateCredentials: function (sUsername, sPassword) {
        var oModel = this.getView().getModel();
        oModel.read("/User", {
          filters: [
            new sap.ui.model.Filter("emailId", sap.ui.model.FilterOperator.EQ, sUsername),
            new sap.ui.model.Filter("password", sap.ui.model.FilterOperator.EQ, sPassword) // Not recommended to send passwords like this
          ],
          success: (oData) => { // Notice the use of arrow function here
            if (oData && oData.results.length > 0) {
              // Login successful
              const oRouter = this.getOwnerComponent().getRouter();
              oRouter.navTo("proposalview"); // Ensure "nextpage" is correctly defined in your manifest.json
            } else {
              // Login failed
              sap.m.MessageToast.show("Login failed");
            }
          },
          error: () => {
            sap.m.MessageToast.show("Login failed");
          }
        });
      }
      


        
    });
  }
);
