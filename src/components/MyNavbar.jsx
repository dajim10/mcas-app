// MyNavbar.js
import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom'
import McasLogo from '../assets/logo80.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHouse, faGraduationCap, faRightFromBracket, faKey, faCircleInfo } from '@fortawesome/free-solid-svg-icons';




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

            <Navbar expand="lg" className='sticky-top'
                style={{
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    backdropFilter: 'blur(10px)'
                    , boxShadow: '0 0 10px #00000040'
                }}
            >
                <div className="container">
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            {/* <small className="text-wrap"> */}
                            {/* RUTS MCAS */}
                            {/* </small> */}
                            <img
                                src={McasLogo}

                                className="d-inline-block align-top"
                                alt="MCAS LOGO"
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
                                <>
                                    <LinkContainer to="/login">
                                        <Nav.Link onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} />{' '}Logout</Nav.Link>
                                    </LinkContainer>
                                </>
                            ) : null
                                // ) : (
                                //     <>
                                //         <LinkContainer to="/login">
                                //             <Nav.Link><FontAwesomeIcon icon={faKey} />{' '}Login</Nav.Link>
                                //         </LinkContainer>
                                //     </>
                                // )
                            }


                        </Nav>
                    </Navbar.Collapse>
                </div >
            </Navbar >
        </>
    );
};

export default MyNavbar;
