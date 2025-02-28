/*global QUnit*/

sap.ui.define([
	"ns/royalenfield/controller/RoyalEnfield.controller"
], function (Controller) {
	"use strict";

	QUnit.module("RoyalEnfield Controller");

	QUnit.test("I should test the RoyalEnfield controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
