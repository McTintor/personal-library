# Personal Library Application

### Overview

This project is a Personal Library Application built using Node.js, Express.js, EJS, and PostgreSQL. It allows users to manage a personal collection of books, including adding, editing, viewing, and deleting books. Books can contain references to other books (e.g., a collection or anthology).

The application includes user authentication and a responsive UI and dynamically populated forms for seamless user interaction.

## Features

 - User Management: Register and Log in to use application. All users are authenticated.
 - Book Management: Add, edit, view, and delete books.
 - Contains Books: Optionally link books that are part of a collection or anthology.
 - Dynamic Forms: Add or remove contained books dynamically on the edit and add pages.
 - Custom Validation: Ensures data integrity for contained books (both title and author must be filled in).
 - Responsive UI: Built with EJS templates and CSS for a smooth user experience.
 - PostgreSQL Integration: All data is stored and retrieved from a PostgreSQL database.

## Technologies Used

 - Backend: Node.js, Express.js
 - Frontend: EJS, CSS
 - Database: PostgreSQL
 - Other: JavaScript for dynamic form handling

## Installation

 - Clone the repository: git clone https://github.com/mctintor/personal-library.git

 - Navigate to the project directory: cd personal-library

 - Install dependencies: npm install

 ### Set up the database:

 - Create a PostgreSQL database.
 - Configure the connection settings in the .env file:
     - DB_HOST
     - DB_PORT
     - DB_NAME
     - DB_USER
     - DB_PASSWORD
 - Run database migrations (if applicable): npm run migrate

 - Start the server: npm start

 - Open your browser and navigate to: http://localhost:3005

## Folder Structure

 - controllers/: Contains route handlers for CRUD operations.
 - views/: Contains EJS templates for the frontend.
 - public/: Holds static files like CSS and images.
 - routes/: Defines application routes.
 - models/: Handles database interactions.


## Usage

### Adding a Book

 - Navigate to the "Add Book" page.
 - Fill out the form fields (genre, title, author, etc.).
 - Optionally, add contained books by clicking "Add Contained Book".
 - Submit the form to save the book.

### Editing a Book

 - Open the "Edit" page for a book.
 - Update book details or contained books.
 - Remove contained books by clicking the delete button.
 - Submit the form to save changes.

### Viewing a Book

 - Click on a book to view its details.

### Deleting a Book

 - From the details page, click the "Delete" button to remove a book from the collection.

### Validation and Error Handling

 - All required fields must be filled in before submission.
 - For contained books, both the title and author must be provided, or neither.

Dynamic Contained Books:

 - Add new contained books dynamically with a dedicated button.
 - Remove contained books using a delete button.
 - Prevent submission if contained books have incomplete details.

## Personal Notes

 - Project done as part of The Odin Project curriculum, in order to learn and practice Express and PostgreSQL.
 - This project took 50+ hours to complete, and in doing so I have managed to learn the following:
     - Using MVC project architecture.
     - User authentication with passport and other middleware.
     - Working with PostgreSQL and different data types.
     - Pagination
     - Error handling
     - Encapsulation and safe code
