// Book object constructor
function Book(name, author, publisher, publicationDate) {
    this.name = name;
    this.author = author;
    this.publisher = publisher;
    this.publicationDate = publicationDate;
  }
  
  // Initialize books array
  let books = [];
  
  // Retrieve books from local storage or initialize to empty array
  if (localStorage.getItem('books') !== null) {
    books = JSON.parse(localStorage.getItem('books'));
  }
  
  // Function to display all books
  function displayBooks() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    books.forEach((book, index) => {
      const li = document.createElement('li');
      li.innerHTML = `${book.name} - ${book.author} - ${book.publisher} - ${book.publicationDate}`;
      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = 'Delete';
      deleteBtn.addEventListener('click', () => {
        deleteBook(index);
      });
      li.appendChild(deleteBtn);
      bookList.appendChild(li);
    });
  }
  
  // Function to add book
  function addBook(name, author, publisher, publicationDate) {
    const book = new Book(name, author, publisher, publicationDate);
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
  }
  
  // Function to delete book
  function deleteBook(index) {
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
  }
  
  // Function to display authors and their books
  function displayAuthors() {
    const authorList = document.getElementById('author-list');
    authorList.innerHTML = '';
    const authors = {};
    books.forEach((book) => {
      if (authors[book.author] === undefined) {
        authors[book.author] = [book.name];
      } else {
        authors[book.author].push(book.name);
      }
    });
    for (const author in authors) {
      const li = document.createElement('li');
      li.innerHTML = `${author}: ${authors[author].join(', ')}`;
      authorList.appendChild(li);
    }
  }
  
  // Function to display publishers and their books
  function displayPublishers() {
    const publisherList = document.getElementById('publisher-list');
    publisherList.innerHTML = '';
    const publishers = {};
    books.forEach((book) => {
      if (publishers[book.publisher] === undefined) {
        publishers[book.publisher] = [book.name];
      } else {
        publishers[book.publisher].push(book.name);
      }
    });
    for (const publisher in publishers) {
      const li = document.createElement('li');
      li.innerHTML = `${publisher}: ${publishers[publisher].join(', ')}`;
      publisherList.appendChild(li);
    }
  }

  function updateBook(id, bookName, author, publisher, publicationDate) {
    let books = JSON.parse(localStorage.getItem('books'));
    books = books.map(book => {
      if (book.id === id) {
        book.bookName = bookName;
        book.author = author;
        book.publisher = publisher;
        book.publicationDate = publicationDate;
      }
      return book;
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
  
  // Add book form submit event listener
  const addBookForm = document.getElementById('add-book-form');
  addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('book-name').value.trim();
    const author = document.getElementById('author').value.trim();
    const publisher = document.getElementById('publisher').value.trim();
    const publicationDate = document.getElementById('publication-date').value;
    const existingBook = books.find(
      (book) => book.name.toLowerCase() === name.toLowerCase()
    );
    if (existingBook !== undefined) {
      alert('Book already exists');
    } else {
      addBook(name, author, publisher, publicationDate);
      addBookForm.reset();
    }
  });
  
  // Initialize display of books, authors, and publishers
  displayBooks();
  displayAuthors();
  displayPublishers();
  