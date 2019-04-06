export class Store {
  constructor(data) {
    if (Store.exists) {
      return Store.instance;
    }
    this._data = JSON.parse(JSON.stringify(data));
    Store.instance = this;
    Store.exists = true;
    return this;
  }
  getEntries() {
    return this._data;
  }

  addEntry(entry) {
    this._data = [entry, ...this._data];
    console.log(this._data);
  }

  removeEntry(link) {
    this._data.forEach((entry, index) => {
      if (entry.link === link) {
        this._data.splice(index, 1);
      }
    });
  }

  saveToJSON() {
    const data =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(this._data));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", data);
    downloadAnchorNode.setAttribute("download", "sources" + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
}
