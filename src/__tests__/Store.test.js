import { Entry, Store } from "../js/Store";

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

test("Creates instance of Entry object with defined values", () => {
  const entry = new Entry("title", "link", "category", "technology", "year");
  expect(entry).toBeDefined();
  expect(entry.title).toBe("title");
  expect(entry.link).toBe("link");
  expect(entry.category).toBe("category");
  expect(entry.technology).toBe("technology");
  expect(entry.year).toBe("year");
});
test("Returns array of objects", () => {
  const store = new Store(testArr);
  expect(store.getEntries()).toBeDefined();
  expect(store.getEntries()).toBeDefined();
});
