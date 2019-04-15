//Entry Class
import { Store } from "./Store";
import { table } from "./table";
import { utilities } from "./utilities";
const sourcesJSON = require("./sources.json");
const data = new Store(sourcesJSON);

table.init(data.getEntries());
const next = document.getElementById("pagination_next");
const prev = document.getElementById("pagination_prev");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const addEntryButton = document.getElementById("addEntryButton");
const editModeButton = document.getElementById("editModeButton");
const JSONbutton = document.getElementById("saveJSON");

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

addEntryButton.addEventListener("click", function() {
  utilities.showModal(); //Podajac rodzaj modulu?? Entry/Brak wynikow/statystyki
});
document.getElementById("modal-form").addEventListener("submit", onModalSubmit);

editModeButton.addEventListener("click", function() {
  table.toggleEditMode();
  table.display();
  if (table.isEditMode()) {
    document.addEventListener("click", changeEntry);
  } else {
    document.removeEventListener("click", changeEntry);
  }
});

function onModalSubmit(event) {
  event.preventDefault();
  if (utilities.validateInput()) {
    table.isEditMode
      ? data.editEntry(utilities.getInput())
      : data.addEntry(utilities.getInput());
    utilities.clearInput();
    table.init(data.getEntries());
    utilities.closeModal();
  }
}

function changeEntry(event) {
  if (event.target.classList.contains("delete")) {
    data.removeEntry(
      event.target.parentElement.parentElement.parentElement.querySelector(
        '[name="title"]'
      ).textContent
    );
    table.init(data.getEntries());
  }
  if (event.target.classList.contains("edit")) {
    const editedEntry = data.getEntry(
      event.target.parentElement.parentElement.parentElement.querySelector(
        '[name="title"]'
      ).textContent
    );
    utilities.showModal(editedEntry);
    //table.init(data.getEntries());
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
