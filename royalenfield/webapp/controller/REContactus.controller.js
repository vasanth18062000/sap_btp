sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History",
    "sap/m/BusyDialog"
],
    function (Controller, MessageBox, MessageToast,History, BusyDialog) {
        "use strict";

        var onBusyDataDialog= new BusyDialog({
            title:"DATA LOADING",
            text:"Please wait......."
        });

        return Controller.extend("ns.royalenfield.controller.REContactus", {
            onInit: function () {
                onBusyDataDialog.open();
                setTimeout(() => {
                    onBusyDataDialog.close();
                }, 2000);

            },
        
            onbackToTile(){
                
                const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {}, true);
			}
            },

            onFacebookPress: function () {
                window.open("https://www.facebook.com/RoyalEnfield", "_blank");
            },

            // Function to handle Twitter button press
            onTwitterPress: function () {
                window.open("https://twitter.com/RoyalEnfield", "_blank");
            },

            // Function to handle Instagram button press
            onInstagramPress: function () {
                window.open("https://www.instagram.com/royalenfield", "_blank");
            },

            // Function to handle YouTube button press
            onYouTubePress: function () {
                window.open("https://www.youtube.com/@royalenfield", "_blank");
            },

            onSubmit: function () {
                var mobileNumberRegex = /^[0-9]{10}$/;
                var validateMobileNumber = this.getView().byId("mobileNumber").getValue();
                if (!mobileNumberRegex.test(validateMobileNumber)) {
                    MessageToast.show("Invalid Mobile Number. Please enter a 10-digit number.");
                    return;
                }

                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                var validateEmail = this.getView().byId("emailId").getValue();
                if (!emailRegex.test(validateEmail)) {
                    MessageToast.show("Invalid Email Address. Please enter a valid email address.");
                    return;
                }
                var oModel = this.getView().getModel();
                var oView = this.getView();
                var id = generateId(8);
                var oEntry = {
                    id: id,
                    name: this.getView().byId("name").getValue(),
                    emailId: this.getView().byId("emailId").getValue(),
                    mobileNumber: this.getView().byId("mobileNumber").getValue(),
                    anyQueries: this.getView().byId("anyQueries").getValue()
                };
                console.log(oEntry);
                oModel.create("/ContactUs", oEntry, {
                    success: function () {
                        MessageBox.success("Data saved successfully!");
                        oView.byId("name").setValue("");
                        oView.byId("emailId").setValue("");
                        oView.byId("mobileNumber").setValue("");
                        oView.byId("anyQueries").setValue("");
                    },
                    error: function () {
                        MessageBox.error("Error saving data.");
                    }
                });


                function generateId(length) {
                    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    let result = '';
                    for (let i = 0; i < length; i++) {
                        result += chars.charAt(Math.floor(Math.random() * chars.length));
                    }
                    return result;
                }
            },
            handleMessagePopoverPress: function (oEvent) {
                console.log("message popover");
                
                // create popover
                if (!this._oPopover) {
                    this._oPopover = sap.ui.xmlfragment("ns.royalenfield.fragment.Bot", this);
                    this.getView().addDependent(this._oPopover);
                }
                if (this._oPopover.isOpen()) {
                    this._oPopover.close();
                } else {
                    this._oPopover.openBy(oEvent.getSource());
                }
            },
            ask: function (oEvent) {
                var input = sap.ui.getCore().byId("query").getValue();
                var fBox = new sap.m.FlexBox({
                    alignItems: "Start",
                    justifyContent: "End"
                });
                var text = new sap.m.Text({
                    text: input
                });
                text.addStyleClass("chat2");
                fBox.addItem(text);
                fBox.addStyleClass("sapUiSmallMarginTop");
                sap.ui.getCore().byId("chat").addItem(fBox);
                sap.ui.getCore().byId("query").setValue("");
                this.answer(input);
            },
            answer: function (query) {
                var greetings = ["hi", "hello", "what's up", "How can I check the availability"];
                var greetings_response = ["Hello", "Nice to meet you"];
                var job = ["what can you do for me?", "what can you do for me", "what can you do", "what can you do?"];
                
                // New question-answer pairs
                var availability = ["how can I check the availability?", "is my bike available?", "bike availability"];
                var emi=["how to apply emi?","EMI options","EMI loan","EMI options", "EMI", "EMI Offers"];
                var emi_query = ["how can I get my Royal Enfield bike on EMI?", "EMI options", "bike EMI"];
                var apply_emi = ["how can I apply for an EMI loan?", "apply EMI loan", "EMI loan application"];
                var contact_query = ["how to contact?", "contact details", "how do I contact?"];
                var Bike_Related =["latest bike"];
                var pricing_s= ["What is the price of [Goan Classic 350]?", "What is the price of [Bear 650]?","What is the price of [Classic 350]?","What is the price of [Guerrilla 450]?","What is the price of [Shotgun 650]?","What is the price of [New Himalayan]?","What is the price of [Bullet 350]?","What is the price of [ Hunter 350]?"];
                var booking=["How do I book a bike online?","Is there a home delivery option for the bike?"];
                var Service=["Do you provide free servicing?","What is the warranty period for your bikes?",];


            




            
                if (query) {
                    // Respond to greetings
                    if (greetings.indexOf(query.toLowerCase()) != -1) {
                        var item = greetings_response[Math.floor(Math.random() * greetings_response.length)];
                        var a = this.createText(item);
                        this.reply(a);
            
                    // Respond to EMI-related queries
                    } else if (emi_query.indexOf(query.toLowerCase()) != -1) {
                        var a = this.createText("You can easily get your Royal Enfield bike on EMI through our financing options.");
                        this.reply(a);
            
                    // Respond to availability check questions
                    } else if (availability.indexOf(query.toLowerCase()) != -1) {
                        var a = this.createText("To check the availability of your desired model, you can visit the nearest dealership or check online.");
                        this.reply(a);
            
                    
                    
                    }else if (emi.indexOf(query.toLowerCase()) != -1) {
                        var a = this.createText("You can apply for an EMI loan at your nearest dealership or through our online platform.");
                        this.reply(a);
                    }
                    // Respond to applying for EMI loan
                    else if (apply_emi.indexOf(query.toLowerCase()) != -1) {
                        var a = this.createText("You can apply for an EMI loan at your nearest dealership or through our online platform.");
                        this.reply(a);
            
                    // Respond to contact queries
                    } else if (contact_query.indexOf(query.toLowerCase()) != -1) {
                        var a = this.createText("You can call our customer support team at [989984746] for any assistance.");
                        this.reply(a);
            
                    } else if (Bike_Related.indexOf(query.toLowerCase()) != -1) {
                        var a = this.createText("We currently have the latest models like [Goan Classic 350], [Bear 650], and [ Hunter 350],[Bullet 350],[New Himalayan],[Shotgun 650],[Guerrilla 450] in various colors and configurations. Check out our website or visit your nearest showroom for more details!.");
                        this.reply(a);
                    
                       } else if (query.toLowerCase().match(/what.*you.*do/g)) {
                        var a = this.createText("How can I get my Royal Enfield bike on EMI?");
                        var b = this.createButton("Show you your Questionnaire");
                        var c = this.createButton("Show you user details");
                        var d = this.createButton("Delete users");
                        var e = this.createButton("Do something naughty");
                        var vbox = new sap.m.VBox();
                        vbox.addItem(a);
                        vbox.addItem(b);
                        vbox.addItem(c);
                        vbox.addItem(d);
                        vbox.addItem(e);
                        this.reply(vbox);
            
                    } else {
                        this.reply();
                    }
                }
            },
            reply: function (ans) {
                if (ans) {
                    var fBox = new sap.m.FlexBox({
                        alignItems: "Start",
                        justifyContent: "Start"
                    });
                    ans.addStyleClass("chat1");
                    ans.addStyleClass("sapUiSizeCompact");
                    fBox.addItem(ans);
                    fBox.addStyleClass("sapUiSmallMarginTop");
                    sap.ui.getCore().byId("chat").addItem(fBox);
                } else {
                    var fBox = new sap.m.FlexBox({
                        alignItems: "Start",
                        justifyContent: "Start"
                    });
                    var text = new sap.m.Text({
                        text: "Did not recognize you. Come again"
                    });
                    text.addStyleClass("chat1");
                    fBox.addItem(text);
                    fBox.addStyleClass("sapUiSmallMarginTop");
                    sap.ui.getCore().byId("chat").addItem(fBox);
                }
                $("#pop-cont").scrollTop($("#pop-cont")[0].scrollHeight - $("#pop-cont").height());
            },
            onClear: function (oEvent) {
                sap.ui.getCore().byId("chat").removeAllItems();
            },
            onScroll: function () {
                $("#pop-cont").scrollTop($("#pop-cont")[0].scrollHeight - $("#pop-cont").height());
            },
            createText: function (text) {
                var text = new sap.m.Text({
                    text: text
                });
                return text;
            },
            buttonPress: function (btext) {
                var that = this;
                var naughty = ["I just did.\n I was being naughty by giving you the option of being naughty :D", "You should not ask for that ;)",
                    "Its rude to ask for it", "Gotcha :P ", "That was a character test, you failed"
                ];
                var btext = btext.toLowerCase();
                if (btext.match(/show.*ques/g)) {
                    var Input = new sap.m.Input({
                        submit: function (oEvent) {
                            that.onTestPress(oEvent, oEvent.getParameter("value"));
                        }
                    });
                    var a = this.createText("Provide the SET NAME-SET ID  and hit Enter");
                    var vbox = new sap.m.VBox();
                    vbox.addItem(a);
                    vbox.addItem(Input);
                    this.reply(vbox);
                } else if (btext.match(/show.*user/g)) {
                    var Input = new sap.m.Input({
                        submit: function (oEvent) {
                            that.onUserPress(oEvent, oEvent.getParameter("value"));
                        }
                    });
                    var a = this.createText("Provide the USER_ID  and hit Enter");
                    var vbox = new sap.m.VBox();
                    vbox.addItem(a);
                    vbox.addItem(Input);
                    this.reply(vbox);
                } else if (btext.match(/delete.*user/g)) {
                    var a = this.createText("Sorry the function is not yet available");
                    this.reply(a);
                } else if (btext.match(/naughty/g)) {
                    var item = naughty[Math.floor(Math.random() * naughty.length)];
                    var a = this.createText(item);
                    this.reply(a);
                }
            },
            createButton: function (text) {
                var that = this;
                var link = new sap.m.Button({
                    text: text,
                    type: sap.m.ButtonType.Accept,
                    press: function (oEvent) {
                        that.buttonPress(text);
                    }
                });
                link.addStyleClass("sapUiSmallMarginTop");
                return link;
            }
        });
    });
