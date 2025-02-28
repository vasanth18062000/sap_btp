sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
	"sap/m/MessageBox",
    
], function (Controller, Fragment, JSONModel, MessageToast,MessageBox) {
    "use strict";

    return Controller.extend("ns.royalenfield.controller.RoyalEnfield", {
        _iCarouselTimeout: 0,
        _iCarouselLoopTime: 8000,

        onInit: function () {
            console.log("main page")

            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("relogin").attachPatternMatched(this.onTrigger, this);


        },

        onTrigger: function () {

            var oVisibilityModel = new JSONModel({
                showDefaultContent: true,
                showAboutUs: false,
                showDealer: false,
                showBike1: false,
                showBike2: false,
                showBike3: false,
                showBike4: false,
                showBike5: false,
                showBike6: false,
                showBike7: false,
                showBike8: false,
                showBike9: false,
                CustomerSide:false,
                ThirdPartySide:false,
                DealerSide:false,
                OrderSide:false,
                OrganizationSide:false
            });
            this.getView().setModel(oVisibilityModel, "visibility");


            var oViewModel = new JSONModel({
                welcomeCarouselMotorcycle: './img/motors.avif',
                welcomeCarouselShipping: './img/classic_650_new.avif',
                welcomeCarouselInviteFriend: './img/home-top-banner-desc.jpeg',
                welcomeCarouselTablet: './img/top-banner-home-desc.avif',
                welcomeCarouselCreditCard: './img/scram_440.avif',
                welcomeCarrer: './img/careers-royal-enfield.jpg',
                welcomegirl:'./img/apparel-desc.avif',
                Promoted: [],
                Viewed: [],
                Favorite: [],
                Currency: "EUR"
            });
            this.getView().setModel(oViewModel, "view");
            // this.getRouter().attachRouteMatched(this._onRouteMatched, this);

            // select random carousel page at start
            var oWelcomeCarousel = this.byId("welcomeCarousel");
            var iRandomIndex = Math.floor(Math.abs(Math.random()) * oWelcomeCarousel.getPages().length);
            oWelcomeCarousel.setActivePage(oWelcomeCarousel.getPages()[iRandomIndex]);

            // Initialization code if needed
        },
        onChange: function (oEvent) {
            var selectedItemKey = oEvent.getParameter("selectedItem").getKey();
            sap.ui.getCore().getConfiguration().setLanguage(selectedItemKey);
        },
        onAfterRendering: function () {
            this.onCarouselPageChanged();
            
        },
        onCarouselPageChanged: function () {
            clearTimeout(this._iCarouselTimeout);
            this._iCarouselTimeout = setTimeout(function () {
                var oWelcomeCarousel = this.byId("welcomeCarousel");
                if (oWelcomeCarousel) {
                    oWelcomeCarousel.next();
                    this.onCarouselPageChanged();
                }
            }.bind(this), this._iCarouselLoopTime);
        },

        // Royal Enfield
        onNavRoyalCustomer: function () {
            console.log("RoyalEnfield Customer button clicked!");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("royalEnfieldCustomer");
        },
        onNavRoyalContactUs: function () {
            console.log("RoyalEnfield ContactUs button clicked!");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("royalEnfieldContactus");
        }
        ,
        onNavRoyalStoreLocator: function () {
            console.log("RoyalEnfield Store Locator button clicked!");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("royalEnfieldstorelocator");
        },
        onNavRoyalServiceCentreLocator: function () {
            console.log("RoyalEnfield Service Center Locator button clicked!");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("royalEnfieldservicecenter");
        },
        onNavRETestRide: function () {
            console.log("rETestRide button clicked!");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("rETestRide");

        },
        onNavRoyalFaq: function () {
            console.log("FAQ button clicked!");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("refq");

        },
        onNavRoyalChat: function () {
            console.log("Chat button clicked!");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("rechat");
        },

        onNavRoyalBecomeDealer: function () {
            console.log("Chat button clicked!");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("reDealer");
        },
        onNavRoyalAboutDealer: function () {
            console.log("Chat button clicked!");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("rEAboutDealer");
        },
        onNavCollapseExpandPress() {
            const oSideNavigation = this.byId("sideNavigation"),
                bExpanded = oSideNavigation.getExpanded();

            oSideNavigation.setExpanded(!bExpanded);
        },
        onNavRoyalAboutUs: function () {
            console.log("RoyalEnfield AboutUs button clicked!");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("royalEnfieldAboutUs");
        },
        onNavRoyalFinance: function () {
            console.log("Finance button clicked!");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("refinance");
        },
        onNavBusinessHub: function () {
            console.log("RoyalEnfield AboutUs button clicked!");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("royalEnfieldBusinessHub");
        },
        onNavBulkOrder: function () {
            console.log("RoyalEnfield AboutUs button clicked!");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("royalEnfieldBulkOrder");
        },
        onAboutUsPress: function () {
            console.log("about")
            var oModel = this.getView().getModel("visibility");
            oModel.setData({
                showDefaultContent: false,
                showAboutUs: true,
                showBike1: false,
                showDealer: false,
                showBike2: false,
                showBike3: false,
                showBike4: false,
                showBike5: false,
                showBike6: false,
                showBike7: false,
                showBike8: false,
                showBike9: false,
                CustomerSide:false,
                ThirdPartySide:false,
                DealerSide:false,
                OrderSide:false,
                OrganizationSide:false


            });
        },
        home: function () {
            window.location.reload();
            console.log("home")
            var oModel = this.getView().getModel("visibility");
            oModel.setData({
                showDefaultContent: true,
                showAboutUs: false,
                showDealer: false,
                showBike1: false,
                showBike2: false,
                showBike3: false,
                showBike4: false,
                showBike5: false,
                showBike6: false,
                showBike7: false,
                showBike8: false,
                showBike9: false,
                CustomerSide:false,
                ThirdPartySide:false,
                DealerSide:false,
                OrderSide:false,
                OrganizationSide:false

            });
        },
        showDealer: function () {
            console.log("showTestRide:false")
            var oModel = this.getView().getModel("visibility");
            oModel.setData({
                showDefaultContent: false,
                showAboutUs: false,
                showDealer: true,
                showBike1: false,
                showBike2: false,
                showBike3: false,
                showBike4: false,
                showBike5: false,
                showBike6: false,
                showBike7: false,
                showBike8: false,
                showBike9: false,
                CustomerSide:false,
                ThirdPartySide:false,
                DealerSide:false,
                OrderSide:false,
                OrganizationSide:false


            });
        },
        showBike1: function () {
            console.log("showTestRide:false")
            var oModel = this.getView().getModel("visibility");
            oModel.setData({
                showDefaultContent: false,
                showAboutUs: false,
                showDealer: false,
                showBike1: true,
                showBike2: false,
                showBike3: false,
                showBike4: false,
                showBike5: false,
                showBike6: false,
                showBike7: false,
                showBike8: false,
                showBike9: false,
                CustomerSide:false,
                ThirdPartySide:false,
                DealerSide:false,
                OrderSide:false,
                OrganizationSide:false
            });

            var oViewModel = new JSONModel({
                bikeSideContainer: './img/bike1SideContainer.gif'
            });
            this.getView().setModel(oViewModel, "bikeCollection");
        },
        showBike2: function () {
            console.log("showBike2")
            var oModel = this.getView().getModel("visibility");
            oModel.setData({
                showDefaultContent: false,
                showAboutUs: false,
                showDealer: false,
                showBike1: false,
                showBike2: true,
                showBike3: false,
                showBike4: false,
                showBike5: false,
                showBike6: false,
                showBike7: false,
                showBike8: false,
                showBike9: false,
                CustomerSide:false,
                ThirdPartySide:false,
                DealerSide:false,
                OrderSide:false,
                OrganizationSide:false
            });

            var oViewModel = new JSONModel({
                bikeSideContainer: './img/bike2SideContainer.gif'
            });
            this.getView().setModel(oViewModel, "bikeCollection");
        },
        showBike3: function () {
            console.log("showTestRide:false")
            var oModel = this.getView().getModel("visibility");
            oModel.setData({
                showDefaultContent: false,
                showAboutUs: false,
                showDealer: false,
                showBike1: false,
                showBike2: false,
                showBike3: true,
                showBike4: false,
                showBike5: false,
                showBike6: false,
                showBike7: false,
                showBike8: false,
                showBike9: false,
                CustomerSide:false,
                ThirdPartySide:false,
                DealerSide:false,
                OrderSide:false,
                OrganizationSide:false
            });

            var oViewModel = new JSONModel({
                bikeSideContainer: './img/bike3SideContainer.gif'
            });
            this.getView().setModel(oViewModel, "bikeCollection");
        },
        showBike4: function () {
            console.log("showTestRide:false")
            var oModel = this.getView().getModel("visibility");
            oModel.setData({
                showDefaultContent: false,
                showAboutUs: false,
                showDealer: false,
                showBike1: false,
                showBike2: false,
                showBike3: false,
                showBike4: true,
                showBike5: false,
                showBike6: false,
                showBike7: false,
                showBike8: false,
                showBike9: false,
                CustomerSide:false,
                ThirdPartySide:false,
                DealerSide:false,
                OrderSide:false,
                OrganizationSide:false
            });

            var oViewModel = new JSONModel({
                bikeSideContainer: './img/bike4SideContainer.gif'
            });
            this.getView().setModel(oViewModel, "bikeCollection");
        },
        showBike5: function () {
            console.log("showTestRide:false")
            var oModel = this.getView().getModel("visibility");
            oModel.setData({
                showDefaultContent: false,
                showAboutUs: false,
                showDealer: false,
                showBike1: false,
                showBike2: false,
                showBike3: false,
                showBike4: false,
                showBike5: true,
                showBike6: false,
                showBike7: false,
                showBike8: false,
                showBike9: false,
                CustomerSide:false,
                ThirdPartySide:false,
                DealerSide:false,
                OrderSide:false,
                OrganizationSide:false
            });

            var oViewModel = new JSONModel({
                bikeSideContainer: './img/bike5SideContainer.gif'
            });
            this.getView().setModel(oViewModel, "bikeCollection");
        },
        showBike6: function () {
            console.log("showTestRide:false")
            var oModel = this.getView().getModel("visibility");
            oModel.setData({
                showDefaultContent: false,
                showAboutUs: false,
                showDealer: false,
                showBike1: false,
                showBike2: false,
                showBike3: false,
                showBike4: false,
                showBike5: false,
                showBike6: true,
                showBike7: false,
                showBike8: false,
                showBike9: false,
                CustomerSide:false,
                ThirdPartySide:false,
                DealerSide:false,
                OrderSide:false,
                OrganizationSide:false
            });

            var oViewModel = new JSONModel({
                bikeSideContainer: './img/bike6SideContainer.gif'
            });
            this.getView().setModel(oViewModel, "bikeCollection");
        },
        showBike7: function () {
            console.log("showTestRide:false")
            var oModel = this.getView().getModel("visibility");
            oModel.setData({
                showDefaultContent: false,
                showAboutUs: false,
                showDealer: false,
                showBike1: false,
                showBike2: false,
                showBike3: false,
                showBike4: false,
                showBike5: false,
                showBike6: false,
                showBike7: true,
                showBike8: false,
                showBike9: false,
                CustomerSide:false,
                ThirdPartySide:false,
                DealerSide:false,
                OrderSide:false,
                OrganizationSide:false
            });

            var oViewModel = new JSONModel({
                bikeSideContainer: './img/bike7SideContainer.gif'
            });
            this.getView().setModel(oViewModel, "bikeCollection");
        },
        showBike8: function () {
            console.log("showTestRide:false")
            var oModel = this.getView().getModel("visibility");
            oModel.setData({
                showDefaultContent: false,
                showAboutUs: false,
                showDealer: false,
                showBike1: false,
                showBike2: false,
                showBike3: false,
                showBike4: false,
                showBike5: false,
                showBike6: false,
                showBike7: false,
                showBike8: true,
                showBike9: false,
                CustomerSide:false,
                ThirdPartySide:false,
                DealerSide:false,
                OrderSide:false,
                OrganizationSide:false
            });

            var oViewModel = new JSONModel({
                bikeSideContainer: './img/bike8SideContainer.gif'
            });
            this.getView().setModel(oViewModel, "bikeCollection");
        },
        showBike9: function () {
            console.log("showTestRide:false")
            var oModel = this.getView().getModel("visibility");
            oModel.setData({
                showDefaultContent: false,
                showAboutUs: false,
                showDealer: false,
                showBike1: false,
                showBike2: false,
                showBike3: false,
                showBike4: false,
                showBike5: false,
                showBike6: false,
                showBike7: false,
                showBike8: false,
                showBike9: true,
                CustomerSide:false,
                ThirdPartySide:false,
                DealerSide:false,
                OrderSide:false,
                OrganizationSide:false
            });

            var oViewModel = new JSONModel({
                bikeSideContainer: './img/bike9SideContainer.gif'
            });
            this.getView().setModel(oViewModel, "bikeCollection");
        },

        CustomerSide:function(){
            console.log("showTestRide:false")
            var oModel = this.getView().getModel("visibility");
            oModel.setData({
                showDefaultContent: false,
                showAboutUs: false,
                showDealer: false,
                showBike1: false,
                showBike2: false,
                showBike3: false,
                showBike4: false,
                showBike5: false,
                showBike6: false,
                showBike7: false,
                showBike8: false,
                showBike9: false,
                CustomerSide:true,
                ThirdPartySide:false,
                DealerSide:false,
                OrderSide:false,
                OrganizationSide:false
            });
        },
        ThirdPartySide:function(){
            console.log("showTestRide:false")
            var oModel = this.getView().getModel("visibility");
            oModel.setData({
                showDefaultContent: false,
                showAboutUs: false,
                showDealer: false,
                showBike1: false,
                showBike2: false,
                showBike3: false,
                showBike4: false,
                showBike5: false,
                showBike6: false,
                showBike7: false,
                showBike8: false,
                showBike9: false,
                CustomerSide:false,
                ThirdPartySide:true,
                DealerSide:false,
                OrderSide:false,
                OrganizationSide:false
            });
        },
        DealerSide:function(){
            console.log("showTestRide:false")
            var oModel = this.getView().getModel("visibility");
            oModel.setData({
                showDefaultContent: false,
                showAboutUs: false,
                showDealer: false,
                showBike1: false,
                showBike2: false,
                showBike3: false,
                showBike4: false,
                showBike5: false,
                showBike6: false,
                showBike7: false,
                showBike8: false,
                showBike9: false,
                CustomerSide:false,
                ThirdPartySide:false,
                DealerSide:true,
                OrderSide:false,
                OrganizationSide:false
            });
        },
        OrderSide:function(){
            console.log("showTestRide:false")
            var oModel = this.getView().getModel("visibility");
            oModel.setData({
                showDefaultContent: false,
                showAboutUs: false,
                showDealer: false,
                showBike1: false,
                showBike2: false,
                showBike3: false,
                showBike4: false,
                showBike5: false,
                showBike6: false,
                showBike7: false,
                showBike8: false,
                showBike9: false,
                CustomerSide:false,
                ThirdPartySide:false,
                DealerSide:false,
                OrderSide:true,
                OrganizationSide:false
            });
        },
        OrganizationSide:function(){
            console.log("showTestRide:false")
            var oModel = this.getView().getModel("visibility");
            oModel.setData({
                showDefaultContent: false,
                showAboutUs: false,
                showDealer: false,
                showBike1: false,
                showBike2: false,
                showBike3: false,
                showBike4: false,
                showBike5: false,
                showBike6: false,
                showBike7: false,
                showBike8: false,
                showBike9: false,
                CustomerSide:false,
                ThirdPartySide:false,
                DealerSide:false,
                OrderSide:false,
                OrganizationSide:true
            });
        },

        onNavRoyalWarrenty: function () {
            console.log("Chat button clicked!");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("REWarranty");
        },
        logout: function () {
            console.log("logout button clicked");  
            sap.m.MessageBox.confirm("Are you sure you want to log out?", {
                title: "Confirmation",
                actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                emphasizedAction: sap.m.MessageBox.Action.OK,
                onClose: function (oAction) {
                    if (oAction === sap.m.MessageBox.Action.OK) {
                        console.log("User confirmed logout.");
                        //

            
                        sessionStorage.clear();
                        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                        oRouter.navTo("RouteRoyalEnfieldLogin");
                        history.replaceState(null, null, location.href);
                        window.onpopstate = function () {
                            history.go(1);
                        };

                    } else {
                        console.log("User canceled logout.");
                    }
                }.bind(this) // Ensure `this` is available inside the callback
            });
        }
        ,
        onDealerChart: function () {
            console.log("DealerChart button clicked!");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("dealerchart");
        },
        onDealerChartExternal:function(){
            console.log("DealerChart button clicked!");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("REExternalChart");

        },

        onSupport: function () {
            console.log("On support button clicked!");
            if (!this.oSupportDialog) {
                this.oSupportDialog = new sap.m.Dialog({
                    title: "Support",
                    type: sap.m.DialogType.Message,
                    content: new sap.m.Text({
                        text: "Please contact support at support@royalenfield.com or call 800-XXX-1111.",
                        wrapping: true
                    }).addStyleClass("").addCustomData(new sap.ui.core.CustomData({
                        key: "style",
                        value: "color:blue;"
                    })),


                    beginButton: new sap.m.Button({
                        text: "OK",
                        press: function () {
                            this.oSupportDialog.close();
                        }.bind(this)
                    })
                });
            }
            this.oSupportDialog.open();
        },

        onFeedback: function () {
            // Lazy load the feedback dialog fragment
            if (!this.oFeedbackDialog) {
                this.oFeedbackDialog = sap.ui.xmlfragment("ns.royalenfield.fragment.Feedback", this);
                this.getView().addDependent(this.oFeedbackDialog);
            }

            // Open the feedback dialog
            this.oFeedbackDialog.open();
        },

        onSubmitFeedback: function () {
            // Get the feedback text
            var sFeedback = sap.ui.getCore().byId("feedbackTextArea").getValue();

            if (!sFeedback.trim()) {
                MessageToast.show("Please provide some feedback before submitting.");
                return;
            }

            // Example: Send the feedback to a backend service
            MessageToast.show("Thank you for your feedback!");

            // Close the dialog
            this.oFeedbackDialog.close();
        },

        onCloseFeedback: function () {
            // Close the feedback dialog
            this.oFeedbackDialog.close();
        },

        onHelp: function () {
            // Lazy load the help dialog fragment
            if (!this.oHelpDialog) {
                this.oHelpDialog = sap.ui.xmlfragment("ns.royalenfield.fragment.Help", this);
                this.getView().addDependent(this.oHelpDialog);
            }

            // Open the help dialog
            this.oHelpDialog.open();
        },

        onCloseHelp: function () {
            // Close the help dialog
            this.oHelpDialog.close();
        }



    });
});
