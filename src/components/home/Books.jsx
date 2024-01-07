import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Books.css";

export let Books = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [updatedLocation, setUpdatedLocation] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

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

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(
        `https://apex.oracle.com/pls/apex/kentoy_cs_workspace/libraryManagement/library/${bookId}`
      );
      setBooks(books.filter((book) => book.book_id !== bookId));
      // Provide feedback to the user about successful deletion
    } catch (error) {
      // Handle deletion failure and provide feedback to the user
      console.error("Error deleting book:", error);
    }
  };

  const handleUpdateBook = async () => {
    try {
      setIsUpdating(true); // Set loading state to true
      await axios.put(
        `https://apex.oracle.com/pls/apex/kentoy_cs_workspace/libraryManagement/library/${selectedBook.book_id}`,
        { ...selectedBook, location: updatedLocation }
      );
      setUpdatedLocation("");
      setSelectedBook(null);
      // Provide feedback to the user about successful update
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
      <h1>Books Library</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : Array.isArray(books) && books.length > 0 ? (
        <table>
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
                  <button onClick={() => handleDeleteBook(book.book_id)}>
                    Delete
                  </button>
                  <button onClick={() => openUpdateModal(book)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No books available</p>
      )}
      {selectedBook && (
         <div className="modal">
         <div className="modal-content">
           <span className="close" onClick={closeUpdateModal}>
             &times;
           </span>
           <h2>Update Book</h2>
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
           <button onClick={handleUpdateBook} disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Save"}
            </button>
         </div>
       </div>
      )}
      <div className="book"></div>
    </div>
  );
};

export default Books;
