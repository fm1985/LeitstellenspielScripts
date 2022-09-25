// ==UserScript==
// @name         missionPOICredits
// @namespace    http://www.leitstellenspiel-tutorial.ch/
// @version      0.2
// @description  Credits und POI Info, basierend auf den Scripts von BOS-Ernie und ViperAC, itsDreyter
// @author       firemaster1985
// @match        *.leitstellenspiel.de/missions/*
// @updateURL    https://www.leitstellenspiel-tutorial.ch/lss-scripts/missionPOICredits.js
// @downloadURL  https://www.leitstellenspiel-tutorial.ch/lss-scripts/missionPOICredits.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
     const missionID = $('#mission_help').attr('href').split('/')[2].split('?')[0];
     let mission_specs_cache = {};

    function getResponseText(credits, place) {
        var placeText;
        if (place === '') {
            placeText = '';
        } else {
            placeText = '| POI: ' + place;
        }

        if (credits === null) {
            return '??';
        } else if (credits >= 10000) {
            return `| Credits: ${credits} ${placeText}`;
        } else if (credits >= 7000) {
            return `| Credits: ${credits} ${placeText}`;
        } else if (credits >= 4000) {
            return `| Credits: ${credits} ${placeText}`;
        } else {
            return `| Credits: ${credits} ${placeText}`;
        }
    }

    async function output()
    {
        var missionPlace = mission_specs_cache.filter(e => e.id == missionID)[0].place;
        var missionCredits = mission_specs_cache.filter(e => e.id == missionID)[0].average_credits;
        var missionInfoText = getResponseText(missionCredits, missionPlace);
        missionInfoText && $('.mission_header_info .col-md-6:first-of-type>small').append(`${missionInfoText}`);

    }

    async function init()
    {
        if (!sessionStorage.getItem("mission_specs_cache")) {
            await $.getJSON(`https://www.leitstellenspiel.de/einsaetze.json`, data => {
                mission_specs_cache = data;
                sessionStorage.setItem("mission_specs_cache", JSON.stringify(data));
            });
        } else {
            mission_specs_cache = JSON.parse(sessionStorage.getItem("mission_specs_cache"));
        }
        output();
    }
    init();


})();


