//const sourcesJSON = require("./sources.json");
export class Store {
  constructor() {
    if (Store.exists) {
      return Store.instance;
    }
    this._data = [];
    Store.instance = this;
    Store.exists = true;
    return this;
  }

  fetchEntries() {
    const endpoint =
      "https://raw.githubusercontent.com/JohnFlowerBouquet/learning-sources/master/sources.json";
    return fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        this._data = JSON.parse(JSON.stringify(data));
        return this._data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  getEntries() {
    return this._data;
  }

  addEntry(entry) {
    this._data = [entry, ...this._data];
  }

  getEntry(title) {
    this._editedEntryIndex = this._data.findIndex(
      entry => entry.title === title
    );
    return this._data[this._editedEntryIndex];
  }

  editEntry(entry) {
    this._data[this._editedEntryIndex] = Object.assign({}, entry);
  }

  removeEntry(title) {
    this._data = this._data.filter(entry => entry.title !== title);
  }

  saveJSON() {
    console.log(this);
    const data =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(this._data));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", data);
    downloadAnchorNode.setAttribute("download", "sources" + ".json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
}
