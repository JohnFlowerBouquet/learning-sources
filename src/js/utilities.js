export const utilities = {
  entry: {
    title: "",
    link: "",
    category: "",
    technology: "",
    year: ""
  },
  modal: document.getElementById("modal"),

  showModal() {
    //Jeśli weryfikakcja potwierdzi wprowadzone dane to zwraca obiekt do app.js, który dalej przeekazuje go do Store i wywołuje display.
    const modalAnchorNode = document.createElement("a");
    modalAnchorNode.setAttribute("data-toggle", "modal");
    modalAnchorNode.setAttribute("data-target", "#modal");
    document.body.appendChild(modalAnchorNode);
    modalAnchorNode.click();
    modalAnchorNode.remove();
    this.modal.querySelectorAll(".form-control").forEach(input =>
      input.addEventListener("input", e => {
        utilities.entry[e.target.name] = e.target.value;
      })
    );
  },
  closeModal() {
    const modalClose = document.getElementById("closeModal");
    modalClose.click();
  },
  validateInput() {
    return true;
  },
  getInput() {
    return this.entry;
  },
  clearInput() {
    this.entry = {
      title: "",
      link: "",
      category: "",
      technology: "",
      year: ""
    };
    this.modal.querySelectorAll(".form-control").forEach(input => {
      input.value = "";
    });
  }

  /*
  addEntry(entry) {
    Store.addEntry(entry);
    console.log("entry added");
  },

  deleteEntry(event) {
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
  },

  clearFields() {
    document.querySelector("#input-title").value = "";
    document.querySelector("#input-link").value = "";
    document.querySelector("#input-technology").value = "";
    document.querySelector("#input-year").value = "";
  },

  validation(title, link, technology, year) {
    if (title === "" || link === "" || technology === "" || year === "") {
      return false;
    } else {
      return true;
    }
  }*/
};
