import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';

export let Location = () => {
  const [firstShelfBooks, setFirstShelfBooks] = useState([]);
  const [secondShelfBooks, setSecondShelfBooks] = useState([]);
  const [thirdShelfBooks, setThirdShelfBooks] = useState([]);

  useEffect(() => {
    const fetchBooksForShelf = async (shelf, setShelfBooks) => {
      try {
        const response = await axios.get(
          `https://apex.oracle.com/pls/apex/kentoy_cs_workspace/libraryManagement/location/${shelf}`
        );

        if (response.data.items.length > 0) {
          setShelfBooks(response.data.items);
        } else {
          // Handle the case where no books are available for the selected location
          setShelfBooks([]);
        }
      } catch (error) {
        console.error(`Error fetching books for ${shelf}:`, error);
        // Handle the error fetching books for the specified location
      }
    };

    // Fetch books for each shelf on the first floor
    const shelves = [
      { shelf: 'First%20Floor%20(first%20Shelf)', setBooks: setFirstShelfBooks },
      { shelf: 'First%20Floor%20(second%20Shelf)', setBooks: setSecondShelfBooks },
      { shelf: 'First%20Floor%20(third%20Shelf)', setBooks: setThirdShelfBooks },
    ];

    shelves.forEach(({ shelf, setBooks }) => fetchBooksForShelf(shelf, setBooks));
  }, []);

  const renderBookTable = (shelfName, books) => {
    return (
      <Col>
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>{shelfName}</Card.Title>
            {books.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Book ID</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Availability</th>
                    <th>Location</th>
                    <th>Created At</th>
                    <th>Updated At</th>
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
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p className="mt-3">No books available for {shelfName}</p>
            )}
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="mt-4">BOOKS IN FIRST FLOOR</h1>
        </Col>
      </Row>
      <Row>
        {renderBookTable('First Floor (first Shelf)', firstShelfBooks)}
        {renderBookTable('First Floor (second Shelf)', secondShelfBooks)}
        {renderBookTable('First Floor (third Shelf)', thirdShelfBooks)}
      </Row>
    </Container>
  );
};

export default Location;
