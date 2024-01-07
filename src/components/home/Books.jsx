import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal } from "react-bootstrap";
import "../css/Books.css";
import "bootstrap/dist/css/bootstrap.min.css";

export let Books = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [updatedLocation, setUpdatedLocation] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Define location choices
  const locationChoices = [
    "First Floor (first Shelf)",
    "First Floor (second Shelf)",
    "First Floor (third Shelf)",
    "Second Floor (first Shelf)",
    "Second Floor (second Shelf)",
    "Second Floor (third Shelf)",
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "https://apex.oracle.com/pls/apex/kentoy_cs_workspace/libraryManagement/books"
        );

        if (response.data.items.length > 0) {
          setBooks(response.data.items);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setError("No books available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [isUpdating]); // Add isUpdating to the dependency array

  const handleDeleteBook = (bookId) => {
    const bookToDelete = books.find((book) => book.book_id === bookId);
    setSelectedBook(bookToDelete);
    setShowDeleteModal(true);
  };
  
  const confirmDelete = async () => {
    try {
      await axios.delete(
        `https://apex.oracle.com/pls/apex/kentoy_cs_workspace/libraryManagement/library/${selectedBook.book_id}`
      );
      setBooks(books.filter((book) => book.book_id !== selectedBook.book_id));
      // Provide feedback to the user about successful deletion
    } catch (error) {
      // Handle deletion failure and provide feedback to the user
      console.error("Error deleting book:", error);
    } finally {
      setShowDeleteModal(false);
      setSelectedBook(null); // Reset selectedBook after deletion
    }
  };
  
  const handleUpdateBook = async () => {
    try {
      if (selectedBook) {
        console.log("Update button clicked. Updating book:", selectedBook);
        setIsUpdating(true); // Set loading state to true
        // ... rest of the update logic ...
      } else {
        // Handle the case where no book is selected
        console.error("No book selected for update");
      }
    } catch (error) {
      // Handle update failure and provide feedback to the user
      console.error("Error updating book:", error);
    } finally {
      setIsUpdating(false); // Set loading state back to false
    }
  };
  const openUpdateModal = (book) => {
    setSelectedBook(book);
    setUpdatedLocation(book.location);
  };

  const closeUpdateModal = () => {
    setSelectedBook(null);
    setUpdatedLocation("");
  };

  return (
    <div className="all-books">
      <h1>BOOKS IN THE LIBRARY</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : Array.isArray(books) && books.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Book ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Availability</th>
              <th>Location</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.book_id}>
                <td>{book.book_id}</td>
                <td>{book.name_book}</td>
                <td>{book.author}</td>
                <td>{book.availability}</td>
                <td>{book.location}</td>
                <td>{book.created_at}</td>
                <td>{book.updated_at}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDeleteBook(book.book_id)}>
                    Delete
                  </Button>
                  <Button variant="info" onClick={() => openUpdateModal(book)}>
                    Update
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No books available</p>
      )}
      {selectedBook && (
        <Modal centered show={true} onHide={closeUpdateModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Title: {selectedBook.name_book}</p>
            <p>Author: {selectedBook.author}</p>
            <label>
              Location:
              <select
                value={updatedLocation}
                onChange={(e) => setUpdatedLocation(e.target.value)}
              >
                {locationChoices.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </label>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeUpdateModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdateBook} disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Save"}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <Modal centered show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this book?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Books;
