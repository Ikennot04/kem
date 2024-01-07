import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Home.css'; // Import your custom CSS file

export let Home = () => {
  const navigate = useNavigate();

  const handleSignout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    
    <div className="container-fluid container-background">
      <div className="row">
        <div className="col-15">
         
        </div>
        <div className="ps-15">
          <Navbar expand="lg" bg="light" variant="light">
            <Navbar.Brand>
              <div className="nav-logo mx-5">CogniNex Library</div>
              <div className="nav-logo-5 mx-5">Discover worlds within words at our library.</div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="navigation-colapse" />
            <Navbar.Collapse>
              <Nav className="w-75">
                <Link className="navigation-links nav-link" to="firstfloor">
                  FIRST FLOOR
                </Link>
                <Link className="navigation-links nav-link" to="secondfloor">
                  SECOND FLOOR
                </Link>
                <Link className="navigation-links nav-link" to="books">
                  BOOKS
                </Link>
                <Link className="navigation-links nav-link" to="add">
                  ADD A BOOK
                </Link>
               
              </Nav>
              <Nav className="w-25 justify-content-end">
                <Nav.Link
                  onClick={handleSignout}
                  className="navigation-links signout-btn d-flex align-items-center"
                >
                  <i className="bi bi-person-circle mx-1"></i>
                  Sign out
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
