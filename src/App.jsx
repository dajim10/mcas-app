// src/App.jsx

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import ClassRoomList from './components/ClassRoomList';
import MyNavbar from './components/MyNavbar';
import About from './components/About'
import Members from './pages/Members';
import Footer from './components/Footer';
import LoginWithToken from './components/LoginWithToken';
// import StudentInfo from './components/StudentInfo';
import StudentSlider from './components/StudentSlider';
import bg from './assets/bg.jpg';
import CourseRegis from './components/CourseRegis';
import Student from './components/Student';
import Chat from './components/Chat';
import StudentCourse from './components/StudentCourse';
import PdfMerge from './components/PdfMerge';
import CourseWithdraw from './components/CourseWithdraw';
import SearchStudent from './components/SearchStudent';
import Statistics from './components/Statistics';
import StudentStatus from './components/StudentStatus';
import DataFetcher from './components/DataFetcher';





const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [studentId, setStudentId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
      setLoggedIn(true);
    }



    // check token timeout
    // const checkToken = async () => {
    //   const { tokenData } = await fetch(`${import.meta.env.VITE_API_URL}/elogin/token/${token}`)
    //   console.log(tokenData);
    //   if (tokenData) {
    //     setLoggedIn(true);
    //   } else {
    //     setLoggedIn(false);
    //     localStorage.removeItem('token');
    //   }
    // }
    // checkToken();

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
          <Route path="/login/:token" element={<LoginWithToken />} />
          <Route path="/about" element={<About />} />
          <Route path="/classroomlist" element={<ClassRoomList />} />
          <Route path="/members/:classid" element={<Members />} />
          <Route path="/studentinfo/:id" element={<StudentSlider />} />
          <Route path="/courseregis/:id" element={<CourseRegis />} />
          <Route path="/coursewithdraw/:id" element={<CourseWithdraw />} />

          <Route path="/student" element={<Student />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/studentcourse" element={<StudentCourse />} />
          <Route path="/pdfmerge" element={<PdfMerge />} />
          <Route path="/searchstudent" element={<SearchStudent />} />
          <Route path="/statistics" element={<Statistics token={token} />} />
          <Route path="/studentstatus" element={<StudentStatus />} />
          <Route path="/datafetcher" element={<DataFetcher token={token} />} />
        </Routes>
      </Container>

      <Footer />

    </>
  );
};

export default App;
