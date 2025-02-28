sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/BusyDialog",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History"
], function (Controller, BusyDialog, MessageToast,History) { // Fix the order here
    "use strict";

    var onBusyDataDialog = new BusyDialog({
        title: "DATA LOADING",
        text: "Please wait......."
    });

    return Controller.extend("ns.royalenfield.controller.REAboutUs", {
        onInit: function () {
            onBusyDataDialog.open();

            setTimeout(() => {
                onBusyDataDialog.close();
            }, 2000);
        },
        onbackToRoyal(){
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();
    
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("overview", {}, true);
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
            var greetings = ["hi", "hello", "what's up", "wassup"];
            var greetings_response = ["Hello", "Nice to meet you"];
            var emi=["how to apply emi?","EMI options","EMI loan","EMI options", "EMI"];
            var job = ["what can you do for me?", "what can you do for me", "what can you do", "what can you do?"];
            if (query) {
                if (greetings.indexOf(query.toLowerCase()) != -1) {
                    var item = greetings_response[Math.floor(Math.random() * greetings_response.length)];
                    var a = this.createText(item);
                    this.reply(a);
                } 
                else if (emi.indexOf(query.toLowerCase()) != -1) {
                    var a = this.createText("You can apply for an EMI loan at your nearest dealership or through our online platform.");
                    this.reply(a);
                }else if (query.toLowerCase().match(/what.*you.*do/g)) {
                    var a = this.createText("What do you want me to do? XD");
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
