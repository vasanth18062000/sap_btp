sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History"

    ],
    function(BaseController,History) {
      "use strict";
  
      return BaseController.extend("ns.royalenfield.controller.RETermsAndCondition", {
        onInit: function() {
        },
        

  
        onSubmitBAck(){
          const oHistory = History.getInstance();
          const sPreviousHash = oHistory.getPreviousHash();
  
          if (sPreviousHash !== undefined) {
              window.history.go(-1);
          } else {
              const oRouter = this.getOwnerComponent().getRouter();
              oRouter.navTo("overview", {}, true);
          }
      },
      onNavBack(){
        const oHistory = History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
            window.history.go(-1);
        } else {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("overview", {}, true);
        }
    }

      });
    }
  );