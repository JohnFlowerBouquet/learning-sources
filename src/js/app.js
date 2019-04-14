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
const editModeButton = document.getElementById("editModeButton");
const JSONbutton = document.getElementById("saveJSON");
const modal = document.getElementById("modal");

if (window.innerWidth < 768) {
  searchButton.setAttribute("data-toggle", "collapse");
  addEntryButton.setAttribute("data-toggle", "collapse");
  editModeButton.setAttribute("data-toggle", "collapse");
  JSONbutton.setAttribute("data-toggle", "collapse");
}

searchButton.addEventListener("click", function(e) {
  e.preventDefault();
  if (searchInput.value.length < 1) return table.init(data.getEntries());
  table.search(searchInput.value, data.getEntries());
  searchInput.value = "";
});
next.addEventListener("click", table.nextPage);
prev.addEventListener("click", table.prevPage);
document.getElementById("modal-form").addEventListener("submit", onModalSubmit);

addEntryButton.addEventListener("click", function() {
  utilities.showModal(); //Podajac rodzaj modulu?? Entry/Brak wynikow/statystyki
});

editModeButton.addEventListener("click", function() {
  //Delete Entry: add button -> addeventlistener -> confrim modal -> delete from view in table.js -> delete from base in Store.js
  //utilities.confirmation()
  //data.removeEntry(entryTitle)
  table.toggleEditMode();
  table.display();
  document.addEventListener("click", e => {
    console.log(
      e.target.parentElement.parentElement.parentElement.querySelector(
        '[name="title"]'
      ).textContent
    );
    data.removeEntry(
      e.target.parentElement.parentElement.parentElement.querySelector(
        '[name="title"]'
      ).textContent
    );
    table.display(data.getEntries());
  });
});

function onModalSubmit(event) {
  event.preventDefault();
  if (utilities.validateInput()) {
    data.addEntry(utilities.getInput());
    utilities.clearInput();
    table.init(data.getEntries());
    utilities.closeModal();
  }
}

JSONbutton.addEventListener("click", data.saveToJSON);

/*
Clicks:
Pagination: previous, next, pages
Search: serach Button
New Entry: inputs + submit

Edit Entry: add button -> add
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
