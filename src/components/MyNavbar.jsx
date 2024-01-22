// MyNavbar.js
import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom'
import McasLogo from '../assets/rutsMcasLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faGraduationCap, faRightFromBracket, faKey, faCircleInfo } from '@fortawesome/free-solid-svg-icons';


const MyNavbar = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate()
    const token = localStorage.getItem('token');





    useEffect(() => {
        // Check if the user is logged in
        if (token) {
            setLoggedIn(true);
        } else {
            navigate('/login')
        }

    }
        , [token]);

    const handleLogout = () => {
        // Implement logout logic (clear session, reset state, etc.)
        localStorage.removeItem('token');
        setLoggedIn(false);
    }


    return (
        <>

            <Navbar bg="light" expand="lg" className='sticky-top'>
                <div className="container">
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            <img
                                src={McasLogo}

                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />

                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {loggedIn && (
                            <Nav className="me-auto">
                                <LinkContainer to="/">
                                    <Nav.Link><FontAwesomeIcon icon={faHouse} />
                                        {' '}หน้าแรก</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/classroomlist">
                                    <Nav.Link><FontAwesomeIcon icon={faGraduationCap} /> {' '}รายชื่อห้องเรียน</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/about">
                                    <Nav.Link><FontAwesomeIcon icon={faCircleInfo} />{' '}ผู้พัฒนาระบบ</Nav.Link>
                                </LinkContainer>
                            </Nav>
                        )}
                        <Nav>
                            {loggedIn ? (
                                <Nav.Link onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} />{' '}Logout</Nav.Link>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link><FontAwesomeIcon icon={faKey} />{' '}Login</Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </>
    );
};

export default MyNavbar;
