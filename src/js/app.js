import { Store } from "./Store";
import { table } from "./table";
import { utilities } from "./utilities";
const data = new Store();
data.fetchEntries().then(data => table.init(data));

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
  console.log(data.getEntries());
  if (searchInput.value.length < 1) return table.init(data.getEntries());
  table.search(searchInput.value, data.getEntries());
  searchInput.value = "";
});

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
    utilities.isNewEntry()
      ? data.addEntry(utilities.getInput())
      : data.editEntry(utilities.getInput());
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
  }
}
JSONbutton.addEventListener("click", () => data.saveJSON());
