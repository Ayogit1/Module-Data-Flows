const myLibrary = [];

// DOM Element Selectors
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const checkInput = document.getElementById("check");
const submitBtn = document.getElementById("submitBtn");
const tableBody = document.getElementById("tableBody");

// Initialize app
window.addEventListener("load", () => {
  populateStorage();
  render();
});

submitBtn.addEventListener("click", submitBook);

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function populateStorage() {
  if (myLibrary.length === 0) {
    // Note: pages are stored as numbers
    const book1 = new Book("Robinson Crusoe", "Daniel Defoe", 252, true);
    const book2 = new Book("The Old Man and the Sea", "Ernest Hemingway", 127, true);
    myLibrary.push(book1, book2);
  }
}

function submitBook() {
  // Input Validation & Normalization
  const titleVal = titleInput.value.trim();
  const authorVal = authorInput.value.trim();
  const pagesVal = parseInt(pagesInput.value);

  // Reject empty strings or invalid page numbers
  if (!titleVal || !authorVal || isNaN(pagesVal) || pagesVal <= 0) {
    alert("Please provide a valid Title, Author, and Page Count.");
    return;
  }

  const newBook = new Book(titleVal, authorVal, pagesVal, checkInput.checked);
  myLibrary.push(newBook);

  // Clear inputs
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  checkInput.checked = false;

  render();
}

function render() {
  // Clear the container in one operation
  tableBody.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const row = document.createElement("tr");

    // Title Cell
    const titleCell = document.createElement("td");
    titleCell.textContent = book.title;
    row.appendChild(titleCell);

    // Author Cell
    const authorCell = document.createElement("td");
    authorCell.textContent = book.author;
    row.appendChild(authorCell);

    // Pages Cell
    const pagesCell = document.createElement("td");
    pagesCell.textContent = book.pages;
    row.appendChild(pagesCell);

    // Read Status Cell
    const statusCell = document.createElement("td");
    const statusBtn = document.createElement("button");
    statusBtn.className = "btn btn-sm btn-success";
    // Ternary operator for simplification
    statusBtn.textContent = book.check ? "Yes" : "No";

    statusBtn.addEventListener("click", () => {
      book.check = !book.check;
      render();
    });
    statusCell.appendChild(statusBtn);
    row.appendChild(statusCell);

    // Delete Cell
    const deleteCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-sm btn-warning";
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      const deletedTitle = book.title;
      myLibrary.splice(index, 1);
      render();
      // Alert after deletion logic is complete
      alert(`Deleted: ${deletedTitle}`);
    });
    deleteCell.appendChild(deleteBtn);
    row.appendChild(deleteCell);

    tableBody.appendChild(row);
  });
}



/*

let myLibrary = [];

window.addEventListener("load", function (e) {
  populateStorage();
  render();
});

function populateStorage() {
  if (myLibrary.length == 0) {
    let book1 = new Book("Robison Crusoe", "Daniel Defoe", "252", true);
    let book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      "127",
      true
    );
    myLibrary.push(book1);
    myLibrary.push(book2);
    render();
  }
}

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const check = document.getElementById("check");

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function submit() {
  if (
    title.value == null ||
    title.value == "" ||
    pages.value == null ||
    pages.value == ""
  ) {
    alert("Please fill all fields!");
    return false;
  } else {
    let book = new Book(title.value, title.value, pages.value, check.checked);
    library.push(book);
    render();
  }
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  let table = document.getElementById("display");
  let rowsNumber = table.rows.length;
  //delete old table
  for (let n = rowsNumber - 1; n > 0; n-- {
    table.deleteRow(n);
  }
  //insert updated row and cells
  let length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    let row = table.insertRow(1);
    let titleCell = row.insertCell(0);
    let authorCell = row.insertCell(1);
    let pagesCell = row.insertCell(2);
    let wasReadCell = row.insertCell(3);
    let deleteCell = row.insertCell(4);
    titleCell.innerHTML = myLibrary[i].title;
    authorCell.innerHTML = myLibrary[i].author;
    pagesCell.innerHTML = myLibrary[i].pages;

    //add and wait for action for read/unread button
    let changeBut = document.createElement("button");
    changeBut.id = i;
    changeBut.className = "btn btn-success";
    wasReadCell.appendChild(changeBut);
    let readStatus = "";
    if (myLibrary[i].check == false) {
      readStatus = "Yes";
    } else {
      readStatus = "No";
    }
    changeBut.innerText = readStatus;

    changeBut.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    //add delete button to every row and render again
    let delButton = document.createElement("button");
    delBut.id = i + 5;
    deleteCell.appendChild(delBut);
    delBut.className = "btn btn-warning";
    delBut.innerHTML = "Delete";
    delBut.addEventListener("clicks", function () {
      alert(`You've deleted title: ${myLibrary[i].title}`);
      myLibrary.splice(i, 1);
      render();
    });
  }
}

*/