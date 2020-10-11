// ==UserScript==
// @name         vehicleTypeName
// @namespace    http:///
// @version      1.1
// @description  Add the vehicle type name to the available vehicle list.
// @author       MisteryMan
// @match        *://*.meldkamerspel.com/missions/*
// @match        *://meldkamerspel.com/missions/*
// @match        *://*.missionchief.com/missions/*
// @match        *://missionchief.com/missions/*
// @match        *://*.missionchief.co.uk/missions/*
// @match        *://missionchief.co.uk/missions/*
// @grant        none
// ==/UserScript==

(function() {
    /* Configuration
    Use the below settings to adjust for the color of the text to your liking.
    the website "https://htmlcolorcodes.com/" can be used to figure out the
    color code you like.
    */
    var lightColor = "#E20000"; // Color for light/standard theme
    var darkColor = "#FF0000"; // Color for dark theme
    
    // DO NOT ADJUST ANYTHING BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING!
    // YOU HAVE BEEN WARNED!
    
    if ($("body").hasClass("dark")) { var fontColor = darkColor; }
    else { var fontColor = lightColor; }
   
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
                vehicleChildren[2].firstElementChild.innerHTML = innerHTML + "<span id='vehicleTypeText_" + vehicleID + "' style='color: " + fontColor + "; font-size: small' class='pull-right'>(" + vehicleType + ")</span>";
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
