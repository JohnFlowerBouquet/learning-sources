import { Store } from "../js/Store";

const testArr = [
  {
    title: "freeCodeCamp - Online Bootcamp",
    link: "https://www.freecodecamp.org/",
    category: "Courses",
    technology: ["JavaScript", "HTML", "CSS"],
    year: "Updated"
  },
  {
    title: "javascriptissexy.com - Object Oriented JavaScript",
    link:
      "http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/",
    category: "Article",
    technology: ["JavaScript"],
    year: "2013/03"
  }
];
test("Returns array of objects", () => {
  const store = new Store(testArr);
  expect(store.getEntries()).toBeDefined();
  expect(store.getEntries()).toBeDefined();
});
