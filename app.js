// book constructor (obtaining book info through inputs)
function Book(title, author, isbn){
    this.title = title,
    this.author = author,
    this.isbn = isbn;
}


// ui constructor (displaying book information on tables)
function UI(){};

// Add Book to List
UI.prototype.addBookToList = function(book){
  const list =  document.getElementById('book-list');
  // create element
  const row = document.createElement('tr');
  // Insert calls
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href='#' class='delete'>X</a></td>`

  list.appendChild(row);

}

// Delete Book
UI.prototype.deleteBook = function(target){
 if(target.className === 'delete'){
     //we use target which is the x and we reference the first parent element (which is <td></td> since the x is <a></a> 
     // inside it) then the second element (which is <tr></tr>) and we delete that. traverse the DOM.
     target.parentElement.parentElement.remove();
 }
}

// Show alert
UI.prototype.showAlert =  function (message, className){
    // create div to show the alert
    const div = document.createElement('div');
    // add class name (we are adding the alert class as well so that it can later be referenced to remove the alert)
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    // Insert div with childNode (text) into the dom --- first we get the parent
    const container = document.querySelector('.container');
    // then we get the form (since we want to insert the div between the parent or container and the form)
    const form  = document.querySelector('#book-form');
    // to insert the div using the insertBefore method you must first use the parent div to which you will attach then the
    //method will take two parameter (what element is being inserted, what element it will go before)
    container.insertBefore(div, form);
    // have the error or success div disappear after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').remove();
   }, 3000);
}


// Clear Fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// event listeners (defines fields, obtains info and displays) for ADD BOOK

document.getElementById('book-form').addEventListener('submit',
function(e){
// get form values
 const title = document.getElementById('title').value;
 const author = document.getElementById('author').value;
 const isbn  = document.getElementById('isbn').value;

 // Instantiating a book (obtaining book info)
const book = new Book(title, author, isbn);


// Instantiating UI Object (activating UI)
const ui = new UI();

// Validate
if(title === '' || author === '' || isbn === ''){
    //Error Alert
    ui.showAlert('Please fill in all fields', 'error')
} else{

// Add book to list (Displaying book info)
ui.addBookToList(book)

// show success alert
ui.showAlert('Book added', 'success')

// clear fields (resetting form)
ui.clearFields();

}
 e.preventDefault();
});

// Event listener for delete(event delegation to a parent must be used because we don't want to add event listeners
// to each individual child since they were added dynamically)
document.getElementById('book-list').addEventListener('click', function(e){

    // Instantiating UI Object (activating UI) since this is a separate function in which it will be used
    const ui = new UI();

    // you must pass in the target of the event
    ui.deleteBook(e.target);

    //Show alert that book was removed
    ui.showAlert('book has been removed', 'success');

    e.preventDefault();
})