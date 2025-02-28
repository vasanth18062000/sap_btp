sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"

  ], (Controller,History) => {
    "use strict";
  
    return Controller.extend("ns.royalenfield.controller.REExternalChart", {
        onInit() {
        },
        onAfterRendering: function () {
          // Wait until the view is rendered
          const tableauContainer = this.byId("tableauContainer").getDomRef(); // Get the VBox DOM element
          const tableauUrl = "https://public.tableau.com/views/REData_17352758103870/REDATACHART";
          const tableauOptions = {
              hideTabs: true,
              hideToolbar: true,
              width: "1000%",
              height: "1200px"
          };

          if (tableauContainer) {
              new tableau.Viz(tableauContainer, tableauUrl, tableauOptions);
          }
      },
      onbackToRoyal() {
        const oHistory = History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
            window.history.go(-1);
        } else {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("relogin", {}, true);
        }
    },
    });
  });