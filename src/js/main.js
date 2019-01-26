//Entry Class
var entriesGlobal;
function getList() {
  var entries = [];
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
    var resultNumber = results.length;
    var pageIndex = 1;
    document.querySelectorAll(".removable").forEach(el => el.remove());
    if (resultNumber > 0) {
      var spliced = [[]];
      while (resultNumber > 0) {
        var chunk = results.splice(0, 5);
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
        <td>
          <a href="${entry.link}">${titleHighlight || entry.title}</a>
        </td>
        <td>${entry.category}</td>
        <td>${technologyHighlight || entry.technology}</td>
        <td>${entry.year}</td>
        <td>
          <button type="button" id="list-edit" class="badge badge-danger d-none">
            Edit
          </button>
          <button type="button" id="list-delete" class="badge badge-danger delete d-none">
            Delete
          </button>
        </td>
      </tr>`;
        })
        .join("");
      list.innerHTML = listTemplate;
    } else {
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
                <button type="button" id="list-edit" class="badge badge-danger d-none">Edit</button>
                <button type="button" id="list-delete" class="badge badge-danger delete d-none">Delete</button>
              </div>
            </td>
          </tr>`;
        })
        .join("");
      list.innerHTML = listTemplate;
    }
  }

  static editEntry(entry) {}

  static deleteEntry(entry) {
    if (entry.classList.contains("delete")) {
      entry.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className} mt-4`;
    div.appendChild(document.createTextNode(message));
    const form = document.querySelector("#list-form");
    form.appendChild(div);
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

  static editEntry(entry) {
    console.log("Store:", entry);
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
//OnLoad
document.addEventListener("DOMContentLoaded", () =>
  UI.displayResults(Store.getEntries())
);
const listShow = document.querySelector("#list-show");
const pagination = document.querySelector("#pagination");

//Event: Display Search Results
const searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", e => {
  e.preventDefault();
  const searchInput = document.querySelector("#search-input").value;
  UI.displayResults(UI.findMatches(searchInput), searchInput);
});

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
    console.log(entry);
    Store.addEntry(entry);
    UI.showAlert("Entry Added", "primary");
    UI.clearFields();
  }
});
//Event: Edit Entry
document.querySelector("#list-show").addEventListener("click", e => {
  console.log("aa");
  document.querySelector(".modal").classList.add("show");
  /*
  UI.editEntry(e.target);
  Store.editEntry(
    e.target.parentElement.parentElement.firstElementChild.textContent
  );*/
});

//Event: Remove Entry
document.querySelector("#list-show").addEventListener("click", e => {
  UI.deleteEntry(e.target);
  Store.removeEntry(
    e.target.parentElement.parentElement.firstElementChild.textContent
  );
  UI.showAlert("Entry Removed", "primary");
});

//Save JSON
function saveJSON() {
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
const JSONbutton = document.getElementById("saveJSON");
JSONbutton.addEventListener("click", saveJSON);
