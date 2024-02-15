// MyNavbar.js
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom'
import McasLogo from '../assets/logo80.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHouse, faGraduationCap, faRightFromBracket, faKey, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import Student from './Student';
import io from 'socket.io-client'





const MyNavbar = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('type');
    const [userName, setUserName] = useState('')
    const [room, setRoom] = useState('')
    const [smallScreen, setSmallScreen] = useState(false)




    // const socket = io.connect('http://localhost:3000')

    // import.meta.env.VITE_API_URL




    // const joinRoom = () => {
    //     setUserName(token.split(':')[0])
    //     setRoom(token.split(':')[1])

    //     if (userName !== '' && room !== '') {
    //         socket.emit('join_room', room)
    //     }
    // }


    useEffect(() => {
        const windowWidth = window.innerWidth;
        // console.log(windowWidth)
        if (windowWidth < 768) {
            setSmallScreen(true)
            // console.log(smallScreen)
        } else {
            setSmallScreen(false)
        }
    }, [])


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
        // localStorage.removeItem('type')
        setLoggedIn(false);
    }


    return (
        <>

            {userType === 'student' ?
                <>

                    {/* <Navbar expand="lg" className={`${smallScreen === true ? 'fixed-bottom' : 'sticky-top'}`} id="main-nav" */}
                    <Navbar expand="lg" className='sticky-top' id="main-nav"
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.5)',
                            backdropFilter: 'blur(10px)'
                            , boxShadow: '0 0 10px #00000040'
                        }}
                    >
                        <div className="container">

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
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                {loggedIn && (
                                    <Nav className="me-auto">
                                        {/* <LinkContainer to="/">
                                        <Nav.Link><FontAwesomeIcon icon={faHouse} />
                                            {' '}หน้าแรก</Nav.Link>
                                    </LinkContainer> */}
                                        {/* <LinkContainer to={`/student}`}>
                                        <Nav.Link><FontAwesomeIcon icon={faGraduationCap} /> {' '}ข้อมูลส่วนบุคคล</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/about">
                                        <Nav.Link><FontAwesomeIcon icon={faCircleInfo} />{' '}ผู้พัฒนาระบบ</Nav.Link>
                                    </LinkContainer> */}
                                    </Nav>
                                )}
                                <Nav>
                                    {loggedIn ? (
                                        <>
                                            <LinkContainer to="/login">


                                                <Nav.Link onClick={handleLogout}>
                                                    <FontAwesomeIcon icon={faRightFromBracket} />
                                                </Nav.Link>
                                            </LinkContainer>
                                        </>
                                    ) : null

                                    }


                                </Nav>
                            </Navbar.Collapse>

                        </div>


                    </Navbar >

                </>
                :


                // <Navbar expand="lg" className={`${smallScreen === true ? 'fixed-bottom bg-success bg-gradient' : 'sticky-top'}`}
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


                                            <Nav.Link onClick={handleLogout}>User Id:{' '}
                                                <button className='btn btn-outline-dark btn-sm'>{token.split(':')[0]}</button>{' '}<FontAwesomeIcon icon={faRightFromBracket} />
                                            </Nav.Link>
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

            }


        </>
    );
};

export default MyNavbar;
