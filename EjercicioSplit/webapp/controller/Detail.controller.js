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

		return Controller.extend("EjercicioSplit.EjercicioSplit.controller.Detail", {
			onInit: function () {
                this.loadModel();
            },
            
            loadModel: async function() {
                let oComponent = this.getOwnerComponent();

                const oResponse = await Services.getLocalJSON("Productos.json");
                const oData = oResponse[0];

                let oProductosModel = new JSONModel();
                oProductosModel.setData(oData);

                oComponent.setModel(oProductosModel, "ProductosModel");
            },

            onListItemPress: function(oEvent){
               /* let sProducts = oEvent.getSource().getSelectedItem().getBindingContext("ProductosModel").getPath();
                let oModel = this.getOwnerComponent().getModel("ProductosModel");

                let oSelectProducts = oModel.getProperty(sProducts);

                let oModelProduct = new JSONModel(oSelectProducts);

                this.getOwnerComponent().setModel(oModelProduct, "SeleccionModel"); */
                var oItem = oEvent.getSource();
                let oBindingContext = oEvent.getSource().getSelectedItem().getBindingContext("ProductosModel");
                let oModel = this.getView().getModel("ProductosModel");

                var oSelectProducts = oModel.getProperty(oBindingContext.getPath());

                let oModelProductSelec = new JSONModel(oSelectProducts);
                this.getOwnerComponent().setModel(oModelProductSelec, "SeleccionModel");
                console.log(oSelectProducts);


            }
		});
	});