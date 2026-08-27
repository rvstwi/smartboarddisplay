//Author: Mr L (2026)

//adds some quick search options to the default background right click menu
let menu = document.getElementById("background-context");
let lhr = document.createElement("hr");
menu.appendChild(lhr);
let lig = AddContextItem(menu,"google",`<span class="material-symbols-outlined">search</span>Google`,false);
lig.addEventListener('click', function() {
    $(".context").hide(100);
    let s = prompt("Search Google for","");
    window.open(`https://www.google.ca/search?q=${s}&udm=web`,'Search','width=900,height=600');
});
let lid = AddContextItem(menu,"google",`<span class="material-symbols-outlined">feature_search</span>DuckDuckGo`,false);
lid.addEventListener('click', function() {
    $(".context").hide(100);
    let s = prompt("Search DuckDuckGo for","");
    window.open(`https://duckduckgo.com/?q=${s}`,'Search','width=900,height=600');
});
let liy = AddContextItem(menu,"you",`<span class="material-symbols-outlined">video_search</span>Youtube`,false);
liy.addEventListener('click', function() {
    $(".context").hide(100);
    let s = prompt("Search Youtube for","");
    window.open(`https://www.youtube.com/results?search_query=${s}`,'Search','width=900,height=600');
});
let lim = AddContextItem(menu,"maps",`<span class="material-symbols-outlined">map_search</span>Maps`,false);
lim.addEventListener('click', function() {
    $(".context").hide(100);
    let s = prompt("Search Google Maps for","");
    window.open(`https://www.google.com/maps/search/${s}`,'Search','width=900,height=600');
});