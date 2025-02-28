sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/BusyDialog",
    "sap/ui/core/HTML",
  ],
  (Controller, History, BusyDialog, HTML) => {
    "use strict";
    var onBusyDataDialog = new BusyDialog({
      title: "DATA LOADING",
      text: "Please wait.......",
    });
    return Controller.extend("ns.royalenfield.controller.RETestRide", {
      onInit: function () {
        
        this._selectedBikeHandler = null;
        this._bikeModel = new sap.ui.model.json.JSONModel({
            selectedBike: {} // Holds the current bike's dynamic data
        });
        this.getView().setModel(this._bikeModel);
    
        onBusyDataDialog.open();
        setTimeout(() => {
          onBusyDataDialog.close();
        }, 2000);
      },
      onbackRoyalEnfield: function () {
        const oHistory = History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("overview", {}, true);
        }
      },
      onNavBike1: function () {
        console.log("customer button clicked!");
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        var bike = "Bear 650";
        oRouter.navTo("bikeForm", {
          bike: bike,
        });
        this.BikeDetailsDialog.close();
      },
      onNavBike2: function () {
        console.log("customer button clicked!");
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        var bike = "Classic 350";
        oRouter.navTo("bikeForm", {
          bike: bike,
        });
        this.BikeDetailsDialog.close();
      },
      onNavBike3: function () {
        console.log("customer button clicked!");
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        var bike = "Guerrilla 450";
        oRouter.navTo("bikeForm", {
          bike: bike,
        });
        this.BikeDetailsDialog.close();
      },
      onNavBike4: function () {
        console.log("customer button clicked!");
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        var bike = "Hunter 350";
        oRouter.navTo("bikeForm", {
          bike: bike,
        });
        this.BikeDetailsDialog.close();
      },
      onNavBike5: function () {
        console.log("customer button clicked!");
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        var bike = "Scram 411";
        oRouter.navTo("bikeForm", {
          bike: bike,
        });
        this.BikeDetailsDialog.close();
      },
      onNavBike6: function () {
        console.log("customer button clicked!");
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        var bike = "Meteor 350";
        oRouter.navTo("bikeForm", {
          bike: bike,
        });
        this.BikeDetailsDialog.close();
      },
      onNavBike7: function () {
        console.log("customer button clicked!");
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        var bike = "Interceptor 650";
        oRouter.navTo("bikeForm", {
          bike: bike,
        });
        this.BikeDetailsDialog.close();
      },
      onNavBike8: function () {
        console.log("customer button clicked!");
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        var bike = "Continental GT 650";
        oRouter.navTo("bikeForm", {
          bike: bike,
        });
        this.BikeDetailsDialog.close();
      },
      onNavBike9: function () {
        console.log("customer button clicked!");
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        var bike = "Shotgun 650";
        oRouter.navTo("bikeForm", {
          bike: bike,
        });
        this.BikeDetailsDialog.close();
      },
      onNavBike10: function () {
        console.log("customer button clicked!");
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        var bike = "Himalayan";
        oRouter.navTo("bikeForm", {
          bike: bike,
        });
        this.BikeDetailsDialog.close();
      },
      onNavBike11: function () {
        console.log("customer button clicked!");
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        var bike = "Bullet 350";
        oRouter.navTo("bikeForm", {
          bike: bike,
        });
        this.BikeDetailsDialog.close();
      },
      onNavBike12: function () {
        console.log("customer button clicked!");
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        var bike = "Super Meteor 650";
        oRouter.navTo("bikeForm", {
          bike: bike,
        });
        this.BikeDetailsDialog.close();
      },

      onNavBike1Fragment: function () {
        console.log("before")
        const bikeDetails = {
            title: "Royal Enfield Bear 650",
            description: "Experience the perfect blend of power, style, and adventure with the Royal Enfield Bear 650. Rugged \n and classic design with premium finishes.",
            engine: "648cc parallel-twin engine delivering 47 bhp and 52 Nm of torque.",
            features: {
                abs: "Dual-channel ABS for superior braking performance.",
                lighting: "LED lighting for enhanced visibility.",
                display: "Retro twin-pod instrument cluster with digital display.",
                tires: "Tubeless tires for better safety and handling."
            },
            suspension: "Upside-down front forks and twin rear gas-charged shock absorbers.",
            fuelCapacity: "15 liters for extended touring range.",
            colors: ["Black", "Red", "Silver"],
            price: "Starting at ₹3.5 Lakhs (ex-showroom).",
            callToAction: "!!! Book your test ride today to experience adventure like never before !!!"
        };
        
    

        this._openDialog(this.onNavBike1,bikeDetails);

    
      },
      _openDialog: function (handler,bikeDetails) {
        this._selectedBikeHandler = handler;
        console.log("after")
        this._bikeModel.setProperty("/selectedBike", bikeDetails);

        if (!this.BikeDetailsDialog) {
          this.BikeDetailsDialog = sap.ui.xmlfragment(
            "ns.royalenfield.fragment.BikeDetails",
            this
          );
          this.getView().addDependent(this.BikeDetailsDialog);
        }
        this.BikeDetailsDialog.open();
      },
      onDialogSubmit: function () {
        if (this._selectedBikeHandler) {
          this._selectedBikeHandler();
        }
        this._bikeDialog.close();
      },

      onNavBike2Fragment: function () {
        this._openDialog(this.onNavBike2);
        const bikeDetails = {
            title: "Royal Enfield Classic 350",
            description: "The Royal Enfield Classic 350 is a timeless blend of vintage design and moderntechnology. It offers \n a smooth ride with a powerful engine.",
            engine: "349cc single-cylinder, air-cooled engine producing 20.2 bhp and 27 Nm of torque.",
            features: {
                abs: "Single-channel ABS for enhanced braking safety.",
                lighting: "Halogen headlamp with LED tail lamp for improved visibility.",
                display: "Analog-digital hybrid instrument cluster with trip meter and fuel gauge.",
                tires: "Pirelli tires providing superior grip and durability."
            },
            suspension: "Telescopic front forks and twin rear shock absorbers for a smooth ride.",
            fuelCapacity: "13.5 liters for sufficient fuel range on long trips.",
            colors: ["Matte Black", "Chrome", "Gunmetal Grey", "Dark Green"],
            price: "Starting at ₹1.9 Lakhs (ex-showroom).",
            callToAction: "!!! Book your test ride today to experience adventure like never before !!!"
        };
        this._openDialog(this.onNavBike2,bikeDetails);
        
      },
      onNavBike3Fragment: function () {
        const bikeDetails = {
            title: "Royal Enfield Guerrilla 450",
            description: "The Royal Enfield Guerrilla 450 is a rugged and adventurous motorcycle built for off-road enthusiasts. \n With a powerful engine and durable components.",
            engine: "449cc single-cylinder, liquid-cooled engine delivering 35 bhp and 40 Nm of torque.",
            features: {
                abs: "Dual-channel ABS for superior braking performance in off-road conditions.",
                lighting: "LED headlights and tail lamp for enhanced visibility and rugged aesthetics.",
                display: "Digital instrument cluster with navigation, trip meter, and fuel gauge.",
                tires: "High-performance off-road tires with deep treads for optimal grip on uneven surfaces."
            },
            suspension: "Long-travel front suspension and twin rear shock absorbers for excellent off-road capability.",
            fuelCapacity: "17 liters, ideal for long-distance exploration.",
            colors: ["Matte Army Green", "Stealth Black", "Desert Tan"],
            price: "Starting at ₹4.5 Lakhs (ex-showroom).",
            callToAction: "!!! Book your test ride today to experience adventure like never before !!!"
        };
        
        this._openDialog(this.onNavBike3,bikeDetails); 
      },
      onNavBike4Fragment: function () {
        const bikeDetails = {
            title: "Royal Enfield Hunter 350",
            description: "The Royal Enfield Hunter 350 is built for the modern-day explorer, offering a blend of classic styling \n with enhanced agility and performance. It's the perfect companion for urban streets and weekend getaways.",
            engine: "349cc air-cooled, single-cylinder engine delivering 20 bhp and 27 Nm of torque.",
            features: {
                abs: "Single-channel ABS for confident braking in urban environments.",
                lighting: "Retro-style halogen headlamp with modern LED tail light for improved visibility.",
                display: "Analog-digital instrument cluster with trip meter, fuel gauge, and speedometer.",
                tires: "Modern dual-purpose tires that strike a balance between city commuting and light off-road usage."
            },
            suspension: "Telescopic front forks and twin shock absorbers at the rear for a smooth ride on varying \n surfaces.",
            fuelCapacity: "15 liters, providing ample range for city commuting and short trips.",
            colors: ["Matte Grey", "Rebel Blue", "Silver", "Black"],
            price: "Starting at ₹2.0 Lakhs (ex-showroom).",
            callToAction: "!!! Book your test ride today to experience adventure like never before !!!"
        };
        
        this._openDialog(this.onNavBike4,bikeDetails); 
      },
      onNavBike5Fragment: function () {
        const bikeDetails = {
            title: "Royal Enfield Scram 411",
            description: "The Royal Enfield Scram 411 is a rugged, versatile motorcycle designed for off-road enthusiasts. With its \n adventure-ready capabilities and modern features, it's perfect for riders who want to explore the unbeaten paths.",
            engine: "411cc air-cooled, single-cylinder engine delivering 24.3 bhp and 32 Nm of torque.",
            features: {
                abs: "Dual-channel ABS for superior control on all terrains.",
                lighting: "LED headlamp and tail light for enhanced visibility in any conditions.",
                display: "Modern digital-analog instrument cluster with navigation and trip information.",
                tires: "Dual-sport tires designed for both on-road comfort and off-road durability."
            },
            suspension: "Long-travel front forks and monoshock rear suspension for a comfortable and stable ride \n on rough terrains.",
            fuelCapacity: "15 liters for extended range on off-road adventures.",
            colors: ["Graphite", "Ranger Green", "Blazing Black"],
            price: "Starting at ₹2.10 Lakhs (ex-showroom).",
            callToAction: "!!! Book your test ride today to experience adventure like never before !!!"
        };
        
        this._openDialog(this.onNavBike5,bikeDetails); 
      },
      onNavBike6Fragment: function () {
        const bikeDetails = {
            title: "Royal Enfield Meteor 350",
            description: "The Royal Enfield Meteor 350 is a stylish cruiser designed for long-distance comfort. With its relaxed \n riding posture and advanced technology, it offers a smooth and comfortable ride.",
            engine: "349cc air-oil cooled, single-cylinder engine delivering 20.2 bhp and 27 Nm of torque.",
            features: {
                abs: "Dual-channel ABS for safer braking performance.",
                lighting: "Halo LED headlamp for enhanced visibility and modern aesthetics.",
                display: "Tripper Navigation pod to guide you to your destination with ease.",
                tires: "Bias-ply tires for comfort and stability on both city roads and highways."
            },
            suspension: "Telescopic front forks and twin gas-charged shock absorbers for a smooth and stable ride.",
            fuelCapacity: "15 liters for long cruising ranges on highways.",
            colors: ["Fireball Red", "Fireball Yellow", "Stellar Black", "Stellar Blue"],
            price: "Starting at ₹1.98 Lakhs (ex-showroom).",
            callToAction: "!!! Book your test ride today to experience adventure like never before !!!"
        };
        
        this._openDialog(this.onNavBike6,bikeDetails); 
      },
      onNavBike7Fragment: function () {
        const bikeDetails = {
            title: "Royal Enfield Interceptor 650",
            description: "The Royal Enfield Interceptor 650 combines modern performance with classic styling. This powerful \n and versatile bike offers a blend of comfort, power, and agility.",
            engine: "648cc parallel-twin engine delivering 47 bhp and 52 Nm of torque.",
            features: {
                abs: "Dual-channel ABS for confident braking performance in all conditions.",
                lighting: "LED headlamp and tail lamp for superior visibility and a contemporary look.",
                display: "Retro-styled analog instrument cluster with modern digital features.",
                tires: "Pirelli Sport Demon tires for excellent grip and handling."
            },
            suspension: "Front and rear twin-shock suspension system providing a balanced ride.",
            fuelCapacity: "13.7 liters for longer riding ranges on highways and city roads.",
            colors: ["Orange Crush", "Mark 2", "Silver", "Black", "Grey"],
            price: "Starting at ₹3.25 Lakhs (ex-showroom).",
            callToAction: "!!! Book your test ride today to experience adventure like never before !!!"
        };
        
        this._openDialog(this.onNavBike7,bikeDetails); 
      },
      onNavBike8Fragment: function () {
        const bikeDetails = {
            title: "Royal Enfield Continental GT 650",
            description: "The Royal Enfield Continental GT 650 is a cafe racer-inspired motorcycle, combining classic retro styling \n with modern performance. Its agile handling and sporty design make it perfect.",
            engine: "648cc parallel-twin engine delivering 47 bhp and 52 Nm of torque.",
            features: {
                abs: "Dual-channel ABS for enhanced braking performance and rider confidence.",
                lighting: "LED tail lamp and headlamp for improved visibility and a bold look.",
                display: "Analog instrument cluster with a modern digital display for convenience.",
                tires: "Pirelli Sport Demon tires for excellent grip and superior handling."
            },
            suspension: "Front and rear twin-shock suspension system, designed for both comfort and \n performance.",
            fuelCapacity: "12.5 liters, providing a great range for both urban and long-distance rides.",
            colors: ["Duke Blue", "Black", "Red", "Silver", "Orange"],
            price: "Starting at ₹3.15 Lakhs (ex-showroom).",
            callToAction: "!!! Book your test ride today to experience adventure like never before !!!"
        };
        
        this._openDialog(this.onNavBike8,bikeDetails); 
      },
      onNavBike9Fragment: function () {
        const bikeDetails = {
            title: "Royal Enfield Shotgun 650",
            description: "The Royal Enfield Shotgun 650 is a rugged and powerful cruiser with a bold design that combines modern \n performance and retro aesthetics. Its commanding presence and high-performance engine make it perfect \n for riders",
            engine: "648cc parallel-twin engine delivering 47 bhp and 52 Nm of torque.",
            features: {
                abs: "Dual-channel ABS for superior control and safety.",
                lighting: "LED lighting for better visibility and a contemporary look.",
                display: "Retro-styled instrument cluster with modern digital features.",
                tires: "Pirelli tires offering superior grip and handling on all terrains."
            },
            suspension: "Upside-down front forks and twin gas-charged shock absorbers for excellent ride comfort.",
            fuelCapacity: "15 liters for long-range touring and adventure-ready capabilities.",
            colors: ["Matte Black", "Dark Grey", "Desert Sand"],
            price: "Starting at ₹3.3 Lakhs (ex-showroom).",
            callToAction: "!!! Book your test ride today to experience adventure like never before !!!"
        };
        
        this._openDialog(this.onNavBike9,bikeDetails); 
      },
      onNavBike10Fragment: function () {
        const bikeDetails = {
            title: "Royal Enfield Himalayan",
            description: "The Royal Enfield Himalayan is built for adventure with a rugged design that can handle the toughest terrains. \n It’s the ideal motorcycle for riders who seek both on-road comfort and off-road prowess.",
            engine: "411cc single-cylinder engine delivering 24.3 bhp and 32 Nm of torque.",
            features: {
                abs: "Dual-channel ABS for better braking performance on any surface.",
                lighting: "Halogen headlamp with LED DRLs for better visibility in all conditions.",
                display: "Digital instrument cluster with altimeter and compass, designed for adventure touring.",
                tires: "Dual-purpose tires for excellent grip on both paved and off-road trails."
            },
            suspension: "Long-travel telescopic front forks and twin rear shock absorbers designed for comfort on rugged roads.",
            fuelCapacity: "15 liters to keep you going on long adventures without worrying about refueling.",
            colors: ["Snow", "Rock Red", "Gravel Grey"],
            price: "Starting at ₹2.1 Lakhs (ex-showroom).",
            callToAction: "!!! Book your test ride today to experience adventure like never before !!!"
        };
        
        this._openDialog(this.onNavBike10,bikeDetails); 
      },
      onNavBike11Fragment: function () {
        const bikeDetails = {
            title: "Royal Enfield Bullet 350",
            description: "The Royal Enfield Bullet 350 is a timeless classic that captures the essence of a true motorcycle. With its \n iconic design and reliable engine, it offers the perfect combination of power and simplicity.",
            engine: "349cc single-cylinder engine delivering 19.3 bhp and 28 Nm of torque.",
            features: {
                abs: "Single-channel ABS for enhanced safety and control.",
                lighting: "Halogen headlamp with LED indicators for better visibility.",
                display: "Analog speedometer with a classic design, keeping the retro spirit alive.",
                tires: "Spoke wheels with tube-type tires, providing that classic look and feel."
            },
            suspension: "Telescopic front forks and twin shock absorbers at the rear for a smooth ride.",
            fuelCapacity: "13.5 liters for longer rides, ensuring you stay on the road for longer.",
            colors: ["Black", "Silver", "Maroon"],
            price: "Starting at ₹1.65 Lakhs (ex-showroom).",
            callToAction: "!!! Book your test ride today to experience adventure like never before !!!"
        };
        
        this._openDialog(this.onNavBike11,bikeDetails); 
      },
      onNavBike12Fragment: function () {
        const bikeDetails = {
            title: "Royal Enfield Super Meteor 650",
            description: "The Royal Enfield Super Meteor 650 is built for long-distance cruising with power, comfort, and style. With its \n 650cc parallel twin engine, it offers a refined and thrilling ride.",
            engine: "648cc parallel-twin engine delivering 47 bhp and 52 Nm of torque.",
            features: {
                abs: "Dual-channel ABS for superior braking performance.",
                lighting: "LED lighting for enhanced visibility and modern aesthetics.",
                display: "Large analog-digital hybrid instrument cluster with advanced features.",
                tires: "Pirelli tires for better grip and road handling."
            },
            suspension: "Upside-down front forks and twin gas-charged shock absorbers at the rear for maximum comfort and stability.",
            fuelCapacity: "15.5 liters for extended touring range with a refined fuel delivery system.",
            colors: ["Astral Black", "Astral Blue", "Astral Green", "Interstellar Grey"],
            price: "Starting at ₹3.75 Lakhs (ex-showroom).",
            callToAction: "!!! Book your test ride today to experience adventure like never before !!!"
        };
        
        this._openDialog(this.onNavBike12,bikeDetails); 
      },
      onCloseFeedback: function () {
        this.BikeDetailsDialog.close();
      },
    });
  }
);
