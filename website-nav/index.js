/**
 * @file Applies a custom template over the Github Page README file after it
 *  is rendered providing a consistent look and the ability to navigate between
 *  module projects.
 * @copyright (c) 2020 Mark Shaffer. All Rights Reserved
 */
import "https://codemelted.dev/codemelted-js/src/codemelted-pwa.js";

// ----------------------------------------------------------------------------
// Common Data
const BASE_URL = "https://codemelted.dev";
const TAB_NAVIGATION = [
    { name: "Java Script" , url: `${BASE_URL}/codemelted-js/` , readme: "" },
];

// ----------------------------------------------------------------------------
// Apply our navigation template

// Our template to apply to the processed markdown
setTimeout(() => {
    const TITLE = "Melt the Code";
    const MARGIN_TOP = "65px";
    const NAV_TEMPLATE = 
        `
        <!-- Fixed Header -->
        <div id="divHeader" class="fixed-header">
            <div><a href="https://codemelted.dev" rel="noopener"><img src="https://codemelted.dev/website-nav/images/logo-242x48.png" alt="logo" /></a></div>
            <div id="divTabs" class="tab-container">
                <a class="tab-link"><img width="40px" height="40px" src="https://codemelted.dev/website-nav/images/icons8-javascript-48.png" alt="Progressive Web App" /></a>
            </div>  
            <div id="btnSearch" class="w3-icon"><i class="fa fa-search"></i></div>
        </div>
    
        <!-- Search Popup -->
        <div id="divSearch" class="w3-modal">
            <div class="w3-modal-content w3-animate-zoom">
                <div class="w3-container">
                    <span onclick="document.getElementById('divSearch').style.display='none'" class="w3-button w3-display-topright">&times;</span>
                    <h2 style="margin: 0;">Search</h2>
                    <hr style="margin: 0;" />  <br />
                    <div style="display: grid; grid-template-columns: 80% auto;">
                        <input id="txtSearch" type="search" placeholder="I can find it..." /> <button id="btnGo">Go</button>
                    </div>
                    <p>Results:</p>
                    <div id="divSearchResults" style="display: grid; grid-template-columns: auto auto;">
                    </div>
                    <br />
                </div>
            </div>
        </div>
        <!-- Fixed Footer -->
        <div id="divFooter" class="fixed-footer"> &copy; 2020 Mark Shaffer. All Rights Reserved. </div>
    
        <!-- Styles to apply -->
        <style> @import url("https://codemelted.dev/website-nav/css/index.css"); </style>
        `;

    const HEADER_TEMPLATE = `
        <hr style="margin: 0;" />
        <div style="text-align: center; padding: 0; margin: 0;"><img style="width: 100%; padding: 0;" src="https://codemelted.dev/website-nav/images/logo-593x100.png" alt="header logo" />
            <hr style="margin: 0; padding: 0;" />
            <div style='margin: 0; padding: 0; background-color: darkslategray'>
                <div style='text-align: center; background-color: darkslategray; display: grid; grid-template-columns: auto auto auto auto;'>
                    <a style='font-size: small; font-weight: bold; text-decoration: none;' href="https://blog.codemelted.dev" rel="noopener"><img width="48px" height="48px" src="https://codemelted.dev/website-nav/images/icons8-blog-48.png" alt="blog.codemelted.dev" /><br />Blog</a>
                    <a style='font-size: small; font-weight: bold; text-decoration: none;' href="https://codemelted.dev" rel="noopener"><img width="48px" height="48px" src="https://codemelted.dev/website-nav/images/icons8-code-48.png" alt="codemelted.dev" /><br />Code</a>
                    <a style='font-size: small; font-weight: bold; text-decoration: none;' href="https://jeeplife.codemelted.dev" rel="noopener"><img width="48px" height="48px" src="https://codemelted.dev/website-nav/images/jeep-life-logo.png" alt="jeeplife.codemelted.dev" /><br />Jeep Life</a>
                    <a style='font-size: small; font-weight: bold; text-decoration: none;' href="https://tech-info.codemelted.dev" rel="noopener"><img width="48px" height="48px" src="https://codemelted.dev/website-nav/images/icons8-computer-support-48.png" alt="tech-info.codemelted.dev" /><br />Tech Info</a>
                </div>
                <hr style='padding: 0; margin: 0;' />
                <div style='padding-top: 5px; padding-bottom: 5px; text-align: center; display: grid; grid-template-columns: auto auto auto auto;'>
                    <a href="https://github.com/CodeMelted/" rel="noopener"><img width="25px" height="25px" src="https://codemelted.dev/website-nav/images/github-icon.png" alt="Github Profile"/></a>
                    <a href="https://twitter.com/codemelted/" rel="noopener"><img width="25px" height="25px" src="https://codemelted.dev/website-nav/images/twitter-icon.png" alt="Twitter Profile"/></a>
                    <a href="https://www.youtube.com/channel/UChrf2GS6hyluDU3S5wGorcA" rel="noopener"><img width="30px" height="25px" src="https://codemelted.dev/website-nav/images/youtube-icon.png" alt="YouTube Channel"/></a>
                    <a href="mailto: mark.shaffer@codemelted.com" rel="noopener"><img width="25px" height="25px" src="https://codemelted.dev/website-nav/images/icons8-composing-mail-25.png" alt="Email"/></a>        
                </div>
            </div>
        </div>
        <hr style="margin: 0;" />
        <div style="text-align: center"> <br /> <a href="https://www.buymeacoffee.com/CodeMelted"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=CodeMelted&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"></a></div>
        `;

    // Go apply the template
    document.title = TITLE;
    document.body.innerHTML = HEADER_TEMPLATE + document.body.innerHTML + 
        NAV_TEMPLATE;
    document.body.style.marginTop = MARGIN_TOP;
});

// ----------------------------------------------------------------------------
// Now setup our actual navigation
setTimeout(() => {
    // Handles the transition to another page within the README.md markdown
    // files.
    const TAB_HANDLER = (ev) => {
        let tab = ev.srcElement;
        for (let el of TAB_NAVIGATION) {
            if (tab.alt === el.name) {
                window.location = el.url;
                break;
            }
        }
    };
    
    // Will apply the active-tab class to the proper anchor that is active
    // for the page loaded.
    const SET_ACTIVE_TAB = (tab) => {
        for (let el of TAB_NAVIGATION) {
            if (window.location.href === el.url && tab.innerHTML.indexOf(el.name) !== -1) {
                tab.classList.add("active-tab");
                break;
            }        
        }
    };

    // Access the tabs and setup the handler and identify the
    // active tab
    let divTabs = document.getElementsByClassName("tab-link");
    let tabWidth = 0;
    let activeIndex = -1;
    for (let el of divTabs) {
        activeIndex += 1;
        el.addEventListener("click", TAB_HANDLER);
        tabWidth = el.clientWidth;  
        SET_ACTIVE_TAB(el);   
    }
    divTabs.scrollLeft = activeIndex * tabWidth;
});

// ----------------------------------------------------------------------------
// Handle Search Logic
setTimeout(() => {
    let btnSearch = document.getElementById("btnSearch");
    let divSearch = document.getElementById("divSearch");
    let btnGo = document.getElementById("btnGo");
    btnSearch.addEventListener("click", () => {
        let gatherSearchData = async () => {
            try {
                for (let el of TAB_NAVIGATION) {
                    if (el.readme.length === 0) {
                        let url = el.url + "README.md";
                        el.readme = await CodeMelted.network.fetch(url);
                    } else {
                        break;
                    }
                }
            } catch (err) {
                alert(err);
            }
        };
        gatherSearchData();
        divSearch.style.display = "block";
    });

    btnGo.addEventListener("click", () => {
        let txtSearch = document.getElementById("txtSearch");
        let divSearchResults = document.getElementById("divSearchResults");
        divSearchResults.innerHTML = "<div>Tab</div><div>Occurrences</div>";
        for (let el of TAB_NAVIGATION) {
            let count = el.readme.split(txtSearch.value).length - 1;
            divSearchResults.innerHTML += `<a href="${el.url}">${el.name}</a> <div>${count}</div>`;
        }
    });
});