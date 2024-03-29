import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'; // Import the necessary icons
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import { EffectCube, Pagination, Navigation, EffectFlip, EffectCards } from 'swiper/modules';

const StudentSlider = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { state } = useLocation();
    const token = localStorage.getItem('token');
    const [studentData, setStudentData] = useState([]);
    const [semesters, setSemesters] = useState([]);

    useEffect(() => {
        if (!token) {
            window.location.href = '/login';
        } else {

            const apiEndpoint = `${import.meta.env.VITE_API_URL}/student/grade/${id}/${token}`;
            const fetchData = async () => {
                const response = await fetch(apiEndpoint);
                const data = await response.json();
                console.log('grade: ', data);
                setStudentData(data);
                const semesters = data.semester;
                setSemesters(semesters);
            };
            fetchData();
        }
    }, [token]);

    const checkStatusName = (status) => {
        switch (status) {
            case 'R':
                return 'ปกติ';
            case 'C1':
                return 'วิกฤติ';
            case 'WITHDRAW':
                return 'ถูกถอนชื่อ';
            case 'CHEAT':
                return 'ถูกพักการเรียน';
            case 'GRADUATE':
                return 'สำเร็จการศึกษา';
            case 'RETIRE':
                return 'Retire';
            default:
                return 'Unknown'; // Default status for unknown status
        }
    };

    const getStatusTextClass = (status) => {
        switch (status) {
            case 'R':
                return 'bg-success';
            case 'WITHDRAW' || 'CHEAT':
                return 'bg-danger ';
            case 'GRADUATE':
                return 'bg-primary  shadow';
            case 'RETIRE':
                return 'bg-secondary ';

            default:
                return 'bg-warning'; // Default color for unknown status
        }
    };

    return (
        <div>
            <h1 className='text-center'>ข้อมูลการเรียน</h1>
            <div className="row text-center">
                <div className="col-auto mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <img src={state.pic} alt="pic" width="100" className='rounded-4 m-2  shadow-lg' />
                            <p className="btn-primary text-light rounded shadow m-2 p-2 card-title">รหัสนักศึกษา : {studentData.id}</p>
                            <span>ชื่อ - สกุล : {state.name}</span><br />
                            <span>GPA. : {state.gpa}</span><br />
                            <span className={`badge ${getStatusTextClass(state.status)} rounded-pill`}>สถานะ : {checkStatusName(state.status)}</span><br />
                            <span>อาจารย์ที่ปรึกษา</span>
                            <div className='d-flex flex-column align-items-center justify-content-center '>
                                {studentData.supervisor?.map((item, index) =>
                                    <li className="badge bg-dark" key={index}>{item.supervisor} {item.priority && <span className='badge rounded-pill bg-danger '>{item.priority}</span>}</li>
                                )}
                            </div>
                            <div className='d-flex align-items-center justify-content-center'>

                                <span className='badge btn-primary rounded-pill mb-1 '>หน่วยกิตลงทะเบียน : {studentData.regiscredit}</span>

                            </div>

                            <div className='d-flex align-items-center justify-content-center'>

                                <span className='badge bg-success rounded-pill'>หน่วยกิตสอบผ่าน : {studentData.earncredit}</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className='my-2'>
                <FontAwesomeIcon icon={faChevronLeft} onClick={() => navigate(-1)} className='btn btn-warning rounded' />
            </div>
            <div className="row my-2" key={studentData.id}>
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
                                <SwiperSlide key={studentData.id}>


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
                                                <span className="badge bg-dark text-light" style={{ width: '50px' }} >{semester.gpa}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className="me-2">สถานะ</span>
                                                <span className={`badge form-control ${semester.status === 'R' ? 'bg-success ' : 'bg-warning text-dark '} `} >{semester.statusname}</span>
                                            </div>
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
                                        <ul className="list-group" key={index}>
                                            <li className={`list-group-item d-flex justify-content-around align-items-center rounded-pill my-1 ${index % 2 === 0 && 'bg-info-light shadow'}`} >
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
        </div>
    )
}

export default StudentSlider;
