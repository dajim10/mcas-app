// https://api.rmutsv.ac.th/student/grade/159404140067/kitisak.w:3H3bCyFX0VznA6C3q4irSGw9PXhvaEdYDuyzoip9pQSLpx864SYwGl7TTgmty0qK
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/fontawesome-free-solid';
import { Carousel } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/effect-cube'
import 'swiper/css/effect-flip'
import 'swiper/css/pagination'
import 'swiper/css/effect-cards'



import { EffectFlip, EffectCube, Pagination, EffectCards } from 'swiper/modules';

const StudentSlider = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const { state } = useLocation();
    const token = localStorage.getItem('token');
    const [studentData, setStudentData] = useState([]);
    const [semesters, setSemesters] = useState([]);
    // const [stateData, setStateData] = useState({
    //     name: name,
    //     gpa: gpa,
    // });
    console.log('state: ', state);


    useEffect(() => {
        // Check if the user is logged in


        if (!token) {
            window.location.href = '/login'
        } else {
            const apiEndpoint = `${import.meta.env.VITE_API_URL}/student/grade/${id}/${token}`;


            // const apiEndpoint = `${import.meta.env.VITE_API_URL}/teacher/supervisor/${token}`;
            // const token = localStorage.getItem('token');
            const fetchData = async () => {
                const response = await fetch(apiEndpoint);
                const data = await response.json();
                // console.log(data);
                setStudentData(data)
                const semesters = data.semester;
                console.log('semester: ', semesters);
                setSemesters(semesters);


            }
            fetchData();

        }
    }
        , [token]);




    return (
        <div>
            <h1 className='text-center'>ข้อมูลการเรียน</h1>

            <div className="row">
                <div className="col-auto mx-auto">
                    <div className="card">
                        <div className="card-body">
                            {/* <h5 className="card-title">ชื่อ : {stateData.name} </h5> */}
                            <h5 className="card-title">รหัสนักศึกษา : {studentData.id}</h5>
                            <p>ชื่อ - สกุล : {state.name}</p>
                            <p>เกรดเฉลี่ย : {state.gpa}</p>
                            <p className='btn btn-primary'>หน่วยกิจลงทะเบียน : {studentData.regiscredit}</p>
                            <p className='btn btn-primary'>หน่วยกิจเรียนผ่าน : {studentData.earncredit}</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className='my-2'>
                <FontAwesomeIcon icon={faChevronLeft} onClick={() => navigate(-1)} className='btn btn-warning rounded' />

            </div>
            <div className="row my-2" key={studentData.id}>

                <div className="container" >
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        modules={[EffectCube, Pagination]}
                        effect='cube'
                        pagination={{ clickable: true }}
                        className='  p-2 m-3'
                    >

                        {studentData.semester?.map((semester, index) => (
                            <SwiperSlide>

                                {/* <div className="row"> */}
                                {/* <div className="col-lg-4 col-md mx-auto"> */}
                                {/* <div className="card m-2" key={index}> */}
                                {/* <div className="card-body"> */}

                                <div className='bg-light shadow border rounded-4 p-2 m-3'>
                                    <h5 className="card-title text-center mb-2">ภาคเรียนที่ {semester.text1}</h5>
                                    <span className='badge bg-light text-dark rounded-pill rounded-pill d-flex justify-content-start mb-2'>หน่วยกิจลงทะเบียน : {semester.regiscredit}</span>
                                    <span className='badge bg-light text-dark rounded-pill rounded-pill d-flex justify-content-start mb-2'>หน่วยกิจเรียนผ่าน : {semester.earncredit}</span>
                                    <span className='badge bg-light text-dark rounded-pill rounded-pill d-flex justify-content-start mb-2'>GPS : {semester.gps}
                                    </span>
                                </div>

                                {semester.course.map((course, index) => (
                                    <ul className="list-group">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <span className='badge text-center text-wrap text-left  text-dark'>{course.coursename}</span>
                                            <span className={`badge ${course.grade === 'F' ? 'bg-danger' : 'bg-primary'} rounded-pill`}>
                                                {course.grade}
                                            </span>

                                        </li>
                                    </ul>
                                ))}




                                {/* <p>
                                            <a className="btn btn-outline-dark rounded-pill" data-bs-toggle="collapse" href={`#semester${index}`} role="button" aria-expanded="false" aria-controls="collapseExample">
                                                ดูรายวิชา
                                            </a>
                                        </p> */}
                                {/* </div> */}
                                {/* </div> */}
                                {/* </div> */}
                                {/* </div> */}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* <div id="back">


                <FontAwesomeIcon icon={faChevronLeft} onClick={() => navigate(-1)} className='bg-warning  p-3 my-5 rounded' />

            </div> */}

        </div>
    )
}

export default StudentSlider