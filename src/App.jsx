// src/App.jsx

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import ClassRoomList from './components/ClassRoomList';
import MyNavbar from './components/MyNavbar';
import About from './components/about'
import Members from './pages/Members';
import Footer from './components/Footer';




const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if the user is logged in
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Implement logout logic (clear session, reset state, etc.)
    setLoggedIn(false);
  };

  const handleSelect = () => {
    // Close the Navbar when a menu item is selected
    setLoggedIn(true);
  };

  return (
    <>

      {/* <LoginForm /> */}

      <MyNavbar token={token} />
      <Container>
        <Routes>
          <Route path="/" element={<Home token={token} />} />
          <Route path="/login" element={<LoginForm setLoggedIn={setLoggedIn} />} />
          <Route path="/about" element={<About />} />
          <Route path="/classroomlist" element={<ClassRoomList />} />
          <Route path="/members/:classid" element={<Members />} />
        </Routes>
      </Container>
      <Footer />

    </>
  );
};

export default App;
