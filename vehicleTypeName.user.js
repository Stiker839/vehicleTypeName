// ==UserScript==
// @name         vehicleTypeName
// @namespace    http:///
// @version      1.0
// @description  Add the vehicle type name to the available vehicle list.
// @author       MisteryMan
// @match        *://*.meldkamerspel.com/missions/*
// @match        *://meldkamerspel.com/missions/*
// @match        *://*.missionchief.com/missions/*
// @match        *://missionchief.com/missions/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    vehicleTypes();
    async function vehicleTypes() {
        var panels = $("tbody[id=vehicle_show_table_body_all]").children();
        for (var i = 0; i < panels.length; i++){
            var vehicleType = panels[i].getAttribute("vehicle_type");
            var vehicleChildren = panels[i].children;
            var innerHTML = vehicleChildren[2].firstElementChild.innerHTML;
            var vehicleID = vehicleChildren[0].firstElementChild.getAttribute("value");
            var searchParam = "#vehicleTypeText_" + vehicleID;
            if (!document.getElementById("vehicleTypeText_" + vehicleID)) {
                vehicleChildren[2].firstElementChild.innerHTML = innerHTML + "<span id='vehicleTypeText_" + vehicleID + "' style='color: #E20000; font-size: x-small' class='pull-right'>(" + vehicleType + ")</span>";
            }
        }
    };
    $('.missing_vehicles_load').click(function () {
        $(document).ajaxComplete(function () {
            let existCondition = setInterval(function () {
                if (!$('.missing_vehicles_load').is(":visible")) {
                    clearInterval(existCondition);
                    vehicleTypes();
                }
            });

        });
    });
})();