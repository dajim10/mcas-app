import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import Back from './Back';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/fontawesome-free-solid';

const CourseRegis = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const [studentData, setStudentData] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [course, setCourse] = useState([]);
    const { state } = useLocation();
    console.log('state: ', state);




    useEffect(() => {
        // Check if the user is logged in

        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login')
        } else {
            const apiEndpoint = `${import.meta.env.VITE_API_URL}/student/regis/${id}/${token}`;
            const fetchData = async () => {
                const response = await fetch(apiEndpoint);
                const data = await response.json();
                console.log(data);
                setStudentData(data)
                console.log(data.course)
                setCourse(data.course);
                const semesters = data.semester;
                // console.log('semester: ', semesters);
                setSemesters(semesters);
            }
            fetchData();

        }
    }
        , []);


    return (
        <div className='container mt-2'>

            <div className="col-lg-6 mx-auto">
                <div className="card">
                    <div className="card-body">
                        {/* <h5 className="card-title">ชื่อ : {stateData.name} </h5> */}
                        <div className="d-flex flex-column  align-items-center">
                            <img src={state.pic} alt="pic" width="100" className='rounded-3 m-2 border shadow' />

                            <h5 className="card-title">รหัสนักศึกษา : {studentData.id}</h5>
                            <span>ชื่อ - สกุล : {state.name}</span>
                            <span>GPA. : {state.gpa}</span>
                            <span>อาจารย์ที่ปรึกษา</span>
                            <div className='d-flex align-items-center justify-content-start'>

                                {studentData.supervisor?.map((item, index) =>
                                    <li className="badge bg-dark" key={index}>{item.supervisor} {item.priority && <span className='badge rounded-pill bg-danger '>{item.priority}</span>}</li>
                                )}

                            </div>

                        </div>


                        {/* <div className="d-flex justify-content-center align-items-center">
                            <span className='badge bg-primary m-2'>หน่วยกิตลงทะเบียน : {state.regiscredit}</span>
                            <span className='badge bg-success m-2'>หน่วยกิตสอบผ่าน : {state.earncredit}</span>
                        </div> */}

                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 mx-auto">
                    <div className="card mt-2">



                        <div className=" p-2">

                            <p className='text-center mb-2'>รายวิชาลงทะเบียน {studentData.text2}</p>

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


                                            {item.coursestatus === 'W' && <span className={`badge bg-danger rounded-pill`}>{item.coursestatus}</span>}
                                        </div>

                                        {/* <div className="d-flex" style={{ width: '100%' }}>
                                            <span
                                                className='badge text-wrap d-block text-dark'
                                                style={{ width: '100%', textAlign: 'left' }}
                                            >
                                                {item.coursename}
                                            </span>

                                            <span className={`badge text-wrap justify-content-center align-items-center text-center ${item.advisorok === 'Y' ? 'bg-success' : 'bg-danger'} rounded-pill`}>{item.advisorok}</span>
                                            {item.coursestatus === 'W' && <span className={`badge bg-warning rounded-pill`}>{item.coursestatus}</span>}



                                        </div> */}


                                        {/* <span className={`badge ${course.grade === 'F' ? 'bg-danger' : 'bg-primary'} rounded-pill`}>
{course.grade}
</span> */}

                                    </li>
                                </ul>
                            )
                            }



                        </div>
                        <div>
                            <Back />
                        </div>
                    </div>

                </div>


            </div>


        </div>
    )
}

export default CourseRegis