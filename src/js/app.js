//Entry Class
var entriesGlobal;
function getList() {
  let entries = [];
  const endpoint =
    "https://raw.githubusercontent.com/JohnFlowerBouquet/learning-sources/master/sources.json";
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      entries.push(...data);
      UI.displayResults(data);
    })
    .catch(function(error) {
      console.log(error);
    });
  entriesGlobal = entries;
  return entries;
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
  static displayResults(results, searchInput = 0) {
    let resultNumber = results.length;
    let pageIndex = 1;
    document.querySelectorAll(".removable").forEach(el => el.remove());
    if (resultNumber > 0) {
      var spliced = [[]];
      while (resultNumber > 0) {
        const chunk = results.splice(0, 5);
        spliced.push(chunk);
        const liElement = document.createElement("li");
        liElement.className = "page-item removable";
        const pageButton = document.createElement("button");
        pageButton.className = "page-link";
        pageButton.dataset.pageNumber = pageIndex;
        pageButton.textContent = pageIndex;
        pageButton.addEventListener("click", function() {
          UI.displayList(spliced[this.dataset.pageNumber], searchInput);
        });
        liElement.appendChild(pageButton);
        pagination.insertBefore(liElement, pagination.lastElementChild);
        resultNumber = results.length;
        pageIndex++;
      }
      UI.displayList(spliced[1], searchInput);
    } else {
      UI.displayList(results, searchInput);
    }
  }

  static findMatches(wordToMatch) {
    listShow.innerHTML = "";
    return Store.getEntries().filter(entry => {
      const regex = new RegExp(wordToMatch, "gi");
      return entry.title.match(regex) || entry.category.match(regex);
    });
  }

  static displayList(listToShow, searchInput = 0) {
    var titleHighlight;
    var technologyHighlight;
    const list = document.querySelector("#list-show");
    if (window.innerWidth > 768) {
      const listTemplate = Array.from(listToShow)
        .map(entry => {
          if (searchInput) {
            const regex = new RegExp(searchInput, "gi");
            titleHighlight = entry.title.replace(
              regex,
              `<strong class="text-primary">${searchInput}</strong>`
            );
            technologyHighlight = entry.category.replace(
              regex,
              `<strong class="text-primary">${searchInput}</strong>`
            );
          }
          return `
      <tr class="table-dark">
        <th scope="row">
          <a href="${entry.link}">${titleHighlight || entry.title}</a>
        </th>
        <td>${entry.category}</td>
        <td>${technologyHighlight || entry.technology}</td>
        <td>${entry.year}</td>
        <td>
          <button type="button" class="badge badge-danger d-none delete">
            Delete
          </button>
        </td>
      </tr>`;
        })
        .join("");
      list.innerHTML = listTemplate;
    } else {
      document
        .getElementById("searchButton")
        .setAttribute("data-toggle", "collapse");
      const listTemplate = Array.from(listToShow)
        .map((entry, index) => {
          if (searchInput) {
            const regex = new RegExp(searchInput, "gi");
            titleHighlight = entry.title.replace(
              regex,
              `<strong class="text-primary">${searchInput}</strong>`
            );
            technologyHighlight = entry.category.replace(
              regex,
              `<strong class="text-primary">${searchInput}</strong>`
            );
          }
          return `
          <tr data-toggle="collapse" data-target="#accordion${index}" class="table-dark clickable">
            <td>
              <a href="${entry.link}">${titleHighlight || entry.title}</a>
              <div id="accordion${index}" class="collapse">
                <p>Category: ${entry.category}</p>
                <p>Technologies: ${technologyHighlight || entry.technology}</p>
                <p>Year: ${entry.year}</p>
                <button type="button" class="badge badge-danger d-none delete">Delete</button>
              </div>
            </td>
          </tr>`;
        })
        .join("");
      list.innerHTML = listTemplate;
    }
  }

  static addEntry(entry) {
    Store.addEntry(entry);
    console.log("entry added");
  }

  static deleteEntry(event) {
    let link;
    if (event.target.parentElement.classList.contains("collapse")) {
      link = event.target.parentElement.parentElement.parentElement.firstElementChild.getAttribute(
        "href"
      );
      event.target.parentElement.parentElement.parentElement.remove();
    } else {
      link = event.target.parentElement.parentElement.firstElementChild.getAttribute(
        "href"
      );
      event.target.parentElement.parentElement.remove();
    }
    console.log(link);
    Store.removeEntry(link);
  }

  static showModal() {
    var modalAnchorNode = document.createElement("a");
    modalAnchorNode.setAttribute("data-toggle", "modal");
    modalAnchorNode.setAttribute("data-target", "#modalAnchor");
    document.body.appendChild(modalAnchorNode);
    modalAnchorNode.click();
    modalAnchorNode.remove();
    var title = document.querySelector("#input-title").value;
    var link = document.querySelector("#input-link").value;
    var category = document.querySelector("#input-category").value;
    var technology = document.querySelector("#input-technology").value;
    var year = document.querySelector("#input-year").value;
    document.querySelector("#modal-form").addEventListener("submit", e => {
      e.preventDefault();
      if (UI.validation(title, link, category, technology, year)) {
        const entry = new Entry(title, link, category, technology, year);
        UI.addEntry(entry);
        UI.showAlert("Entry Added", "primary");
        UI.clearFields();
      } else {
        UI.showAlert("Please fill in all fields corectly", "danger");
      }
    });
  }

  static showAlert(message, className) {
    var time;
    if (!document.querySelector(".alert")) {
      const div = document.createElement("div");
      div.className = `alert alert-${className} mt-4`;
      div.appendChild(document.createTextNode(message));
      const form = document.querySelector("#modal-form");
      form.appendChild(div);
      time = setTimeout(() => document.querySelector(".alert").remove(), 3000);
    } else {
      clearTimeout(time);
    }
  }

  static clearFields() {
    document.querySelector("#input-title").value = "";
    document.querySelector("#input-link").value = "";
    document.querySelector("#input-technology").value = "";
    document.querySelector("#input-year").value = "";
  }

  static validation(title, link, technology, year) {
    if (title === "" || link === "" || technology === "" || year === "") {
      return false;
    } else {
      return true;
    }
  }
}

//Store Class
class Store {
  static getEntries() {
    var entries;
    if (entriesGlobal) {
      console.log("local");
      return entriesGlobal;
    } else {
      console.log("fetch");
      entries = getList();
    }
    return entries;
  }

  static addEntry(entry) {
    entriesGlobal.push(entry);
  }

  static removeEntry(link) {
    entriesGlobal.forEach((entry, index) => {
      if (entry.link === link) {
        entriesGlobal.splice(index, 1);
      }
    });
  }

  static saveJSON() {
    const data =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(entriesGlobal));
    var downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", data);
    downloadAnchorNode.setAttribute("download", "sources" + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
}
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
