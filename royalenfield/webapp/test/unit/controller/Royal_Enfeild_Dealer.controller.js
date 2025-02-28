/*global QUnit*/

sap.ui.define([
	"royaldealer_ui/controller/Royal_Enfeild_Dealer.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Royal_Enfeild_Dealer Controller");

	QUnit.test("I should test the Royal_Enfeild_Dealer controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
