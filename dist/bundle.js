!function(t){var e={};function n(r){if(e[r])return e[r].exports;var a=e[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(r,a,function(e){return t[e]}.bind(null,a));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";function r(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}n.r(e);var o=function(){function t(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),t.exists?t.instance:(this._data=[],t.instance=this,t.exists=!0,this)}var e,n,o;return e=t,(n=[{key:"fetchEntries",value:function(){var t=this;return fetch("https://raw.githubusercontent.com/JohnFlowerBouquet/learning-sources/master/sources.json").then(function(t){return t.json()}).then(function(e){return t._data=JSON.parse(JSON.stringify(e)),t._data}).catch(function(t){console.log(t)})}},{key:"getEntries",value:function(){return this._data}},{key:"addEntry",value:function(t){this._data=[t].concat(r(this._data))}},{key:"getEntry",value:function(t){return this._editedEntryIndex=this._data.findIndex(function(e){return e.title===t}),this._data[this._editedEntryIndex]}},{key:"editEntry",value:function(t){this._data[this._editedEntryIndex]=Object.assign({},t)}},{key:"removeEntry",value:function(t){this._data=this._data.filter(function(e){return e.title!==t})}},{key:"saveJSON",value:function(){console.log(this);var t="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(this._data)),e=document.createElement("a");e.setAttribute("href",t),e.setAttribute("download","sources.json"),document.body.appendChild(e),e.click(),e.remove()}}])&&a(e.prototype,n),o&&a(e,o),t}(),i={_temporaryData:[],_editMode:!1,init:function(t){this._temporaryData=t,this.display()},toggleEditMode:function(){this._editMode=!this._editMode},isEditMode:function(){return this._editMode},display:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this._temporaryData,e=document.querySelector("#list-show");if(t.length<1||!t.length)return e.innerHTML='<tr class="table-dark"><td class="text-center " colspan="6">Sorry, no results! Try other keywords!</td></tr>';var n=t.map(function(t,e){return window.innerWidth>768?'\n            <tr class="table-dark py-2">\n            <th>'.concat(e+1,'</th>\n              <td>\n                <a href="').concat(t.link,'" name="title">').concat(t.title,"</a>\n              </td>\n              <td>").concat(t.category,"</td>\n              <td>").concat(t.technology,"</td>\n              <td>").concat(t.year,'</td>\n              <td>\n              <div class="').concat(i._editMode?"d-block":"d-none",'">\n                <button type="button" class="badge badge-danger delete">Delete</button>\n                <button type="button" class="badge badge-danger edit">Edit</button>\n                </div>\n              </td>\n            </tr>'):'\n          <tr\n            class="table-dark clickable"\n            data-toggle="collapse"\n            data-target="#accordion'.concat(e,'"\n            aria-controls="collapse').concat(e,'"\n            aria-expanded="').concat(0===e?"true":"false",'"\n          >\n            <td class="py-3">\n              <p class="mb-0">\n                ').concat(e+1,'.\n      <span name="title">').concat(t.title,'</span>\n              </p>\n              <div\n                id="accordion').concat(e,'"\n                class="collapse ').concat(0===e?"show":"",'"\n                data-parent="#accordion"\n              >\n                <p class="mb-0">Category: ').concat(t.category,'</p>\n                <p class="mb-0">Technologies: ').concat(t.technology,'</p>\n                <p class="mb-0">Year: ').concat(t.year,'</p>\n                <p class="mb-0">\n                  Link: <a href="').concat(t.link,'">').concat(t.title,'</a>\n                </p>\n                <div class="').concat(i._editMode?"d-block":"d-none",'">\n                  <button type="button" class="badge badge-danger delete">\n                    Delete\n                  </button>\n                  <button type="button" class="badge badge-danger edit">\n                    Edit\n                  </button>\n                </div>\n              </div>\n            </td>\n          </tr>\n        ')});e.innerHTML=n.join("")},search:function(t,e){var n=new RegExp(t,"i"),r=JSON.parse(JSON.stringify(e)).filter(function(t){return t.title.match(n)||t.technology.match(n)}).map(function(t){return t.title=t.title.replace(n,'<strong class="text-primary">'.concat(t.title.match(n),"</strong>")),t.technology=t.technology.replace(n,'<strong class="text-primary">'.concat(t.technology.match(n),"</strong>")),t});this.init(r)}},c={entry:{title:"",link:"",category:"",technology:"",year:""},modal:document.getElementById("modal"),_isNewEntry:!0,showModal:function(t){this.clearInput(),t?(this.modal.querySelectorAll(".form-control").forEach(function(e){e.value=t[e.name],c.entry[e.name]=t[e.name]}),this._isNewEntry=!1):this._isNewEntry=!0;var e=document.createElement("a");e.setAttribute("data-toggle","modal"),e.setAttribute("data-target","#modal"),document.body.appendChild(e),e.click(),e.remove(),this.modal.querySelectorAll(".form-control").forEach(function(t){return t.addEventListener("input",function(t){c.entry[t.target.name]=t.target.value})})},closeModal:function(){document.getElementById("closeModal").click()},isNewEntry:function(){return this._isNewEntry},validateInput:function(){var t=this.entry;for(var e in t){var n=t[e];if(t.hasOwnProperty(e))switch(e){case"title":if(t[e].length<5)return this.showInputError(e),!1;this.clearInputError(e);break;case"link":if(!n.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%.+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%+.~#?&\/\/=]*)/g))return this.showInputError(e),!1;this.clearInputError(e);break;case"category":case"technology":if(""===n)return this.showInputError(e),!1;this.clearInputError(e);break;case"year":if(!n.match(/([12][90][0-9][0-9])\/([0][0-9]|[1][012])/))return this.showInputError(e),!1;this.clearInputError(e)}}return!0},showInputError:function(t){var e=document.createElement("span");switch(e.classList.add("text-danger"),t){case"title":e.textContent="Must be at least 5 characters long.";break;case"link":e.textContent="Insert proper URL address.";break;case"category":e.textContent="Choose one category.";break;case"technology":e.textContent="Write technologies separated by comma.";break;case"year":e.textContent="Enter date in YYYY/MM format."}var n=this.modal.querySelector('[name="'.concat(t,'"]'));!n.parentElement.querySelector(".text-danger")&&n.parentElement.appendChild(e),n.focus()},clearInputError:function(t){var e=this.modal.querySelector('[name="'.concat(t,'"]')).parentElement.querySelector(".text-danger");e&&e.remove()},getInput:function(){return this.entry},clearInput:function(){this.entry={title:"",link:"",category:"",technology:"",year:""},this.modal.querySelectorAll(".form-control").forEach(function(t){t.value=""})}},l=new o;l.fetchEntries().then(function(t){return i.init(t)});var s=document.getElementById("searchInput"),d=document.getElementById("searchButton"),u=document.getElementById("addEntryButton"),y=document.getElementById("editModeButton"),h=document.getElementById("saveJSON");function f(t){if(t.target.classList.contains("delete")&&(l.removeEntry(t.target.parentElement.parentElement.parentElement.querySelector('[name="title"]').textContent),i.init(l.getEntries())),t.target.classList.contains("edit")){var e=l.getEntry(t.target.parentElement.parentElement.parentElement.querySelector('[name="title"]').textContent);c.showModal(e)}}window.innerWidth<768&&(d.setAttribute("data-toggle","collapse"),u.setAttribute("data-toggle","collapse"),y.setAttribute("data-toggle","collapse"),h.setAttribute("data-toggle","collapse")),d.addEventListener("click",function(t){if(t.preventDefault(),console.log(l.getEntries()),s.value.length<1)return i.init(l.getEntries());i.search(s.value,l.getEntries()),s.value=""}),u.addEventListener("click",function(){c.showModal()}),document.getElementById("modal-form").addEventListener("submit",function(t){t.preventDefault(),c.validateInput()&&(c.isNewEntry()?l.addEntry(c.getInput()):l.editEntry(c.getInput()),c.clearInput(),i.init(l.getEntries()),c.closeModal())}),y.addEventListener("click",function(){i.toggleEditMode(),i.display(),i.isEditMode()?document.addEventListener("click",f):document.removeEventListener("click",f)}),h.addEventListener("click",function(){return l.saveJSON()})}]);