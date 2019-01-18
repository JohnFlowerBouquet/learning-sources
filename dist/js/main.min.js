//Entry Class
var entries = [];
function getList() {
  const endpoint =
    "https://raw.githubusercontent.com/JohnFlowerBouquet/learning-sources/master/sources.json";
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      data.forEach(result => UI.addEntryToList(result));
      entries.push(...data);
    })
    .catch(function(error) {
      console.log(error);
    });
}

class Entry {
  constructor(title, link, category, technology, year) {
    this.title = title;
    this.link = link;
    this.category = category;
    this.technology = technology;
    this.year = year;
  }
}

//UI Class
class UI {
  static displayResults() {
    const results = getList();
    results.forEach(result => UI.addEntryToList(result));
  }

  static addEntryToList(entry) {
    const list = document.querySelector("#list-show");
    const row = document.createElement("tr");
    row.className = "table-dark";
    row.innerHTML = `
            <td><a href="${entry.link}">${entry.title}</a></td>
            <td>${entry.category}</td>
            <td>${entry.technology}</td>
            <td>${entry.year}</td>
            <td>
              <button type="button" id="list-edit" class="badge badge-danger">
                Edit
              </button>
              <button type="button" id="list-delete" class="badge badge-danger delete">
                Delete
              </button>
            </td>
        `;
    list.appendChild(row);
  }
  static deleteEntry(entry) {
    if (entry.classList.contains("delete")) {
      entry.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#list-form");
    container.insertBefore(div, form);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    document.querySelector("#input-title").value = "";
    document.querySelector("#input-link").value = "";
    document.querySelector("#input-technology").value = "";
    document.querySelector("#input-year").value = "";
  }
}

//Store Class
class Store {
  static getEntries() {
    let entries = getList();
    return entries;
  }

  static addEntry(entry) {
    entries.push(entry);
  }

  static removeEntry(title) {
    const entries = Store.getEntries();

    entries.forEach((entry, index) => {
      if (entry.title === title) {
        entries.splice(index, 1);
      }
    });
  }
}
//Event: Display Search Results
//document.addEventListener("DOMContentLoaded", UI.displayResults);
document.addEventListener("DOMContentLoaded", getList);
//Event: Add Entry
document.querySelector("#list-form").addEventListener("submit", e => {
  e.preventDefault();
  const title = document.querySelector("#input-title").value;
  const link = document.querySelector("#input-link").value;
  const category = document.querySelector("#input-category").value;
  const technology = document.querySelector("#input-technology").value;
  const year = document.querySelector("#input-year").value;

  //Validation
  if (title === "" || link === "" || technology === "" || year === "") {
    UI.showAlert("Please fill in all fields corectly", "danger");
  } else {
    const entry = new Entry(title, link, category, technology, year);
    entries.push(entry);

    UI.addEntryToList(entry);

    Store.addEntry(entry);

    UI.showAlert("Entry Added", "succes");

    UI.clearFields();
  }
});

//Event: Remove Entry
document.querySelector("#list-show").addEventListener("click", e => {
  UI.deleteEntry(e.target);
  Store.removeEntry(
    e.target.parentElement.parentElement.firstElementChild.textContent
  );
  UI.showAlert("Entry Removed", "succes");
});

function saveJSON() {
  const data =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(entries));
  var downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", data);
  downloadAnchorNode.setAttribute("download", "sources" + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
const JSONbutton = document.getElementById("saveJSON");
JSONbutton.addEventListener("click", saveJSON);
