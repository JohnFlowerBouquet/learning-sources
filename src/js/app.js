//Entry Class
import { Store } from "./Store";
import { table } from "./table";
import { utilities } from "./utilities";
const sourcesJSON = require("./sources.json");
const data = new Store(sourcesJSON);

(function() {})();
table.init(data.getEntries());
const next = document.getElementById("pagination_next");
const prev = document.getElementById("pagination_prev");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const addEntryButton = document.getElementById("addEntryButton");
const modal = document.getElementById("modal");

if (window.innerWidth < 768) {
  searchButton.setAttribute("data-toggle", "collapse");
}

searchButton.addEventListener("click", function(e) {
  e.preventDefault();
  if (searchInput.value.length < 1) return table.init(data.getEntries());
  table.search(searchInput.value, data.getEntries());
  searchInput.value = "";
});
next.addEventListener("click", table.nextPage);
prev.addEventListener("click", table.prevPage);

addEntryButton.addEventListener("click", function() {
  utilities.showModal(); //Podajac rodzaj modulu?? Entry/Brak wynikow/statystyki
  document
    .getElementById("modal-form")
    .addEventListener("submit", onModalSubmit);
});

function onModalSubmit(event) {
  event.preventDefault();
  if (utilities.validateInput()) {
    data.addEntry(utilities.getInput());
    utilities.clearInput();
    table.init(data.getEntries());
    utilities.closeModal();
  }
  document
    .getElementById("modal-form")
    .removeEventListener("submit", onModalSubmit);
}
/*
Clicks:
Pagination: previous, next, pages
Search: serach Button
New Entry: inputs + submit
Edit Entry: inputs get old data + submit + delete
*/
/*function getList() {
  let entries = [];
  const endpoint =
    "https://raw.githubusercontent.com/JohnFlowerBouquet/learning-sources/master/sources.json";
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      entries.push(...data);
      UI.displayResults(data);
      entriesGlobal = entries;
      return entries;
    })
    .catch(error => {
      console.log(error);
    });
}*/
/*

//Anchors
const listShow = document.querySelector("#list-show");
const pagination = document.querySelector("#pagination");

listShow.addEventListener("click", e => {
  if (e.target.classList.contains("delete")) {
    UI.deleteEntry(e);
  }
});
//Save JSON
const JSONbutton = document.getElementById("saveJSON");
JSONbutton.addEventListener("click", Store.saveJSON);
//OnLoad
document.addEventListener("DOMContentLoaded", () => {
  UI.displayResults(Store.getEntries());
});
//Add Entry
const addEntryButton = document.querySelector("#addEntryButton");
addEntryButton.addEventListener("click", UI.showModal);

//Event: Search
const searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", e => {
  e.preventDefault();
  const searchInput = document.querySelector("#search-input").value;
  if (searchInput == "admin") {
    console.log("GODMODE ON");
    document
      .querySelectorAll(".d-none")
      .forEach(item => item.tagName == "TR" || item.classList.remove("d-none"));
  } else {
    UI.displayResults(UI.findMatches(searchInput), searchInput);
  }
});
*/
