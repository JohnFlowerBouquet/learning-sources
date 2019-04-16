export const table = {
  _temporaryData: [],
  _editMode: false,

  init(data) {
    this._temporaryData = data;
    this.display();
  },
  toggleEditMode() {
    this._editMode = !this._editMode;
  },
  isEditMode() {
    return this._editMode;
  },

  display(data = this._temporaryData) {
    const list = document.querySelector("#list-show");
    if (data.length < 1 || !data.length) {
      return (list.innerHTML = `<tr class="table-dark"><td class="text-center " colspan="6">Sorry, no results! Try other keywords!</td></tr>`);
    }
    const formated = data.map((entry, index) => {
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
                <button type="button" class="badge badge-danger edit">Edit</button>
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
                ${index + 1}.
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
                  <button type="button" class="badge badge-danger edit">
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
  }
};
