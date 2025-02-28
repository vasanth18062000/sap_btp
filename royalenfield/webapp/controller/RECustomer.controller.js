sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/core/routing/History",
  ],
  function (Controller, MessageToast, MessageBox, History) {
    "use strict";

    return Controller.extend("ns.royalenfield.controller.RECustomer", {
      // footer logo
      onInit: function () {
        console.log("this is customer page");
      },
      onTogglePasswordVisibility: function (oEvent) {
        // Get the Input control and its current type
        var oInput = this.byId("password");
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
    

      onShowNoCostEMIPopup: function () {
        var oDialog = this.byId("noCostEMIDialog");
        oDialog.open();
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
      // footer logo
      onShowFirstTimeBuyerPopup: function () {
        var oDialog = this.byId("firstTimeBuyerDialog");
        oDialog.open();
      },
      // footer continue button
      onClosePopup: function (oEvent) {
        var oDialog = oEvent.getSource().getParent(); // Get the Dialog instance
        oDialog.close();
      },
      // footer closed button
      onClosePopupEmi: function () {
        this.byId("noCostEMIDialog").close();
      },
      // footer closed button
      onClosePopupFirstTimeBuyer: function () {
        this.byId("firstTimeBuyerDialog").close();
      },
      onbackToHomePage() {
        const oHistory = History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("overview", {}, true);
        }
      },
      onInit: function () {},
      onFirstNameChange: function (oEvent) {
        var input = oEvent.getSource();
        var inputValue = input.getValue();

        if (!inputValue) {
          input.setValueState("Error");
          input.setValueStateText("Name should not be empty");
        }
      },
      onPasswordChange: function (oEvent) {
        const input = oEvent.getSource();
        const password = input.getValue().trim();
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(password)) {
          input.setValueState("Error");
          input.setValueStateText(
            "Password must be at least 8 characters long and include a mix of uppercase, lowercase, digits, and special characters."
          );
        } else {
          input.setValueState("None");
        }
      },
      //mobile validation
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
          input.setValueStateText(
            "Invalid Mobile Number. Please enter a 10-digit number."
          );
        } else {
          input.setValueState("None");
          input.setValueStateText("");
        }
      },
      onSave: function () {
        var isValid = true; // To track overall validation
        var errorMessages = []; // To collect error messages for all fields
    
        // Validate First Name
        var firstNameInput = this.getView().byId("firstName");
        firstNameInput.fireChange(); // Trigger validation for First Name
        if (firstNameInput.getValueState() === "Error") {
            isValid = false;
            errorMessages.push(firstNameInput.getValueStateText());
        }
    
        // Validate Mobile Number
        var mobileInput = this.getView().byId("mobileNumber");
        mobileInput.fireChange(); // Trigger validation for Mobile Number
        if (mobileInput.getValueState() === "Error") {
            isValid = false;
            errorMessages.push(mobileInput.getValueStateText());
        }
    
        // Validate Password
        var passwordInput = this.getView().byId("password");
        passwordInput.fireChange(); // Trigger validation for Password
        if (passwordInput.getValueState() === "Error") {
            isValid = false;
            errorMessages.push(passwordInput.getValueStateText());
        }
    
        // Validate Date of Birth
        var dateOfBirthValue = this.getView().byId("dob").getValue();
        var dateOfBirth = new Date(dateOfBirthValue);
        var today = new Date();
        var eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
    
        if (!dateOfBirthValue) {
            MessageBox.error("Date of Birth is required.");
            return;
        }
        if (dateOfBirth > today) {
            MessageBox.error("Future dates are not allowed.");
            return;
        }
        if (dateOfBirth >= eighteenYearsAgo) {
            MessageBox.error("Customer must be at least 18 years old.");
            return;
        }
    
        if (isValid) {
            // Generate UUID for unique ID
            function generateUUID() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                    /[xy]/g,
                    function (c) {
                        var r = (Math.random() * 16) | 0,
                            v = c === "x" ? r : (r & 0x3) | 0x8;
                        return v.toString(16);
                    }
                );
            }
    
            // Gender
            var genderKey = this.getView().byId("gender").getSelectedKey();
    
            // Create customer entry
            var oEntry = {
                id: generateUUID(),
                firstName: this.getView().byId("firstName").getValue(),
                lastName: this.getView().byId("lastName").getValue(),
                emailId: this.getView().byId("email").getValue(),
                mobileNumber: this.getView().byId("mobileNumber").getValue(),
                password: this.getView().byId("password").getValue(),
                dateOfBirth: dateOfBirthValue,
                gender: genderKey,
            };
    
            var oModel = this.getView().getModel();
            oModel.create("/Customer", oEntry, {
                method: "POST",
                success: function () {
                    // Clear all input fields
                    this.getView().byId("firstName").setValue("");
                    this.getView().byId("lastName").setValue("");
                    this.getView().byId("email").setValue("");
                    this.getView().byId("mobileNumber").setValue("");
                    this.getView().byId("password").setValue("");
                    this.getView().byId("dob").setValue("");
                    this.getView().byId("gender").setSelectedKey("");
                    this.getView().byId("agreeTerms").setSelected(false);
                    MessageBox.success("Account created successfully.");
                }.bind(this),
                error: function () {
                    MessageBox.error("Customer Email Already Exists...");
                },
            });
        } else {
            // Show error messages in a toast
            MessageToast.show(
                "Please fix the following errors:\n" + errorMessages.join("\n")
            );
        }
    },
      handleMessagePopoverPress: function (oEvent) {
        console.log("message popover");

        // create popover
        if (!this._oPopover) {
          this._oPopover = sap.ui.xmlfragment(
            "ns.royalenfield.fragment.Bot",
            this
          );
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
          justifyContent: "End",
        });
        var text = new sap.m.Text({
          text: input,
        });
        text.addStyleClass("chat2");
        fBox.addItem(text);
        fBox.addStyleClass("sapUiSmallMarginTop");
        sap.ui.getCore().byId("chat").addItem(fBox);
        sap.ui.getCore().byId("query").setValue("");
        this.answer(input);
      },
      answer: function (query) {
        var greetings = [
          "hi",
          "hello",
          "what's up",
          "How can I check the availability",
        ];
        var bike = ["vankkam"];
        var emi = [
          "how to apply emi?",
          "EMI options",
          "EMI loan",
          "EMI options",
          "EMI",
        ];
        var greetings_response = ["Hello", "Nice to meet you"];
        var job = [
          "what can you do for me?",
          "what can you do for me",
          "what can you do",
          "what can you do?",
        ];

        // New question-answer pairs
        var availability = [
          "how can I check the availability?",
          "is my bike available?",
          "bike availability",
        ];
        var emi_query = [
          "how can I get my Royal Enfield bike on EMI?",
          "EMI options",
          "bike EMI",
        ];
        var apply_emi = [
          "how can I apply for an EMI loan?",
          "apply EMI loan",
          "EMI loan application",
        ];
        var contact_query = [
          "how to contact?",
          "contact details",
          "how do I contact?",
        ];

        if (query) {
          // Respond to greetings
          if (greetings.indexOf(query.toLowerCase()) != -1) {
            var item =
              greetings_response[
                Math.floor(Math.random() * greetings_response.length)
              ];
            var a = this.createText(item);
            this.reply(a);

            // Respond to EMI-related queries
          } else if (emi.indexOf(query.toLowerCase()) != -1) {
            var a = this.createText(
              "You can apply for an EMI loan at your nearest dealership or through our online platform."
            );
            this.reply(a);
          } else if (emi_query.indexOf(query.toLowerCase()) != -1) {
            var a = this.createText(
              "You can easily get your Royal Enfield bike on EMI through our financing options."
            );
            this.reply(a);

            // Respond to availability check questions
          } else if (availability.indexOf(query.toLowerCase()) != -1) {
            var a = this.createText(
              "To check the availability of your desired model, you can visit the nearest dealership or check online."
            );
            this.reply(a);

            // Respond to applying for EMI loan
          } else if (apply_emi.indexOf(query.toLowerCase()) != -1) {
            var a = this.createText(
              "You can apply for an EMI loan at your nearest dealership or through our online platform."
            );
            this.reply(a);

            // Respond to contact queries
          } else if (contact_query.indexOf(query.toLowerCase()) != -1) {
            var a = this.createText(
              "You can call our customer support team at [989984746] for any assistance."
            );
            this.reply(a);

            // Handle unknown queries
          } else if (query.toLowerCase().match(/what.*you.*do/g)) {
            var a = this.createText(
              "How can I get my Royal Enfield bike on EMI?"
            );
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
            justifyContent: "Start",
          });
          ans.addStyleClass("chat1");
          ans.addStyleClass("sapUiSizeCompact");
          fBox.addItem(ans);
          fBox.addStyleClass("sapUiSmallMarginTop");
          sap.ui.getCore().byId("chat").addItem(fBox);
        } else {
          var fBox = new sap.m.FlexBox({
            alignItems: "Start",
            justifyContent: "Start",
          });
          var text = new sap.m.Text({
            text: "Did not recognize you. Come again",
          });
          text.addStyleClass("chat1");
          fBox.addItem(text);
          fBox.addStyleClass("sapUiSmallMarginTop");
          sap.ui.getCore().byId("chat").addItem(fBox);
        }
        $("#pop-cont").scrollTop(
          $("#pop-cont")[0].scrollHeight - $("#pop-cont").height()
        );
      },
      onClear: function (oEvent) {
        sap.ui.getCore().byId("chat").removeAllItems();
      },
      onScroll: function () {
        $("#pop-cont").scrollTop(
          $("#pop-cont")[0].scrollHeight - $("#pop-cont").height()
        );
      },
      createText: function (text) {
        var text = new sap.m.Text({
          text: text,
        });
        return text;
      },
      buttonPress: function (btext) {
        var that = this;
        var naughty = [
          "I just did.\n I was being naughty by giving you the option of being naughty :D",
          "You should not ask for that ;)",
          "Its rude to ask for it",
          "Gotcha :P ",
          "That was a character test, you failed",
        ];
        var btext = btext.toLowerCase();
        if (btext.match(/show.*ques/g)) {
          var Input = new sap.m.Input({
            submit: function (oEvent) {
              that.onTestPress(oEvent, oEvent.getParameter("value"));
            },
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
            },
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
          },
        });
        link.addStyleClass("sapUiSmallMarginTop");
        return link;
      },
    });
  }
);
