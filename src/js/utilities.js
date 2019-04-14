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
    const inputs = this.entry;
    console.log(inputs);
    for (const input in inputs) {
      let value = inputs[input];
      if (inputs.hasOwnProperty(input)) {
        switch (input) {
          case "title":
            if (inputs[input].length < 5) {
              this.showInputError(input);
              return false;
            } else {
              this.clearInputError(input);
            }
            break;
          case "link":
            if (
              !value.match(
                /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%.+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%+.~#?&//=]*)/g
              )
            ) {
              this.showInputError(input);
              return false;
            } else {
              this.clearInputError(input);
            }
            break;
          case "category":
            if (value === "") {
              this.showInputError(input);
              return false;
            } else {
              this.clearInputError(input);
            }
            break;
          case "technology":
            if (value === "") {
              this.showInputError(input);
              return false;
            } else {
              this.clearInputError(input);
            }
            break;
          case "year":
            if (!value.match(/([12][90][0-9][0-9])\/([0][0-9]|[1][012])/)) {
              this.showInputError(input);
              return false;
            } else {
              this.clearInputError(input);
            }
            break;
        }
      }
    }
    return true;
  },
  showInputError(inputName) {
    const span = document.createElement("span");
    span.classList.add("text-danger");
    switch (inputName) {
      case "title":
        span.textContent = "Must be at least 5 characters long.";
        break;
      case "link":
        span.textContent = "Insert proper URL address.";
        break;
      case "category":
        span.textContent = "Choose one category.";
        break;
      case "technology":
        span.textContent = "Write technologies separated by comma.";
        break;
      case "year":
        span.textContent = "Enter date in YYYY/MM format.";
        break;
      default:
        break;
    }
    const inputLabel = this.modal.querySelector(`[name="${inputName}"]`);
    !inputLabel.parentElement.querySelector(".text-danger") &&
      inputLabel.parentElement.appendChild(span);
    inputLabel.focus();
  },
  clearInputError(inputName) {
    const errorMsg = this.modal
      .querySelector(`[name="${inputName}"]`)
      .parentElement.querySelector(".text-danger");
    errorMsg && errorMsg.remove();
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
};
