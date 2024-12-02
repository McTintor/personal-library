# personal-library

added neccecary tables for the database:

CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,          -- Unique identifier for each user
    username VARCHAR(100) NOT NULL UNIQUE, -- Unique username
    firstname VARCHAR(100),         -- User's first name
    lastname VARCHAR(100),          -- User's last name
    password_hash TEXT NOT NULL,    -- Hashed password for security
    email VARCHAR(255) UNIQUE       -- Optional, unique email address
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,                     -- Unique identifier for each book
    user_id INT REFERENCES users(id) ON DELETE CASCADE, -- Links the book to the owning user
    title VARCHAR(255) NOT NULL,              -- Book title (required)
    author VARCHAR(255) NOT NULL,             -- Author name (required)
    genre VARCHAR(255) NOT NULL,              -- Genre of the book (required)
    pages INT NOT NULL,                       -- Number of pages (required)
    price DECIMAL(10, 2),                     -- Price of the book (optional)
    store VARCHAR(255),                       -- Store where the book was purchased (optional)
    purchase_date DATE,                       -- Date of purchase (optional)
    contains JSONB,                           -- Array of contained books with title and author (optional)
    picture_url TEXT,                         -- URL of the book's image (optional)
    description TEXT                          -- Description of the book (optional)
);