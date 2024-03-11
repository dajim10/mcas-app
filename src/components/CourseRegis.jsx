import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import Back from './Back';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/fontawesome-free-solid';
import Accordion from 'react-bootstrap/Accordion'


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

    const statusApprove = (status) => {
        switch (status) {
            case 'Y':
                return <span className='badge bg-success ms-2'>อนุมัติ</span>
            case 'E':
                return <span className='badge bg-warning text-dark ms-2'>ยังไม่อนุมัติ</span>
            case 'N':
                return <span className='badge bg-danger ms-2'>ไม่อนุญาตให้ถอน</span>
            default:
                return;
        }

    }

    const confirmStatus = (status) => {
        if (status === 'R') {
            return <span className='badge bg-secondary  ms-2'></span>
        } else if (status === 'W') {
            return <span className='badge bg-success'>อนุมัติ</span>
        } else {
            return 'ไม่อนุมัติ'
        }
    }


    return (
        <div className='container mt-2'>

            <div className="col-lg-6 mx-auto">
                <div className="card">
                    <div className="card-body">

                        <div className="d-flex flex-column  align-items-center">
                            <img src={state.pic} alt="pic" width="100" className='rounded-3 m-2 border shadow' />

                            <h5 className="card-title">รหัสนักศึกษา : {studentData.id}</h5>
                            <span>ชื่อ - สกุล : {state.name}</span>
                            <span>GPA. : {state.gpa}</span>
                            <span>อาจารย์ที่ปรึกษา</span>
                            <div className='d-flex align-items-center justify-content-start'>
                                <div className='d-flex flex-column'>
                                    {studentData.supervisor?.map((item, index) =>
                                        <li className="badge bg-dark" key={index}>{item.supervisor} {item.priority && <span className='badge rounded-pill bg-danger '>{item.priority}</span>}</li>
                                    )}
                                </div>

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
                            <Accordion>
                                {studentData.course?.map((item, index) =>
                                    <Accordion.Item eventKey={index} key={index}>
                                        <>
                                            <Accordion.Header key={index} >
                                                <span className="badge bg-primary mx-2 rounded-pill">{index + 1}</span>
                                                <span className='badge bg-dark text-wrap' style={{ width: 'auto', textAlign: 'left' }}>{item.coursename}</span>
                                                {confirmStatus(item.coursestatus)
                                                }
                                            </Accordion.Header>
                                            <Accordion.Body>

                                                <ul className='list-group'>
                                                    <li className="list-group-item badge ">
                                                        รหัสวิชา :
                                                        {item.courseid}
                                                    </li>

                                                    <li className="list-group-item badge">
                                                        {item.vicecampusname}
                                                        <div>
                                                            ผอ.สวท./รองอธิการ
                                                            {statusApprove(item.vicecampusok)}
                                                        </div>
                                                    </li>

                                                    <li className="list-group-item badge">
                                                        <div>
                                                            {item.deanname}
                                                        </div>
                                                        คณบดี/ผอ.วิทยาลัย {statusApprove(item.deanok)}
                                                    </li>
                                                    <li className="list-group-item badge text-warp">
                                                        {item.vicedeanname}

                                                        <div>
                                                            รองคณบดีฝ่ายวิชาการ / รองผอ.ฝ่ายวิชาการ
                                                            {statusApprove(item.vicedeanok)}</div>
                                                    </li>
                                                    <li className="list-group-item badge">
                                                        อ.ที่ปรึกษา {item.advisorname} {statusApprove(item.advisorok)}
                                                    </li>
                                                    <li className="list-group-item badge">
                                                        หัวหน้าหลักสูตร : {item.majorname} {statusApprove(item.majorok)}
                                                    </li>
                                                    <li className="list-group-item badge">
                                                        จนท.วิชาการคณะ/วิทยาลัย  {statusApprove(item.officerok)}
                                                    </li>






                                                </ul>


                                            </Accordion.Body>
                                        </>


                                    </Accordion.Item>
                                )}
                            </Accordion>

                            {/* {typeof course !== 'undefined' && course.map((item, index) =>
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

                                       

                                    </li>
                                </ul>
                            )
                            } */}



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