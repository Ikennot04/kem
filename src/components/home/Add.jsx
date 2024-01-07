import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import axios from "axios";

export let Add = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);

  const [bookname, setBookname] = useState("");
  const [author, setAuthor] = useState("");
  const [location, setLocation] = useState(""); // Updated to use for floor and shelf
  const [available, setAvailable] = useState(1);

  const [response, setResponse] = useState("");

  const addBookAPI = async (newBook) => {
    try {
      const response = await axios.post(
        "https://apex.oracle.com/pls/apex/kentoy_cs_workspace/libraryManagement/library",
        newBook
      );
      return response.data;
    } catch (err) {
      setResponse(err.response.data.message);
      return null;
    }
  };

  const handleAddBook = async () => {
    const newBook = {
      bookname: bookname,
      location: location,
      author: author,
      available: available,
    };

    const apiResponse = await addBookAPI(newBook);

    if (apiResponse) {
      // handling API response
      navigate("/home/books");
    } else {
      console.error("Failed to add/update book");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">Add a New Book</h5>
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Book Name"
                    value={bookname}
                    onChange={(e) => setBookname(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <select
                    className="form-select"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">Select Location</option>
                    <optgroup label="First Floor">
                      <option value="First Floor (first Shelf)">First Shelf</option>
                      <option value="First Floor (second Shelf)">Second Shelf</option>
                      <option value="First Floor (third Shelf)">Third Shelf</option>
                    </optgroup>
                    <optgroup label="Second Floor">
                      <option value="Second Floor (first Shelf)">First Shelf</option>
                      <option value="Second Floor (second Shelf)">Second Shelf</option>
                      <option value="Second Floor (third Shelf)">Third Shelf</option>
                    </optgroup>
                  </select>
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Available"
                    value={available}
                    onChange={(e) => setAvailable(parseInt(e.target.value))}
                  />
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleAddBook}
                  >
                    Add Book
                  </button>
                </div>
                {response && (
                  <p className="text-danger text-center mt-3">{response}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};