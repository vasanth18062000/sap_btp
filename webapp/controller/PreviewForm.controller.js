sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/Image"],
  function (Controller, Image) {
    "use strict";
    var selectedItem;
    var storedMainSectionData = sessionStorage.getItem("mainSectionData");
    var storedsubSectionData = sessionStorage.getItem("subSectionData");
    var parsedData = JSON.parse(storedMainSectionData);
    var parsedSubData = JSON.parse(storedsubSectionData);
    var imgdata = parsedData.key2;
    var subimgdata = parsedSubData.key2;


    return Controller.extend("ns.proposalnew.controller.PreviewForm", {


      onInit: function () {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter
          .getRoute("PreviewForm")
          .attachMatched(this.onObjectMatched, this);
      },
      onObjectMatched(oEvent) {
        var oArgs, oView;
        oArgs = oEvent.getParameter("arguments");
        oView = this.getView();
        console.log(oArgs.mergeDatas);
        selectedItem = oArgs.mergeDatas;

        oView.bindElement({
          path: "/PS_MAIN_SECTION(" + selectedItem + ")",
        });

        this.associated();
        // console.log("session data",storedMainSectionData);
        // console.log("Property 1:", parsedData.textarea);
        // console.log("Property 2:", parsedData.property2);
        // var decodedData = atob(parsedData.textarea);

        // console.log("convert",decodedData);
        // this.asso();
      },

      associated: function () {
        var oModel = this.getOwnerComponent().getModel();
        var oJSON = new sap.ui.model.json.JSONModel();
        var oJSON2 = new sap.ui.model.json.JSONModel();
        var oJSON3 = new sap.ui.model.json.JSONModel();

        //debugger
        // oModel.read("/MainSection("+selectedItem+")",{
        //     method: "GET",
        //     success:function(response){
        //debugger;
        console.log("parse data", parsedData);
        console.log("parse data", parsedSubData);

        console.log("get the imgdata", imgdata);
        oJSON.setData(parsedData);
        this.getView().setModel(oJSON, "main");
        oJSON2.setData(parsedSubData);
        this.getView().setModel(oJSON2, "sub");

        // Create a new Image control
        var oImage = new Image({
          width: "300px",
          //height: "250px",
          src: "data:image/jpeg;base64," + imgdata,
        });
        var oView = this.getView();
        oView.byId("previewImageContainer").addItem(oImage);

          // Create a new Image control
          var oImage = new Image({
            width: "300px",
            //height: "250px",
            src: "data:image/jpeg;base64," + subimgdata,
          });
          var oView = this.getView();
          oView.byId("previewsubImageContainer").addItem(oImage);

        oModel.read("/PS_MAIN_SECTION(" + selectedItem + ")", {
          urlParameters: {
            $expand: "PS_SUB_SECTION",
          },

          method: "GET",

          success: function (response) {
            //debugger;
            console.log(
              "sub title",
              response.subsection.results[0].subSectiontitle
            );
            oJSON3.setData(response.subsection.results[0]);
            this.getView().setModel(oJSON3, "ven3");
            // console.log("sub data",oJSON3);
          },
        });
      },
      //       asso:function(){
      //         var oModel = this.getOwnerComponent().getModel();
      //         var oJSON = new sap.ui.model.json.JSONModel();
      //  debugger
      //         oModel.read("/MainSection("+selectedItem+")",{
      //           urlParameters: {
      //             "$expand": "subsection"
      //         },
      //             method: "GET",
      //             success:function(response){
      //               console.log(response.PS_CUSTOMER_ORG_CONTACT.results[0].addressLine2)
      //               oJSON.setData(response.PS_CUSTOMER_ORG_CONTACT.results[0]);
      //               this.getView().setModel(oJSON,"ven")
      //       }

      //   })
      // },
    });
  }
);
