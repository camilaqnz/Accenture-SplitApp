sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "EjercicioSplit/EjercicioSplit/util/Services"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller, JSONModel, Services) {
		"use strict";

		return Controller.extend("EjercicioSplit.EjercicioSplit.controller.EjercicioMain", {
			onInit: function () {
                this.loadModel();
                this.getOwnerComponent().getRouter().getRoute("RouteEjercicioMain").attachPatternMatched(this._onRouteMatched, this);
            },
            
            loadModel: async function() {
                let oComponent = this.getOwnerComponent();

                const oResponse = await Services.getLocalJSON("Productos.json");
                const oData = oResponse[0];

                let oProductosModel = new JSONModel();
                oProductosModel.setData(oData);

                oComponent.setModel(oProductosModel, "ProductosModel");

                this.getOwnerComponent().getModel("ProductosModel").getProperty("/value/0");
            },

            // Me lleva de la master al detail
            _onRouteMatched: function (oEvent) {
                let oModel = this.getOwnerComponent().getModel("ProductosModel");
            },

            onListItemPress: function(oEvent){
                let sProducts = oEvent.getSource().getSelectedItem().getBindingContext("ProductosModel").getPath();
                let oModel = this.getOwnerComponent().getModel("ProductosModel");

                let oSelectProducts = oModel.getProperty(sProducts);

                let oModelProduct = new JSONModel(oSelectProducts);

                this.getOwnerComponent().setModel(oModelProduct, "SeleccionModel");

                this.getOwnerComponent().getRouter().navTo("RouteDetail");
            },


		});
	});
