import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import BarChart from '../components/BarChart'
import MailFormModal from '../components/MailFormModal'
import Accordion from 'react-bootstrap/Accordion';
// import { FontAwesomeIcon } from '@fortawesome_fontawesome-free-solid'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faEnvelope, faChevronLeft, faClone, faPhone } from '@fortawesome/fontawesome-free-solid'

import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import SpanControl from '../components/SpanControl'
import StudentChart from '../components/StudentChart'

const Members = () => {

    const { classid } = useParams();
    const token = localStorage.getItem('token');
    const [members, setMembers] = useState([]);
    const [memberSummary, setMemberSummary] = useState([]);
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [teacherEmail, setTeacherEmail] = useState('');
    const [email, setEmail] = useState('');
    const [course, setCourse] = useState([]);
    const { state } = useLocation();
    const [vigrid, setVigrid] = useState(0);
    const [normal, setNormal] = useState(0);
    const [total, setTotal] = useState(0);
    const [graduate, setGraduate] = useState(0);
    const [unGraduate, setUngraduate] = useState(0);
    const [retire, setRetire] = useState(0);
    const [studentStatus, setStudentStatus] = useState([]);



    const checkStatusColor = (status) => {
        switch (status) {
            case 'R':
                return 'bg-success';
            case 'WITHDRAW':
                return 'bg-danger';
            case 'GRADUATE':
                return 'bg-primary  shadow';
            case 'RETIRE':
                return 'bg-secondary text-dark';
            case 'RESIGN':
                return 'bg-danger ';

            default:
                return 'bg-warning text-dark'; // Default color for unknown status
        }
    }

    const openModal = (e) => {
        // const email = e;
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

    const checkStatus1 = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/teacher/class/${classid}/${token}`);
        setMembers(data.members.filter((member) => member.status === 'C1'));
    }

    const checkStatus2 = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/teacher/class/${classid}/${token}`);
        setMembers(data.members.filter((member) => member.status === 'R'));
    }

    const graduateFetch = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/teacher/class/${classid}/${token}`);
        setMembers(data.members.filter((member) => member.status === 'GRADUATE'));
    }

    const unGraduateFetch = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/teacher/class/${classid}/${token}`);
        setMembers(data.members.filter((member) => member.status !== 'GRADUATE' && member.status !== 'WITHDRAW'));
    }

    const retireFetch = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/teacher/class/${classid}/${token}`);
        setMembers(data.members.filter((member) => member.status === 'RETIRE'));
    }


    const copyToClipboard = (text) => {
        // e.preventDefault();
        const value = text;
        console.log(value);
        navigator.clipboard.writeText(value);
        Swal.fire({
            title: 'Copy to clipboard',
            text: 'คัดลอกไปยังคลิปบอร์ดแล้ว',
            icon: 'success',
            timer: 1000,
            showConfirmButton: false,
        })


    }

    const notconfirmallnum = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/teacher/class/${classid}/${token}`);
        setMembers(data.members.filter((member) => member.confirm === 0));
    }


    const confirmallnum = async () => {

        setMembers(memberSummary.confirmallmembers);
    }

    const clearFilter = () => {
        fetchStudent();
    }

    const paidsuccessnum = async () => {
        setMembers(memberSummary.paidsuccessallmembers);
    }

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
            case 'RESIGN':
                return 'bg-danger ';

            default:
                return 'bg-warning text-dark'; // Default color for unknown status
        }
    };




    const handleSearch = (e) => {
        e.preventDefault();
        const search = e.target.value;
        console.log(search);

        if (search === '') {
            fetchStudent();
            return;
        }

        const filterMembers = members.filter((member) => {
            return member.fname.includes(search) || member.lname.includes(search) || member.id.includes(search) || member.email.includes(search) || member.gpa.includes(search) || member.statusname.includes(search);
        })
        setMembers(filterMembers);

    }

    // *** mac edit add graduate function ***

    //  end mac edit graduate function 

    const paidUnsccess = async () => {

        // const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/teacher/class/${classid}/${token}`);
        // setMembers(data.members.filter((member) => member.sumaccmoney < member.sumregismoney && member.fundtype !== 'Y'));
        setMembers(memberSummary.paidunsuccessallmembers);

    }

    const preservnum = async () => {

        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/teacher/class/${classid}/${token}`);
        setMembers(data.members.filter((member) => member.numpreserv === 1));

    }

    const notprevervnum = async () => {

        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/teacher/class/${classid}/${token}`);
        setMembers(data.members.filter((member) => member.numpreserv === 0));

    }

    const notregispreservnum = async () => {

        // const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/teacher/class/${classid}/${token}`);
        // setMembers(data.members.filter((member) => member.numpreserv === 0 && member.status !== 'WITHDRAW'));
        setMembers(memberSummary.notregispreservmembers);

    }


    const notwithdrawall = async () => {

        // const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/teacher/class/${classid}/${token}`);
        // setMembers(data.members.filter((member) => member.status !== 'WITHDRAW'));
        setMembers(memberSummary.notwithdrawallmembers);

    }

    const withdrawallnum = async () => {

        // const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/teacher/class/${classid}/${token}`);
        // setMembers(data.members.filter((member) => member.status === 'WITHDRAW'));
        setMembers(memberSummary.withdrawallmembers);
    }





    const fetchStudent = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/teacher/class/${classid}/${token}`);
        setMembers(data.members);
        setVigrid(data.members.filter((member) => member.status === 'C1').length);
        setNormal(data.members.filter((member) => member.status === 'R').length);
        setGraduate(data.members.filter((member) => member.status === 'GRADUATE').length);
        setUngraduate(data.members.filter((member) => member.status !== 'GRADUATE' && member.status !== 'WITHDRAW').length)
        setTotal(data.members.length);
        setRetire(data.members.filter((member) => member.status === 'RETIRE').length);
        // setVigrid(data.members.filter((status) => status === 'C1').length);
        console.log(data.members);
    }

    const fetchMemberSummary = async () => {

        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/teacher/trace/${classid}/${token}`);
        setMemberSummary(data);
        console.log(data);
        setStudentStatus(data.studentstatus);
        console.log(data.studentstatus);
    }

    const fundNum = async () => {

        setMembers(memberSummary.fundmembers);

    }

    const courseName = (id) => {

        const apiEndpoint = `${import.meta.env.VITE_API_URL}/student/regis/${id}/${token}`;
        const fetchData = async () => {
            const response = await fetch(apiEndpoint);
            const data = await response.json();
            console.log(data);
            setCourse(data.course);

        }
        fetchData();
        return (
            <>
                {course.map((item, index) =>

                    <li className="nav-link" key={index}>
                        <span className='badge bg-primary m-2'>{index + 1}</span>
                        <p className='badge bg-dark'>{item.courseid} {item.coursename}</p>
                    </li>
                )
                }
            </>
        )
    }





    useEffect(() => {
        if (!token) {
            navigate('/login')
        }


        fetchStudent();
        fetchMemberSummary();

    }
        , [token]);



    return (
        <>
            {/* search input */}
            {/* <BarChart /> */}
            <div className="container-fluid sticky-top mt-2">
                <div className="row py-3"
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '10px',

                    }}>
                    <div >
                        <div className="input-group mb-2 ">
                            {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
                            <input type="text" className="form-control" placeholder="ค้นหานักศึกษา" aria-label="Recipient's username" aria-describedby="button-addon2"
                                onChange={handleSearch}
                            />

                            {/* <span className='field-icon' >

                                <FontAwesomeIcon icon={faCircleXmark} />
                            </span> */}

                        </div>
                    </div>

                    {/*  */}
                    <div className="row ">
                        <div className="col-sm d-flex  justify-content-center align-items-center">



                            <span className="badge bg-dark m-2 position-relative p-2 form-control" onClick={fetchStudent}>จำนวนทั้งหมด
                                <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                                    {total}
                                </span>
                            </span>



                        </div>

                    </div>
                    <div className="row">
                        <div className="col-sm d-flex flex-wrap justify-content-between align-items-center">

                            {/* studentStatus from api */}

                            {studentStatus.map((status, index) => (
                                <span key={index} className={`badge ${checkStatusColor(status.status)} m-2 position-relative p-2 `} style={{ width: '100px' }} onClick={() => setMembers(status.Members)}>{status.statusname} {' '}
                                    <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                                        {status.count}

                                    </span>
                                </span>
                            ))}



                        </div>
                    </div>



                </div>
            </div>



            <div className="container mt-2 border rounded-3 shadow " style={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)',
            }}>
                {/* <StudentChart memberSummary={memberSummary} /> */}
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm mt-2 d-flex flex-wrap justify-content-start p-2 ">


                        {memberSummary.confirmallnum !== 0 &&

                            <span className={`badge bg-success m-2 position-relative py-2   ${memberSummary.confirmallmembers === 0 ? 'disabled' : ''}`} onClick={confirmallnum} >ยืนยันลงทะเบียน
                                <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger' style={{ zIndex: '999' }}>

                                    {memberSummary.confirmallnum}
                                </span>
                            </span>

                        }

                        {memberSummary.fundnum !== 0 &&

                            <span className={`badge bg-violet  m-2    position-relative py-2    ${memberSummary.fundnum === 0 ? 'disabled' : ''}`} onClick={fundNum} >
                                ทุนการศึกษา
                                <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger' style={{ zIndex: '999' }}>
                                    {memberSummary.fundnum}
                                </span>
                            </span>
                        }

                        {memberSummary.notconfirmallnum !== 0 &&
                            <span className={`badge bg-secondary   m-2 position-relative py-2 my-1   ${memberSummary.notconfirmallnum === 0 ? 'disabled' : ''}`} onClick={notconfirmallnum}>ยังไม่ยืนยัน
                                <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>

                                    {memberSummary.notconfirmallnum}
                                </span>
                            </span>
                        }

                        {memberSummary.notregispreservnum !== 0 &&
                            <span className={`badge bg-warning text-dark position-relative py-2 my-2 m-2    ${memberSummary.notregispreservnum === 0 ? 'disabled' : ''}`} onClick={notregispreservnum}> ไม่รักษาสภาพ  <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger' style={{ zIndex: '999' }}>{memberSummary.notregispreservnum}</span></span>
                        }


                        {memberSummary.preservnum !== 0 &&
                            <span className={`badge bg-dark  position-relative py-2 my-2  ${memberSummary.preservnum === 0 ? 'disabled' : ''}`}
                                onClick={preservnum}
                            >รักษาสภาพ <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>{memberSummary.preservnum}</span></span>
                        }


                        {memberSummary.withdrawallnum !== 0 &&
                            <span className={`badge btn-primary position-relative py-2 my-2  ${memberSummary.withdrawallnum === 0 ? 'disabled' : ''}`} onClick={withdrawallnum}>ถอนรายวิชาสำเร็จ<span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>{memberSummary.withdrawallnum}</span></span>
                        }



                        {memberSummary.notwithdrawallnum !== 0 ?
                            <span className={`badge bg-danger  position-relative py-2 my-2 m-2 ${memberSummary.notwithdrawallnum === 0 ? 'disabled' : ''}`} onClick={notwithdrawall}>ถอนรายวิชาไม่สำเร็จ<span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>{memberSummary.notwithdrawallnum}</span></span>
                            : null
                        }




                        {memberSummary.paidunsuccessnum !== 0 &&
                            <span className={`badge bg-pink  m-2 position-relative py-2  px-2 ${memberSummary.paidunsuccessnum === 0 ? 'disabled' : ''}`}
                                onClick={paidUnsccess}>ค้างชำระค่าเทอม <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>{memberSummary.paidunsuccessnum}</span></span>
                        }



                        {memberSummary.paidsuccessnum !== 0 &&

                            <span className={`badge btn-primary  position-relative py-2 my-2 m-2 ${memberSummary.paidsuccessnum === 0 ? 'disabled' : ''}`}
                                onClick={paidsuccessnum}>ชำระค่าเทอมครบ <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>{memberSummary.paidsuccessnum}</span></span>
                        }

                        {members.statusname}


                    </div>


                </div>
            </div >
            <div className="row  mb-3">
                {members.map((member, index) => (
                    <div className="col-lg-4 col-md-6    p-2" key={member.id}>
                        <div className={`card h-100 `}>
                            <div className="card-body">

                                <div className="d-flex ">
                                    <div className='p-2'>

                                        <img src={member.pic} className="rounded shadow" width={80} alt="..." />
                                    </div>



                                    <div className='mt-3 d-flex mb-3 flex-column justify-content-center align-items-start p-2'>
                                        <span className="card-title">ชื่อ-สกุล :
                                            <span>{member.fname} {member.lname}</span>
                                        </span>
                                        <h6 className="card-subtitle mb-2 text-muted">รหัสนักศึกษา : <span>{member.id}</span>
                                            {' '}
                                            <FontAwesomeIcon icon={faClone} onClick={() => copyToClipboard(member.id)} />
                                        </h6>
                                        {/* <form onSubmit={copyToClipboard}> */}

                                        <small className="card-text text-muted " >
                                            {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                                            <span className='badge bg-dark  m-2' onClick={e => openModal(member.email)}>{member.email}</span>
                                            {' '}
                                            <FontAwesomeIcon icon={faClone} onClick={() => copyToClipboard(member.email)} />
                                            {/* <button className="btn btn-sm " onClick={() => copyToClipboard(member.email)}>copy</button> */}
                                            <MailFormModal isOpen={modalIsOpen} closeModal={closeModal} teacherEmail={teacherEmail} email={email} token={token} />
                                        </small>
                                        <small className="card-text text-muted " >
                                            {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                                            <span className='badge bg-dark  m-2' onClick={e => openModal(member.microsoftid)}>{member.microsoftid}</span>
                                            {' '}
                                            <FontAwesomeIcon icon={faClone} onClick={() => copyToClipboard(member.microsoftid)} />
                                            {/* <button className="btn btn-sm " onClick={() => copyToClipboard(member.email)}>copy</button> */}
                                        </small>

                                        <div className='d-flex align-items-center  justify-content-center'>
                                            {/* <span>เบอร์โทรติดต่อ {' '} */}
                                            <span className="badge bg-dark  
                                        m-2">
                                                <a href={`tel:${member.phone}`} className='nav-link'><FontAwesomeIcon icon={faPhone} />{' '}
                                                    {member.phone}
                                                </a>
                                            </span>

                                            {/* </span> */}
                                        </div>


                                    </div>

                                </div>
                                {/* </form> */}

                                <div style={{ position: 'absolute', top: '130px', left: '25px' }}>
                                    <Link to={`/studentinfo/${member.id}`}
                                        state={{
                                            id: member.id,
                                            name: `${member.fname} ${member.lname}`,
                                            gpa: member.gpa,
                                            pic: member.pic,
                                            status: member.status,
                                        }}>

                                        <span className="badge bg-dark  rounded-5 shadow">GPA. : {member.gpa}</span>

                                    </Link>

                                </div>

                                <div style={{ position: 'absolute', top: '15px', left: '20px' }}>

                                    <span className={`badge ${getStatusTextClass(member.status)} rounded-pill`}

                                    >{member.statusname}</span>

                                    <div className="badge rounded-pill bg-violet m-2" onClick={fundNum} >{member.fundname}</div>


                                </div>

                                <div className="d-flex" style={{ position: 'absolute', bottom: '10px', right: '15px' }}>




                                    {member.numcourse > 0 && member.numreserve !== 0 ?
                                        // <Link className="badge btn bg-light text-dark rounded-pill  shadow btn-sm m-2" onClick={() => navigate(`/courseregis/${member.id}`, { state: state })} >รายการลงทะเบียน
                                        // </Link> :

                                        // null}

                                        <Link to={`/courseregis/${member.id}`}
                                            state={{
                                                id: member.id,
                                                name: `${member.fname} ${member.lname}`,
                                                gpa: member.gpa,
                                                pic: member.pic,
                                                regiscredit: member.regiscredit,
                                                earncredit: member.earncredit,
                                            }}>

                                            <span className="badge bg-dark  rounded-5 shadow">รายการลงทะเบียน</span>

                                            {/* course withdraw  */}


                                            {/* <span className="badge bg-dark  rounded-5 shadow">รายการถอนรายวิชา</span> */}


                                        </Link> : null}
                                    <Link to={`/coursewithdraw/${member.id}`}
                                        state={{
                                            id: member.id,
                                            name: `${member.fname} ${member.lname}`,
                                            gpa: member.gpa,
                                            pic: member.pic,
                                            regiscredit: member.regiscredit,
                                            earncredit: member.earncredit,
                                        }}>

                                        {member.withdrawall !== 0 ?
                                            <span className="badge bg-dark  rounded-5 shadow">รายการถอนรายวิชา</span> : null
                                        }
                                    </Link>





                                    {/* {member.numcourse > 0 && member.numreserve !== 0 ? <div className="badge btn bg-light text-dark rounded-pill  shadow btn-sm m-2" onClick={() => courseName(member.id)} >รายการลงทะเบียน</div> : null} */}

                                    {member.numcourse === 0 && member.numreserve > 0 ? <div className="badge bg-dark m-2" >ลงทะเบียนรักษาสภาพ</div> : null}
                                </div>

                                {/* <div className="badge bg-dark" style={{ position: 'absolute', bottom: '30px', right: '15px' }}>{member.fundname}</div> */}



                                <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                                    {member.numpreserv === 0 ? null :
                                        <span className={`badge bg-dark rounded-pill`}>ลงทะเบียนรักษาสภาพ</span>
                                    }

                                    {member.withdrawconfirm === member.withdrawall ? null :

                                        <span className={`badge bg-danger rounded-pill`}>ถอนรายวิชาไม่สำเร็จ</span>
                                    }

                                    {/* {member.numcourse === 0 &&
                                        <span className={`badge bg-danger rounded-pill`}>ไม่ลงทะเบียน</span>
                                    } */}

                                    {member.numcourse === 0 && member.numpreserv === 0 && (member.status === 'R' || member.status === 'C1' || member.status === 'P1' || member.status === 'P2' || member.status === 'P3' || member.status === 'CHEAT') ?
                                        <span className={`badge bg-pink rounded-pill`}>ไม่รักษาสภาพ</span> : null
                                    }


                                    {(member.numcourse > 0 && member.sumaccmoney < member.sumregismoney) ? <span className={`badge bg-pink rounded-pill`} onClick={paidUnsccess}>ค้างชำระค่าเทอม</span> : null}



                                </div>




                            </div>
                        </div>
                    </div>
                ))}

            </div >

            <div id="back" style={{ zIndex: '9999' }}>
                <Link to="/" className="btn btn-primary rounded-pill">
                    <FontAwesomeIcon icon={faChevronLeft} />{' '}Back
                </Link>
            </div>
        </>
    )
}

export default Members