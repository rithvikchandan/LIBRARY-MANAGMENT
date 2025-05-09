document.addEventListener("DOMContentLoaded", function () {
  // Load from localStorage or use default sample data
  let books = JSON.parse(localStorage.getItem("books")) || [
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      category: "Self Help",
    },
    { id: 2, title: "1984", author: "George Orwell", category: "Dystopian" },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      category: "Classic",
    },
  ];

  // DOM Elements
  const booksTableBody = document.getElementById("books-table-body");
  const searchInput = document.getElementById("search-input");
  const addBookModal = document.getElementById("addBookModal");
  const addBookBtn = document.getElementById("add-book-btn");
  const closeModal = document.querySelector(".close");
  const addBookForm = document.getElementById("addBookForm");

  let editMode = false;
  let editBookId = null;

  function updateUI() {
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
  }

  function displayBooks() {
    booksTableBody.innerHTML = "";
    books.forEach((book) => {
      let row = `<tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.category}</td>
                <td>
                    <button class="edit-btn" onclick="editBook(${book.id})"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" onclick="deleteBook(${book.id})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
      booksTableBody.innerHTML += row;
    });
  }

  updateUI(); // Initial render

  searchInput.addEventListener("input", function () {
    let searchValue = searchInput.value.toLowerCase();
    let filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchValue) ||
        book.author.toLowerCase().includes(searchValue) ||
        book.category.toLowerCase().includes(searchValue)
    );
    booksTableBody.innerHTML = "";
    filteredBooks.forEach((book) => {
      let row = `<tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.category}</td>
                <td>
                    <button class="edit-btn" onclick="editBook(${book.id})"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" onclick="deleteBook(${book.id})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
      booksTableBody.innerHTML += row;
    });
  });

  addBookBtn.addEventListener("click", function () {
    addBookModal.style.display = "block";
    addBookForm.reset();
    editMode = false;
  });

  closeModal.addEventListener("click", function () {
    addBookModal.style.display = "none";
  });

  addBookForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let title = document.getElementById("book-title").value;
    let author = document.getElementById("book-author").value;
    let category = document.getElementById("book-category").value;

    if (editMode) {
      books = books.map((book) =>
        book.id === editBookId ? { id: book.id, title, author, category } : book
      );
    } else {
      let newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1,
        title,
        author,
        category,
      };
      books.push(newBook);
    }

    updateUI();
    addBookModal.style.display = "none";
    addBookForm.reset();
    editMode = false;
    editBookId = null;
  });

  // Make editBook available globally
  window.editBook = function (id) {
    let bookToEdit = books.find((book) => book.id === id);
    if (bookToEdit) {
      document.getElementById("book-title").value = bookToEdit.title;
      document.getElementById("book-author").value = bookToEdit.author;
      document.getElementById("book-category").value = bookToEdit.category;

      editMode = true;
      editBookId = id;
      addBookModal.style.display = "block";
    }
  };

  // Make deleteBook available globally
  window.deleteBook = function (id) {
    books = books.filter((book) => book.id !== id);
    updateUI();
  };
});
