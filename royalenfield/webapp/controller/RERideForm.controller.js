sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History"


], (Controller,JSONModel,MessageToast,History) => {
    "use strict";
    var selectedItem;
    return Controller.extend("ns.royalenfield.controller.RERideForm", {
        onInit: function () {
                // Attach route matcher for the 'bikeForm' route
                console.log("hI")
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("bikeForm").attachMatched(this.onObjectMatched, this);
            },

            onbackToTestRide(){
                
                const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {}, true);
			}
            },

            onObjectMatched: function (oEvent) {
                
                var oArgs = oEvent.getParameter("arguments");
                selectedItem = oArgs.bike; // Retrieve the 'bike' parameter from the route
                console.log(selectedItem)

                var bikesData = {
                    "bikes": [
                        {
                            "title": "Bear 650",
                            "engine": "648cc parallel-twin engine delivering 47 bhp and 52 Nm of torque",
                            "price": "₹3.5 Lakhs (ex-showroom)",
                            "colors": ["Black", "Red", "Silver"]
                        },
                        {
                            "title": "Classic 350",
                            "engine": "349cc single-cylinder, air-cooled engine producing 20.2 bhp and 27 Nm of torque",
                            "price": "₹1.9 Lakhs (ex-showroom)",
                            "colors": ["Matte Black", "Chrome", "Gunmetal Grey", "Dark Green"]
                        },
                        {
                            "title": "Guerrilla 450",
                            "engine": "449cc single-cylinder, liquid-cooled engine delivering 35 bhp and 40 Nm of torque",
                            "price": "₹4.5 Lakhs (ex-showroom)",
                            "colors": ["Matte Army Green", "Stealth Black", "Desert Tan"]
                        },
                        {
                            "title": "Hunter 350",
                            "engine": "349cc air-cooled, single-cylinder engine delivering 20 bhp and 27 Nm of torque",
                            "price": "₹2.0 Lakhs (ex-showroom)",
                            "colors": ["Matte Grey", "Rebel Blue", "Silver", "Black"]
                        },
                        {
                            "title": "Scram 411",
                            "engine": "411cc single-cylinder, air-cooled engine delivering 24.3 bhp and 32 Nm of torque",
                            "price": "₹2.1 Lakhs (ex-showroom)",
                            "colors": ["White Flame", "Silver Spirit", "Blazing Black"]
                        },
                        {
                            "title": "Meteor 350",
                            "engine": "349cc air-cooled, single-cylinder engine producing 20.2 bhp and 27 Nm of torque",
                            "price": "₹2.2 Lakhs (ex-showroom)",
                            "colors": ["Fireball Yellow", "Fireball Red", "Stellar Blue"]
                        },
                        {
                            "title": "Interceptor 650",
                            "engine": "648cc parallel-twin engine delivering 47 bhp and 52 Nm of torque",
                            "price": "₹3.2 Lakhs (ex-showroom)",
                            "colors": ["Mark Three", "Orange Crush", "Ravishing Red"]
                        },
                        {
                            "title": "Continental GT 650",
                            "engine": "648cc parallel-twin engine delivering 47 bhp and 52 Nm of torque",
                            "price": "₹3.3 Lakhs (ex-showroom)",
                            "colors": ["Rockers Red", "Dux Deluxe", "Ventura Storm"]
                        },
                        {
                            "title": "Shotgun 650",
                            "engine": "648cc parallel-twin engine delivering 47 bhp and 52 Nm of torque",
                            "price": "₹3.6 Lakhs (ex-showroom)",
                            "colors": ["Dark Knight", "Stealth Grey", "Bullet Silver"]
                        },
                        {
                            "title": "Himalayan",
                            "engine": "411cc single-cylinder, air-cooled engine delivering 24.3 bhp and 32 Nm of torque",
                            "price": "₹2.15 Lakhs (ex-showroom)",
                            "colors": ["Snow White", "Granite Black", "Lake Blue"]
                        },
                        {
                            "title": "Bullet 350",
                            "engine": "346cc single-cylinder, air-cooled engine producing 19.1 bhp and 28 Nm of torque",
                            "price": "₹1.5 Lakhs (ex-showroom)",
                            "colors": ["Black", "Forest Green", "Royal Red"]
                        },
                        {
                            "title": "Super Meteor 650",
                            "engine": "648cc parallel-twin engine delivering 47 bhp and 52 Nm of torque",
                            "price": "₹4.0 Lakhs (ex-showroom)",
                            "colors": ["Astral Black", "Celestial Blue", "Interstellar Green"]
                        }
                    ]
                };
    
                // Find the selected bike from the JSON data
                var selectedBike = bikesData.bikes.find(bike => bike.title === selectedItem);
                if (selectedBike) {
                    var oModel1 = new JSONModel(selectedBike);
                    console.log("hai da bikekae",oModel1.getData())
                    this.getView().setModel(oModel1,"bikeModel");
                } else {
                    MessageToast.show("Bike not found");
                }
    
                // Check which bike is selected and call the respective method
                if (selectedItem === "Bear 650") {
                    this.bikeOne();
                } else if (selectedItem === "Classic 350"){
                    this.bikeTwo();
                }
                else if (selectedItem === "Guerrilla 450"){
                    this.bikeThree();
                }
                else if (selectedItem === "Hunter 350"){
                    this.bikeFour();
                }
                else if (selectedItem === "Scram 411"){
                    this.bikeFive();
                }
                else if (selectedItem === "Meteor 350"){
                    this.bikeSix();
                }
                else if (selectedItem === "Interceptor 650"){
                    this.bikeSeven();
                }
                else if (selectedItem === "Continental GT 650"){
                    this.bikeEight();
                }
                else if (selectedItem === "Shotgun 650"){
                    this.bikeNine();
                }
                else if (selectedItem === "Himalayan"){
                    this.bikeTen();
                }
                else if (selectedItem === "Bullet 350"){
                    this.bikeEleven();
                }
                else{
                    this.bikeTwelve();
    }
},

            bikeOne: function () {
                // Set the image for bike one
                var oModel = new JSONModel({
                    dynamicImageSrc: "https://www.royalenfield.com/content/dam/royal-enfield/motorcycles/bear-650/book-a-test-ride/bear-650-300x210.png",
                    textda: "Bear 650"
                });
                this.getView().setModel(oModel);   
            },

            bikeTwo: function () {
                  
                var oModel = new JSONModel({
                    dynamicImageSrc: "https://www.royalenfield.com/content/dam/royal-enfield/motorcycles/new-classic-350/book-a-test-ride/book-a-test-ride-300x210.png",
                    textda: "Classic 350"
                });
                this.getView().setModel(oModel);   
            },
            bikeThree: function () {
                  
                var oModel = new JSONModel({
                    dynamicImageSrc: "https://www.royalenfield.com/content/dam/royal-enfield/motorcycles/guerrilla-450/studio-shots/new/yellow-ribbon/yellow-ribbon-000.webp",
                    textda: "Guerrilla 450"
                });
                this.getView().setModel(oModel);   
            },
            bikeFour: function () {
                  
                var oModel = new JSONModel({
                    dynamicImageSrc: "https://www.royalenfield.com/content/dam/royal-enfield/shotgun-650/book-a-test-ride/book-a-test-ride-300x210.png",
                    textda: "Hunter 350"
                });
                this.getView().setModel(oModel);   
            },
            bikeFive: function () {
                  
                var oModel = new JSONModel({
                    dynamicImageSrc: "https://www.royalenfield.com/content/dam/royal-enfield/india/motorcycles/book-a-test-ride/ga-book-test-ride/thumbnail/royal-enfield-scram-11-300x210.png",
                    textda: "Scram 411"
                });
                this.getView().setModel(oModel);   
            },
            bikeSix: function () {
                  
                var oModel = new JSONModel({
                    dynamicImageSrc: "https://www.royalenfield.com/content/dam/royal-enfield/motorcycles/meteor-350/thumbnail/meteor-300x210.png",
                    textda: "Meteor 350"
                });
                this.getView().setModel(oModel);   
            },
            bikeSeven: function () {
                
                var oModel = new JSONModel({
                    dynamicImageSrc: "https://www.royalenfield.com/content/dam/royal-enfield/india/motorcycles/interceptor/new/interceptor-book-a-test-ride-300x210.png",
                    textda: "Interceptor 650"
                });
                this.getView().setModel(oModel);   
            },
            bikeEight: function () {
                  
                var oModel = new JSONModel({
                    dynamicImageSrc: "https://www.royalenfield.com/content/dam/royal-enfield/india/motorcycles/continental-gt/new/continental-gt-book-a-test-ride-300x210.png",
                    textda: "Continental GT 650"
                });
                this.getView().setModel(oModel);   
            },
            bikeNine: function () {
                  
                var oModel = new JSONModel({
                    dynamicImageSrc: "https://www.royalenfield.com/content/dam/royal-enfield/shotgun-650/book-a-test-ride/book-a-test-ride-300x210.png",
                    textda: "Shotgun 650"
                });
                this.getView().setModel(oModel);   
            },
            bikeTen: function () {
                  
                var oModel = new JSONModel({
                    dynamicImageSrc: "https://www.royalenfield.com/content/dam/royal-enfield/motorcycles/himalayan/colors/studio-shots/webp/kaza-brown/kaza_brown_000.webp",
                    textda: "Himalayan"
                });
                this.getView().setModel(oModel);   
            },
            bikeEleven: function () {
                  
                var oModel = new JSONModel({
                    dynamicImageSrc: "https://www.royalenfield.com/content/dam/royal-enfield/bullet/bullet-350-300x210.png",
                    textda: "Bullet 350"
                });
                this.getView().setModel(oModel);   
            },
            bikeTwelve: function () {
                  
                var oModel = new JSONModel({
                    dynamicImageSrc: "https://www.royalenfield.com/content/dam/royal-enfield/super-meteor-650/motorcycles/forms/book-test-ride-300x210.png",
                    textda: "Super Meteor 650"
                });
                this.getView().setModel(oModel);   
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
        input.setValueStateText("Invalid Mobile Number. Please enter a 10-digit number.");
    } else {
        input.setValueState("None");
        input.setValueStateText("");
    }
},

//onEmailChange

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

            onFirstNameChange: function (oEvent) {
                var input = oEvent.getSource();
                var inputValue = input.getValue();
     
                if (!inputValue) {
                    input.setValueState("Error");
                    input.setValueStateText("Name should not be empty");
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
            
                // Validate Email
                var emailInput = this.getView().byId("email");
                emailInput.fireChange(); // Trigger validation for Email
                if (emailInput.getValueState() === "Error") {
                    isValid = false;
                    errorMessages.push(emailInput.getValueStateText());
                }
            
                // Validate Mobile Number
                var mobileInput = this.getView().byId("mobileNumber");
                mobileInput.fireChange(); // Trigger validation for Mobile Number
                if (mobileInput.getValueState() === "Error") {
                    isValid = false;
                    errorMessages.push(mobileInput.getValueStateText());
                }
            
                // Check if all fields are valid
                if (isValid) {
                    // Generate a unique ID
                    function generateUUID() {
                        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                            var r = (Math.random() * 16) | 0,
                                v = c === 'x' ? r : (r & 0x3) | 0x8;
                            return v.toString(16);
                        });
                    }
            
                    // Prepare data to save
                    var oEntry = {
                        id: generateUUID(),
                        firstName: firstNameInput.getValue(),
                        lastName: this.getView().byId("lastName").getValue(),
                        emailId: emailInput.getValue(),
                        mobileNumber: mobileInput.getValue(),
                        pincode: this.getView().byId("pincode").getValue(),
                        bikeName: selectedItem
                    };
            
                    // Save data using OData model
                    var oModel = this.getView().getModel("samp");
                    oModel.create("/BookTestRide", oEntry, {
                        method: "POST",
                        success: function () {
                            MessageToast.show("Test ride is booked successfully!");
                        },
                        error: function () {
                            MessageToast.show("Error occurred while booking the test ride.");
                        }
                    });
            
                    // Clear input fields after successful save
                    firstNameInput.setValue("");
                    this.getView().byId("lastName").setValue("");
                    emailInput.setValue("");
                    mobileInput.setValue("");
                    this.getView().byId("pincode").setValue("");
                } else {
                    // Show error messages in a toast
                    MessageToast.show("Please fix the following errors:\n" + errorMessages.join("\n"));
                }
            }
            
        });
    });
