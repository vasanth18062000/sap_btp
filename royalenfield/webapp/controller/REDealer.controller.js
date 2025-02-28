sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,History) {
        "use strict";
 
        return Controller.extend("ns.royalenfield.controller.REDealer", {
            onInit: function () {
 
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
 
 
            onFirstNameChange: function (oEvent) {
                var input = oEvent.getSource();
                var inputValue = input.getValue();
     
                if (!inputValue) {
                    input.setValueState("Error");
                    input.setValueStateText("Name should not be empty");
                }
            },
   
            onEmailChange: function (oEvent) {
                var emailRegex = /^[a-z0-9._%+-]+@(gmail\.com|microsoft\.com)$/; // Lowercase regex for better validation
                var input = oEvent.getSource();
                var inputValue = input.getValue().trim(); // Trim whitespace
           
                // Convert to lowercase before validation
                var lowerCaseInput = inputValue.toLowerCase();
           
                // Update input field with lowercase value
                input.setValue(lowerCaseInput);
           
                // Perform validation
                if (!lowerCaseInput) {
                    input.setValueState("Error");
                    input.setValueStateText("Email ID cannot be empty.");
                } else if (!emailRegex.test(lowerCaseInput)) {
                    input.setValueState("Error");
                    input.setValueStateText("Invalid Email ID. Please use a valid email ending with @gmail.com or @microsoft.com.");
                } else {
                    input.setValueState("None");
                    input.setValueStateText("");
                }
            },
            onMobileNumberChange: function (oEvent) {
                var input = oEvent.getSource();
                var inputValue = input.getValue().trim(); // Trim any leading or trailing spaces
                var onlyDigitsRegex = /^[0-9]*$/; // Check for digits only
                var mobileNumberRegex = /^[0-9]{10}$/; // Check for a 10-digit number
           
                if (!onlyDigitsRegex.test(inputValue)) {
                    input.setValueState("Error");
                    input.setValueStateText("Invalid input. Only numbers are allowed.");
                } else if (!mobileNumberRegex.test(inputValue)) {
                    input.setValueState("Error");
                    input.setValueStateText("Invalid Mobile Number. Please enter a 10-digit number.");
                } else {
                    input.setValueState("None");
                    input.setValueStateText("");
                }
            },
 
 
            onSubmit: function () {
 
                var isValid = true; // To track overall validation
                var errorMessages = []; // To collect error messages for all fields
       
                // Validate First Name
                var firstNameInput = this.getView().byId("nameInput");
                firstNameInput.fireChange(); // Trigger validation for First Name
                if (firstNameInput.getValueState() === "Error") {
                    isValid = false;
                    errorMessages.push(firstNameInput.getValueStateText());
                }
       
                // Validate Email
                var emailInput = this.getView().byId("emailInput");
                emailInput.fireChange(); // Trigger validation for Email
                if (emailInput.getValueState() === "Error") {
                    isValid = false;
                    errorMessages.push(emailInput.getValueStateText());
                }
       
                // Validate Mobile Number
                var mobileInput = this.getView().byId("contactInput");
                mobileInput.fireChange(); // Trigger validation for Mobile Number
                if (mobileInput.getValueState() === "Error") {
                    isValid = false;
                    errorMessages.push(mobileInput.getValueStateText());
                }
   
 
               
                var oModel = this.getView().getModel();
                console.log(oModel);
                var bIsTermsAccepted = this.getView().byId("agreeTerms").getSelected();
 
                if (!bIsTermsAccepted) {
                    sap.m.MessageToast.show("Please accept the terms and conditions before submitting.", {
                        duration: 1000, // Duration in milliseconds
                       
                    });
                    return; // Exit the function if CheckBox is not selected
                }
 
                var aRequiredFields = [
                    { id: "nameInput", message: "Full Name is required." },
                    { id: "emailInput", message: "Email is required." },
                    { id: "contactInput", message: "Contact Number is required." },
                    { id: "businessNameInput", message: "Business Name is required." },
                    { id: "addressInput", message: "Address is required." },
                    { id: "pincode", message: "Pincode is required." },
                    { id: "city", message: "City is required." },
                    { id: "state", message: "State is required." },
                    { id: "country", message: "Country is required." },
                    { id: "locationInput", message: "Preferred Location for Dealership is required." }
                ];
           
                for (var i = 0; i < aRequiredFields.length; i++) {
                    var oField = this.getView().byId(aRequiredFields[i].id);
                    if (!oField || !oField.getValue()) {
                        sap.m.MessageBox.error(aRequiredFields[i].message, {
                            title: "Validation Error"
                        });
                        return; // Exit if a required field is empty
                    }
                }
   
                // Generate UUID for unique ID
            function generateUUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                  var r = (Math.random() * 16) | 0,
                    v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
            });
        }
 
        var selectedSource = this.getView().byId("selectSource").getSelectedItem().getText();
           
                var oEntry = {
                    id: generateUUID(),
                   
                    name: this.getView().byId("nameInput").getValue(),
                    emailId: this.getView().byId("emailInput").getValue(),
                    mobileNumber: this.getView().byId("contactInput").getValue(),
                    companyName: this.getView().byId("businessNameInput").getValue(),
                    address: this.getView().byId("addressInput").getValue(),
                    fileUploade : this.getView().byId("idBase64AreaDealer").getValue(),
                    pincode: this.getView().byId("pincode").getValue(),
                    city: this.getView().byId("city").getValue(),
                    state: this.getView().byId("state").getValue(),
                    country: this.getView().byId("country").getValue(),
                    cityForDealership: this.getView().byId("locationInput").getValue(),
                    description: this.getView().byId("commentsInput").getValue(),
                    source: selectedSource,
                    createdBy: this.getView().byId("nameInput").getValue(),
                    existingDealer: this.getView().byId("exis").getSelectedIndex() === 0
                   
                };
            console.log(oEntry)
                // Post data using the OData model
                oModel.create("/Dealer", oEntry, {
                    success: function () {
                        sap.m.MessageToast.show("Form submitted successfully!");
 
                        // Clear all input fields
        this.getView().byId("nameInput").setValue("");
        this.getView().byId("emailInput").setValue("");
        this.getView().byId("contactInput").setValue("");
        this.getView().byId("businessNameInput").setValue("");
        this.getView().byId("addressInput").setValue("");
       
 
        var oField2 = this.getView().byId("idBase64AreaDealer");
        if (oField2) oField2.setValue("");
 
        this.getView().byId("pincode").setValue("");
        this.getView().byId("city").setValue("");
        this.getView().byId("state").setValue("");
        this.getView().byId("country").setValue("");
        this.getView().byId("locationInput").setValue("");
        this.getView().byId("commentsInput").setValue("");
        this.getView().byId("selectSource").setSelectedKey(""); // Reset dropdown to default
        this.getView().byId("exis").setSelectedIndex(-1); // Reset radio button group
        this.getView().byId("agreeTerms").setSelected(false); // Uncheck checkbox
 
                    }.bind(this),
                    error: function (oError) {
                        sap.m.MessageBox.error("Form submission failed. Please try again.");
                    }
                });
            },
 
            onNextTermsPage: function () {
                console.log("Pressed")
                this.getOwnerComponent().getRouter().navTo("TermsAndCondition");
           
                console.log("done")
            },
           
            onPincodeChange: function (oEvent) {
                var pincodeRegex = /^[1-9][0-9]{5}$/;
                var input = oEvent.getSource();
                console.log(input);
                var inputValue = input.getValue();
                console.log(inputValue);
   
   
                if (!pincodeRegex.test(inputValue)) {
                    input.setValueState("Error");
                    input.setValueStateText("Invalid Pincode. Please enter a valid 6-digit pincode.");
                }
                else {
                    input.setValueState("None");
                    input.setValueStateText("");
                    var self = this;
                    jQuery.ajax({
                        url: "https://api.postalpincode.in/pincode/" + encodeURIComponent(inputValue),
                        method: "GET",
                        cache: false,
   
                        success: function (data) {
                            console.log(data);
                            if (data && data[0] && data[0].Status === "Success") {
   
                                var oData = {
   
                                    district: data[0].PostOffice[0].District,
                                    state: data[0].PostOffice[0].State,
                                    country: data[0].PostOffice[0].Country
                                };
                                console.log(oData);
                                var oModel = new sap.ui.model.json.JSONModel(oData);
                                self.getView().setModel(oModel, "locationData");
                            }
                            else {
                                input.setValueState("Error");
                                input.setValueStateText("Pincode not found. Please double-check your entry and try again.");
                            }
                        },
                        error: function (error) {
                            console.error("Error loading data:", error);
                        }
                    });
                }
            },
 
            onChangeDP: function (oEvent) {
                var that = this;
                var image = new Image();
                var file = oEvent.getParameter("files")[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    var data = reader.result;
               
                    var inputString = data;
                    console.log(inputString);
                    var wordsToRemove = ["data:image/png;base64,","data:text/plain;base64,","data:image/jpeg;base64,"
                                    ,"data:audio/mpeg;base64,","data:application/vnd.ms-excel;base64,","data:video/mp4;base64,"];
                    var replacement = "";
                    var regexPattern = new RegExp(wordsToRemove.join('|'), 'gi');
   
                   
                    var resultString = inputString.replace(regexPattern, replacement);
                    console.log(resultString);
                var rs=resultString;
               
                    console.log(data);
                    that.byId("idBase64AreaDealer").setValue(resultString);
                    var base64Data = inputString;
                    // that.byId("imagePreview").setSrc(base64Data);
                   
                    image.onload = function () {
                   
                        if (this.width + this.height === 0) {
                            that.dpImage = "";
                            sap.m.MessageBox.error("Invalid Image!");
                        }
                    };
                };
                reader.onerror = function (error) {
                    //Error Handling
                };
               
           
            },
 
            //chatbot
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
            // answer: function (query) {
            //     var greetings = ["hi", "hello", "what's up", "How can I check the availability"];
            //     var greetings_response = ["Hello", "Nice to meet you", "Hmm mm"];
            //     var job = ["what can you do for me?", "what can you do for me", "what can you do", "what can you do?"];
            //     if (query) {
            //         if (greetings.indexOf(query.toLowerCase()) != -1) {
            //             var item = greetings_response[Math.floor(Math.random() * greetings_response.length)];
            //             var a = this.createText(item);
            //             this.reply(a);
            //         } else if (query.toLowerCase().match(/what.*you.*do/g)) {
            //             var a = this.createText("How can I get my Royal Enfield bike on EMI?");
            //             var b = this.createButton("Show you your Questionnaire");
            //             var c = this.createButton("Show you user details");
            //             var d = this.createButton("Delete users");
            //             var e = this.createButton("Do something naughty");
            //             var vbox = new sap.m.VBox();
            //             vbox.addItem(a);
            //             vbox.addItem(b);
            //             vbox.addItem(c);
            //             vbox.addItem(d);
            //             vbox.addItem(e);
            //             this.reply(vbox);
            //         } else {
            //             this.reply();
            //         }
            //     }
            // },
            answer: function (query) {
                var greetings = ["hi", "hello", "what's up", "How can I check the availability"];
                var greetings_response = ["Hello", "Nice to meet you"];
                var job = ["what can you do for me?", "what can you do for me", "what can you do", "what can you do?"];
               
                // New question-answer pairs
                var availability = ["how can I check the availability?", "is my bike available?", "bike availability"];
                var emi_query = ["how can I get my Royal Enfield bike on EMI?", "EMI options", "bike EMI"];
                var emi=["how to apply emi?","EMI options","EMI loan","EMI options", "EMI"];
                var apply_emi = ["how can I apply for an EMI loan?", "apply EMI loan", "EMI loan application"];
                var contact_query = ["how to contact?", "contact details", "how do I contact?"];
           
                if (query) {
                    // Respond to greetings
                    if (greetings.indexOf(query.toLowerCase()) != -1) {
                        var item = greetings_response[Math.floor(Math.random() * greetings_response.length)];
                        var a = this.createText(item);
                        this.reply(a);
           
                    // Respond to EMI-related queries
                    }
                    else if (emi.indexOf(query.toLowerCase()) != -1) {
                        var a = this.createText("You can apply for an EMI loan at your nearest dealership or through our online platform.");
                        this.reply(a);
                    }else if (emi_query.indexOf(query.toLowerCase()) != -1) {
                        var a = this.createText("You can easily get your Royal Enfield bike on EMI through our financing options.");
                        this.reply(a);
           
                    // Respond to availability check questions
                    } else if (availability.indexOf(query.toLowerCase()) != -1) {
                        var a = this.createText("To check the availability of your desired model, you can visit the nearest dealership or check online.");
                        this.reply(a);
           
                    // Respond to applying for EMI loan
                    } else if (apply_emi.indexOf(query.toLowerCase()) != -1) {
                        var a = this.createText("You can apply for an EMI loan at your nearest dealership or through our online platform.");
                        this.reply(a);
           
                    // Respond to contact queries
                    } else if (contact_query.indexOf(query.toLowerCase()) != -1) {
                        var a = this.createText("You can call our customer support team at [989984746] for any assistance.");
                        this.reply(a);
           
                    // Handle unknown queries
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
                        text: "You can easily get your Royal Enfield bike on EMI through our financing options."
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