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
  submitBtn.addEventListener("click", submitBook);
});



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
  tableBody.innerHTML = "";

  myLibrary.forEach((book, index) => {
    // You can also use row = tableBody.insertRow() here!
    const row = document.createElement("tr");

    // Title Cell (Index 0)
    const titleCell = row.insertCell(0);
    titleCell.textContent = book.title;

    // Author Cell (Index 1)
    const authorCell = row.insertCell(1);
    authorCell.textContent = book.author;

    // Pages Cell (Index 2)
    const pagesCell = row.insertCell(2);
    pagesCell.textContent = book.pages;

    // Read Status Cell (Index 3)
    const statusCell = row.insertCell(3);
    const statusBtn = document.createElement("button");
    statusBtn.className = "btn btn-sm btn-success";
    statusBtn.textContent = book.check ? "Yes" : "No";
    statusBtn.addEventListener("click", () => {
      book.check = !book.check;
      render();
    });
    statusCell.appendChild(statusBtn);

    // Delete Cell (Index 4)
    const deleteCell = row.insertCell(4);
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-sm btn-warning";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      render();
      alert(`Deleted: ${book.title}`);
    });
    deleteCell.appendChild(deleteBtn);

    tableBody.appendChild(row);
  });
}
