import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import Back from './Back';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/fontawesome-free-solid';

import Accordion from 'react-bootstrap/Accordion'

const CourseWithdraw = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const [studentData, setStudentData] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [coursewithdraw, setCourseWithdraw] = useState([]);
    const { state } = useLocation();
    // console.log('state: ', state);




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
                console.log(data.coursewithdraw)

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

    const widrawStatus = (status) => {
        if (status === 'R') {
            return <span className='badge bg-secondary  ms-2'>รออนุมัติ</span>
        } else if (status === 'Y') {
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
                        {/* <h5 className="card-title">ชื่อ : {stateData.name} </h5> */}
                        <div className="d-flex flex-column  align-items-center">
                            <img src={state.pic} alt="pic" width="100" className='rounded-3 mb-2 border shadow' />

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

                            <p className='text-center mb-2'>รายการถอนรายวิชา {studentData.text2}</p>
                            <Accordion>
                                {studentData.coursewithdraw?.map((item, index) =>
                                    <Accordion.Item eventKey={index}>
                                        <>
                                            <Accordion.Header key={index} >
                                                <span className="badge bg-primary mx-2 rounded-pill">{index + 1}</span>
                                                <span className='badge bg-dark'>{item.coursename}</span>
                                                {widrawStatus(item.coursestatus)
                                                }
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                {/* "courseid": "02211002",
            "coursename": "คณิตศาสตร์ 1",
            "section": "2",
            "coursetype": "วิชาในสาขา",
            "dateupdate": "17-02-2024",
            "timeupdate": "19:55:10",
            "coursestatus": "R",
            "instructionok": "E",
            "instructionname": "รศ.ผกากรอง  เทพรักษ์",
            "advisorok": "E",
            "majorok": "E",
            "majorname": "อ.ณัฐพล  หนูฤทธิ",
            "majornameorg": "วิศวกรรมคอมพิวเตอร์",
            "departmentok": "E",
            "departmentname": "อ.นงนาฎ  ระวังวงศ์",
            "departmentnameorg": "วิศวกรรมคอมพิวเตอร์" */}
                                                <ul className='list-group'>
                                                    <li className="list-group-item badge ">รหัสวิชา : {item.courseid}</li>
                                                    <li className="list-group-item badge">กลุ่มเรียน : {item.section}</li>
                                                    <li className="list-group-item badge">ประเภทวิชา : {item.coursetype}</li>
                                                    {/* localdateString */}

                                                    <li className="list-group-item badge">วันที่ถอน : {item.dateupdate}</li>
                                                    <li className="list-group-item badge">สถานะการขอถอนวิชา : {widrawStatus(item.coursestatus)}</li>
                                                    <li className="list-group-item badge">อาจารย์ที่สอน : {item.instructionname}
                                                        {statusApprove(item.instructionok)}

                                                    </li>

                                                    <li className="list-group-item badge ">อาจารย์ที่ปรึกษา :  {statusApprove(item.advisorok)}

                                                    </li>
                                                    <li className="list-group-item badge">หัวหน้าหลักสูตร : {item.majorname} {statusApprove(item.majorok)}
                                                    </li>
                                                    <li className="list-group-item badge">หัวหน้าสาขา : {item.departmentname} {statusApprove(item.departmentok)}</li>

                                                </ul>


                                            </Accordion.Body>
                                        </>


                                    </Accordion.Item>
                                )}
                            </Accordion>



                        </div>
                        <div>
                            <Back />
                        </div>
                    </div>

                </div>


            </div>


        </div >
    )
}

export default CourseWithdraw