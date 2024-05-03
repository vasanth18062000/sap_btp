/*global QUnit*/

sap.ui.define([
	"ns/proposalnew/controller/MainProposal.controller"
], function (Controller) {
	"use strict";

	QUnit.module("MainProposal Controller");

	QUnit.test("I should test the MainProposal controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
