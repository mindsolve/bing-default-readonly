// ==UserScript==
// @name         Bing for Work: Default to only viewing
// @namespace    https://github.com/mindsolve/
// @homepage     https://github.com/mindsolve/bing-default-readonly
// @source       https://github.com/mindsolve/bing-default-readonly
// @supportURL   https://github.com/mindsolve/bing-default-readonly/issues
// @downloadURL  https://raw.githubusercontent.com/mindsolve/bing-default-readonly/main/bing-default-readonly.user.js
// @version      0.1
// @description  Replaces links to documents in Bing for Work results with their read-only counterpart.
// @author       Felix E. <info@feli.ga>
// @match        https://www.bing.com/work/search*
// @grant        none
// @run-at       document-idle
// ==/UserScript==
//https://raw.githubusercontent.com/mindsolve/bing-default-readonly/main/README.md
(function() {
    'use strict';
    console.log("[bing-readonly] loaded.");

    var observer = new MutationObserver(function (mutations) {
        for (let mut of mutations) {

            for(let node of mut.addedNodes) {
                // we track only elements, skip other nodes (e.g. text nodes)
                if (!(node.innerHTML.includes("action=default"))) continue;

                // replace the default viewing action with "view" in all search results
                for (const link of node.getElementsByClassName("ms-Link")) {
                    link.href = link.href.replace("action=default", "action=View");
                    console.log('[bing-readonly] changed link on', node);
                }

            }
        }
    });

    observer.observe(document.getElementById('b_content'), {childList: true, subtree: true});
})();
