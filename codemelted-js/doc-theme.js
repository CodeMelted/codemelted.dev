/**
 * @file Applies the codemelted.com website theme to the jsdoc produced API
 *  documentation for the module.  This file is added to the generated 
 *  documentation html files to update the theming and apply the appropriate
 *  navigation.
 * @license MIT / (c) 2021 Mark Shaffer. All Rights Reserved
 */
import "https://codemelted.com/js/index.js";
setTimeout(() => {
    let template = `
        <style>
            html, section {
                background: url("https://codemelted.com/images/bkg.png");
            }

            td, th {
                border: none;
            }

            table, tr {
                background: url("https://codemelted.com/images/bkg.png");
            }

            tr > th:last-child { border-right: none; }
            
            thead {
                border-bottom: 1px solid;
            }

            ul li {
                list-style-image: none;
            }

            nav ul a, nav ul a:visited, nav ul a:active {
                color: #7e7f8a;
            }

            .name code {
                color: #7e7f8a;
            }

            .details { border-left: none; }

            .source {
                width: 100%;
            }

            .source code {
                background-color: black;
                color: #7e7f8a;
            }
        </style>
    `;
    document.body.innerHTML = document.body.innerHTML + template;
});