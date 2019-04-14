export const table = {
  _currentPage: 1,
  _entriesPerPage: 5,
  _numOfPages: 1,
  _temporaryData: [],
  _editMode: false,

  init(data) {
    this._temporaryData = data;
    this._entriesPerPage = Math.floor((window.innerHeight * 0.75 - 36) / 80);
    this._numOfPages = Math.ceil(data.length / this._entriesPerPage);
    this._currentPage = data.length < 1 ? 0 : 1;
    this.display();
    this.addPagination(data.length);
  },
  toggleEditMode() {
    this._editMode = !this._editMode;
  },

  display(data = this._temporaryData) {
    const list = document.querySelector("#list-show");
    const currentPage = this._currentPage;
    const entriesPerPage = this._entriesPerPage;
    if (data.length < 1) {
      return (list.innerHTML = `<tr class="table-dark"><td class="text-center " colspan="6">Sorry, no results! Try other keywords!</td></tr>`);
    }
    const dataPerPage = data.filter((entry, index) => {
      return (
        index >= (currentPage - 1) * entriesPerPage &&
        index < currentPage * entriesPerPage &&
        index < data.length
      );
    });

    const formated = dataPerPage.map((entry, index) => {
      if (window.innerWidth > 768) {
        return /*html*/ `
            <tr class="table-dark py-2">
            <th>${index + 1}</th>
              <td>
                <a href="${entry.link}" name="title">${entry.title}</a>
              </td>
              <td>${entry.category}</td>
              <td>${entry.technology}</td>
              <td>${entry.year}</td>
              <td>
              <div class="${table._editMode ? "d-block" : "d-none"}">
                <button type="button" class="badge badge-danger delete">Delete</button>
                <button type="button" class="badge badge-danger delete">Edit</button>
                </div>
              </td>
            </tr>`;
      } else {
        return /*html*/ `
          <tr
            class="table-dark clickable"
            data-toggle="collapse"
            data-target="#accordion${index}"
            aria-controls="collapse${index}"
            aria-expanded="${index === 0 ? "true" : "false"}"
          >
            <td class="py-3">
              <p class="mb-0">
                ${entriesPerPage * (currentPage - 1) + index + 1}.
      <span name="title">${entry.title}</span>
              </p>
              <div
                id="accordion${index}"
                class="collapse ${index === 0 ? "show" : ""}"
                data-parent="#accordion"
              >
                <p class="mb-0">Category: ${entry.category}</p>
                <p class="mb-0">Technologies: ${entry.technology}</p>
                <p class="mb-0">Year: ${entry.year}</p>
                <p class="mb-0">
                  Link: <a href="${entry.link}">${entry.title}</a>
                </p>
                <div class="${table._editMode ? "d-block" : "d-none"}">
                  <button type="button" class="badge badge-danger delete">
                    Delete
                  </button>
                  <button type="button" class="badge badge-danger delete">
                    Edit
                  </button>
                </div>
              </div>
            </td>
          </tr>
        `;
      }
    });
    list.innerHTML = formated.join("");
    this._editMode &&
      list
        .querySelectorAll(".delete")
        .forEach(btn =>
          btn.addEventListener("click", e => console.log(e.target))
        );
  },
  search(wordToMatch, data) {
    const regex = new RegExp(wordToMatch, "i");
    const searchResults = JSON.parse(JSON.stringify(data))
      .filter(entry => {
        return entry.title.match(regex) || entry.technology.match(regex);
      })
      .map(entry => {
        entry.title = entry.title.replace(
          regex,
          `<strong class="text-primary">${entry.title.match(regex)}</strong>`
        );
        entry.technology = entry.technology.replace(
          regex,
          `<strong class="text-primary">${entry.technology.match(
            regex
          )}</strong>`
        );
        return entry;
      });
    this.init(searchResults);
  },
  deleteEntry(entry) {
    console.log(entry);
  },
  addPagination(numOfEntries) {
    const numPages = Math.ceil(numOfEntries / this._entriesPerPage);
    const pagination = document.getElementById("pagination");
    pagination.querySelectorAll(".pageNum").forEach(item => item.remove());
    for (let i = 1; i < numPages + 1; i++) {
      const newPage = document.createElement("li");
      newPage.innerHTML = `<li class="page-item pageNum ${i == 1 &&
        "active"}"><a class="page-link pageNumLink" href="#">${i}</a></li>`;
      pagination.insertBefore(newPage, pagination.childNodes[i + 1]);
    }
    pagination
      .querySelectorAll(".pageNumLink")
      .forEach(item => item.addEventListener("click", e => this.selectPage(e)));
  },
  changePagination() {
    let pages = document.querySelectorAll(".pageNum");
    let next = document.getElementById("pagination_next");
    let prev = document.getElementById("pagination_prev");
    for (let i = 0; i < pages.length; i++) {
      if (i === this._currentPage - 1) {
        pages[i].classList.add("active");
      } else {
        pages[i].classList.remove("active");
      }
    }
    this._currentPage == 1
      ? prev.classList.add("disabled")
      : prev.classList.remove("disabled");
    this._currentPage == this._numOfPages
      ? next.classList.add("disabled")
      : next.classList.remove("disabled");
  },
  selectPage(e) {
    this._currentPage = e.target.textContent;
    this.display();
    this.changePagination();
  },
  prevPage() {
    if (this._currentPage > 1) {
      this._currentPage--;
      this.display();
      this.changePagination();
    }
  },
  nextPage() {
    if (this._currentPage < this._numOfPages) {
      this._currentPage++;
      this.display();
      this.changePagination();
    }
  }
};
