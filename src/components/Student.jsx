import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faMailBulk, faUser, faCheck, faXmark, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
// import { faUser, faHouse, faGraduationCap, faRightFromBracket, faKey, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import { EffectCube, Pagination, Navigation, EffectFlip, EffectCards } from 'swiper/modules';
import Back from './Back';
import MailFormModal from '../components/MailFormModal'
import Accordion from 'react-bootstrap/Accordion'
import CourseRegis from './CourseRegis';



const Student = () => {

    const navigate = useNavigate();
    const student = useLocation();
    const data = student.state.student;
    console.log(data)
    const id = data.username.split('s')[1];
    // console.log(data);
    const token = localStorage.getItem('token');
    const [studentData, setStudentData] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [teacherEmail, setTeacherEmail] = useState('');
    const [regis, setRegis] = useState([]);
    const [course, setCourse] = useState([]);
    const [approve, setApprove] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const openModal = (e) => {
        // const email = e;x
        setEmail(e);
        const tmail = localStorage.getItem('token').split(':')[0] + '@rmutsv.ac.th';
        setTeacherEmail(teacherEmail);
        console.log(tmail);
        console.log(e);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };


    const checkStudentStatus = (studentstatus, studentstatusname) => {
        if (studentstatus === 'R') {
            return (
                <span className='badge bg-success' style={{ width: '50px' }}>
                    {studentstatusname}

                </span>
            )
        } else {
            return (
                <span className='badge bg-warning'>
                    {studentstatus} {studentstatusname}

                </span>
            )
        }
    }





    useEffect(() => {

        if (window.innerWidth < 768) {
            setIsSmallScreen(true);
        }
        if (!token) {
            window.location.href = '/login';
        } else {

            const regisApi = `${import.meta.env.VITE_API_URL}/student/regis/${id}/${token}`;
            const fetchRegis = async () => {
                const response = await fetch(regisApi);
                const data = await response.json();
                console.log('regis = ', data);
                setRegis(data);
                setCourse(data.course);

            }
            fetchRegis();


            const apiEndpoint = `${import.meta.env.VITE_API_URL}/student/grade/${id}/${token}`;
            const fetchData = async () => {
                const response = await fetch(apiEndpoint);
                const data = await response.json();
                console.log('grade = ', data);
                setStudentData(data);
                document.title = ` รายงานผลการเรียน `;


                const semesters = data.semester;

                setSemesters(semesters);
            };
            fetchData();
        }
    }, [token]);

    useEffect(() => {
        if (data === undefined) {
            navigate('/login');
        }
    }
        , [data]);





    return (
        <div className='container mt-2'>

            {/* <Back /> */}
            <div className="col col-lg-6 mx-auto card">
                <div className="card-body text-start">
                    <h5 className="card-title text-center p-2 rounded-5 shadow-3 bg-dark 
                    text-light">รายงานผลการเรียน</h5>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>ข้อมูลส่วนบุคคล</Accordion.Header>
                            <Accordion.Body>
                                <div className="d-flex flex-column justify-content-start align-items-start">
                                    <span className="card-text">ชื่อ : {data.name}</span>
                                    <span className="card-text">รหัสนักศึกษา : {studentData.id}</span>
                                    <span className="card-text">สาขา : {data.secname}</span>
                                    <span className="card-text">คณะ : {data.facname}</span>
                                    <span className='card-text'>เกรดเฉลี่ยสะสม <span className='badge bg-dark'>{studentData.gpa}</span></span>
                                    <span className='card-text'>สถานะ {' : '}

                                        {checkStudentStatus(studentData.studentstatus, studentData.studentstatusname)}
                                        {/* <span className='badge bg-dark'>
                                            {studentData.studentstatus} {studentData.studentstatusname}

                                        </span> */}

                                    </span>
                                </div>
                                <div className=" justify-content-center  align-items-center">

                                    <div>
                                        <span className='badge bg-dark'>หน่วยกิตที่สอบผ่าน <span className='badge bg-success' >{studentData.earncredit}</span></span>
                                    </div>
                                    <div>
                                        <span className='badge bg-dark'>หน่วยกิตที่ลงทะเบียน <span className='badge bg-primary'>{studentData.regiscredit}</span></span>
                                    </div>
                                </div>
                                <hr />
                                อาจารย์ที่ปรึกษา :
                                {studentData.supervisor?.map((item, index) => (
                                    <div className="d-flex flex-column justify-content-around " key={index}>

                                        <div >
                                            <FontAwesomeIcon icon={faUser} className='text-dark ' style={{ width: '20px' }} />
                                            <span className="badge bg-primary mx-2">{item.supervisor}</span>
                                        </div>
                                        <div>
                                            <FontAwesomeIcon icon={faMailBulk} className='text-dark ' style={{ width: '20px' }} />
                                            <span className="badge bg-primary mx-2">{item.epassport}</span>
                                            <span className="badge bg-dark text-light"
                                                onClick={e => openModal(item.epassport)}
                                            >ส่ง email</span>
                                            <MailFormModal isOpen={modalIsOpen} closeModal={closeModal} teacherEmail={item.email} email={item.epassport} token={token} />
                                        </div>


                                    </div>
                                ))}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>ข้อมูลการลงทะเบียนภาคเรียนปัจจุบัน</Accordion.Header>
                            <Accordion.Body>
                                <div className=" p-2" >

                                    <span className='text-center mb-2'> {regis.text2}</span>
                                    <div className="d-flex justify-content-between mb-2 align-items-center">
                                        <span className='badge bg-dark'>รหัสวิชา</span>
                                        <span className='badge bg-dark'>ชื่อวิชา</span>
                                        <span className='badge bg-dark'>สถานะ</span>
                                    </div>

                                    {typeof course !== 'undefined' && course.map((item, index) =>
                                        <ul className="list-group" key={index}>

                                            <li className={`list-group-item d-flex justify-content-around align-items-center rounded-pill my-1 ${index % 2 === 0 && 'bg-info-light shadow'}`} >

                                                <div style={{ width: '50%' }} >

                                                    <span className='badge text-left text-dark'>{item.courseid}</span>
                                                </div>

                                                <div className="d-flex" style={{ width: '100%' }}>
                                                    <span
                                                        className='badge text-wrap d-block text-dark'
                                                        style={{ width: '100%', textAlign: 'left' }}
                                                    >
                                                        {item.coursename}
                                                    </span>

                                                </div>

                                                <div className="d-flex">

                                                    {item.advisorok === 'Y' && item.deanok === 'Y' && item.majorok === 'Y' && item.officerok === 'Y' && item.vicedeanok === 'Y' ? <span className={`badge bg-success  bg-gradient  rounded`}><FontAwesomeIcon icon={faCheck} /></span> : <span className={`badge bg-danger rounded`}><FontAwesomeIcon icon={faCheck} /></span>}
                                                    {/* <span className="badge bg-dark mx-1">{item.advisorok}</span>
                                                    <span className="badge bg-dark mx-1">{item.deanok}</span>
                                                    <span className="badge bg-dark mx-1">{item.majorok}</span>
                                                    <span className="badge bg-dark mx-1">{item.officerok}</span> */}


                                                    {item.coursestatus === 'W' && <span className={`badge bg-danger rounded-pill`}>{item.coursestatus}</span>}
                                                </div>


                                            </li>
                                        </ul>
                                    )
                                    }



                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>


                </div>
            </div>




            <div className="row my-2" key={studentData.text2}>
                <div className="container col-lg-6 mx-auto" >
                    <div className="card m-2 ">
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            // navigation={true}
                            modules={[EffectCube, Pagination, Navigation, EffectFlip, EffectCards]}
                            effect='cube'
                            pagination={{ clickable: true, position: 'top' }}
                            className='  p-2 m-3'
                            key={studentData.id}

                            style={{ position: 'relative' }}
                            navigation={{
                                prevEl: '.custom-prev-button', // Selector for the previous button
                                nextEl: '.custom-next-button', // Selector for the next button
                            }}
                        >
                            {studentData.semester?.map((semester, index) => (
                                <SwiperSlide key={index}>


                                    <div className='bg-light shadow border rounded-4 p-2 m-3'>
                                        <h5 className="card-title text-center mb-2"> {semester.text2}</h5>


                                        <div className="d-flex flex-column p-2 mx-auto">
                                            <div className='d-flex justify-content-between align-items-center '>
                                                <span className="me-2">หน่วยกิตที่ลงทะเบียน</span>
                                                <span className="badge bg-primary" style={{ width: '50px' }}>{semester.regiscredit}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className="me-2">หน่วยกิตที่สอบผ่าน</span>
                                                <span className="badge bg-success" style={{ width: '50px' }}>{semester.earncredit}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className="me-2">เกรดเฉลี่ยภาคเรียน</span>
                                                <span className="badge bg-dark text-light" style={{ width: '50px' }}>{semester.gps}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className="me-2">เกรดเฉลี่ยสะสม</span>
                                                <span className="badge bg-dark text-light" style={{ width: '50px' }}>{semester.gpa}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className="me-2">สถานะ</span>
                                                {checkStudentStatus(semester.status, semester.statusname)}
                                                {/* <span className="badge bg-dark text-light" style={{ width: '50px' }}>{semester.statusname}</span> */}
                                            </div>

                                        </div>
                                        <div className="d-flex justify-content-between">

                                            {/* <div className="d-flex justify-content-between">
                                                <div>
                                                    <span className="me-2">เกรดเฉลี่ยสะสม</span>
                                                    <span className="badge bg-primary">{semester.gpa}</span>
                                                </div>

                                            </div> */}
                                        </div>





                                        {/* <div className="col d-flex flex-column justify-content-center align-items-center">
                                            <div className="d-flex justify-content-start align-items-center">
                                                <span className='badge bg-light text-dark rounded-pill rounded-pill d-flex justify-content-end  align-items-end m-2 w-50'>หน่วยกิตลงทะเบียน

                                                </span>
                                                <span className="badge bg-primary text-light rounded-pill rounded-pill d-flex justify-content-center  align-items-end m-2 w-50">{semester.regiscredit}</span>
                                            </div>

                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className='badge bg-light text-dark rounded-pill rounded-pill d-flex justify-content-end  align-items-end m-2 w-50'>หน่วยกิตสอบผ่าน

                                                </span>
                                                <span className="badge bg-primary text-light rounded-pill rounded-pill d-flex justify-content-center  align-items-end m-2 w-50">{semester.earncredit}</span>
                                            </div>
                                            <div className="d-flex d-flex justify-content-between align-items-center">
                                                <span className='badge bg-light text-dark rounded-pill rounded-pill d-flex justify-content-end  align-items-end m-2 w-50'>เกรดเฉลี่ยภาคเรียน </span>
                                                <span className="badge bg-primary " style={{ display: 'block', width: '100px' }}>{semester.gps}</span>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className='badge bg-light text-dark rounded-pill rounded-pill d-flex justify-content-end  align-items-end m-2 w-50'>เกรดเฉลี่ยสะสม</span>
                                                <span className="badge bg-primary " style={{ display: 'block', width: '100px' }}>{state.gpa}</span>
                                            </div>

                                        </div> */}

                                    </div>
                                    {semester.course.map((course, index) => (
                                        <ul className="list-group " key={index}>
                                            <li className={`list-group-item d-flex justify-content-around align-items-center rounded-pill my-1 ${index % 2 === 0 && 'bg-info-light shadow'}`}>
                                                <div style={{ width: '50%' }}>
                                                    <span className='badge text-left text-dark'>{course.courseid}</span>
                                                </div>
                                                <div style={{ width: '100%' }}>
                                                    <span className='badge text-wrap d-block text-dark' style={{ width: '100%', textAlign: 'left' }}>{course.coursename}</span>
                                                </div>
                                                <span className={`badge ${course.grade === 'F' ? 'bg-danger' : 'bg-primary'} rounded-pill`} style={{ width: '50px' }}>{course.grade}</span>
                                            </li>
                                        </ul>
                                    ))}
                                </SwiperSlide>
                            ))}
                            <div className="custom-prev-button">
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </div>
                            <div className="custom-next-button ">
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>
                        </Swiper>
                    </div>
                </div>
            </div>
            <nav className={`navbar-sm fixed-bottom justify-content-center ${isSmallScreen ? 'd-block' : 'd-none'}`} style={{ backgroundColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)' }}>
                <div className='p-1 d-flex justify-content-end'>
                    <Link to='/login' className='link-item p-2 mx-2 badge rounded-pill bg-danger'>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </Link>

                    {/* <p className='text-dark text-center'>สำนักวิทยบริการและเทคโนโลยีสารสนเทศ</p> */}
                </div>
            </nav>
        </div>
    )
}

export default Student