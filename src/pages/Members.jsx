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
    const [graduate ,setGraduate] = useState(0);
    const [unGraduate,setUngraduate] = useState(0);




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
        setMembers(data.members.filter((member) => member.status !== 'GRADUATE' &&  member.status !== 'WITHDRAW'));
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
                return 'bg-danger text-dark';
            case 'GRADUATE':
                return 'bg-primary text-light shadow';

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
        setUngraduate(data.members.filter((member) =>  member.status !== 'GRADUATE' && member.status !== 'WITHDRAW').length)
        setTotal(data.members.length);
        // setVigrid(data.members.filter((status) => status === 'C1').length);
        console.log(data.members);
    }

    const fetchMemberSummary = async () => {
        // https://api.rmutsv.ac.th/teacher/trace/404141NM_66/kitisak.w:bw6uP7dmTocCxQ0rSxPZyMxsQcNvZ4OtEMXXSt8DAT6YChOHS0recpyT8m2VeQZv
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/teacher/trace/${classid}/${token}`);
        setMemberSummary(data);
        console.log(data);
    }

    const fundNum = async () => {
        // const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/teacher/class/${classid}/${token}`);
        setMembers(memberSummary.fundmembers);
        // setMembers(data.members.filter((member) => member.fundname !== ''));
    }

    const courseName = (id) => {
        // navigate(`/courseregis/${id}`);
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
                        <span className='badge bg-primary mx-2'>{index + 1}</span>
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
            <div className="container-fluid sticky-top">
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
                    <div className="row">
                        <div className="col-sm d-flex mx-auto m-2 justify-content-start align-items-center">



                            <span className="badge bg-dark mx-2 position-relative p-2 form-control" onClick={fetchStudent}>จำนวนทั้งหมด
                                <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                                    {total}
                                </span>
                            </span>

                            <span className="badge bg-primary mx-2 position-relative p-2 form-control" onClick={graduateFetch}>สำเร็จการศึกษา
                                <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                                    {graduate}
                                    {/* {members.length}{' '} */}
                                    {/* {memberSummary.confirmallnum + memberSummary.notregispreservnum} */}
                                </span>
                            </span>

                            <span className="badge btn-primary  mx-2 position-relative p-2 form-control" onClick={unGraduateFetch}>กำลังศึกษา
                                <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                                    {unGraduate}
                                    {/* {members.length}{' '} */}
                                    {/* {memberSummary.confirmallnum + memberSummary.notregispreservnum} */}
                                </span>
                            </span>




                            <span className="badge bg-success mx-2 position-relative p-2 form-control" onClick={checkStatus2}>เกรดปกติ
                                <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                                    {normal}
                                    {/* {members.filter((member) => member.status === 'R').length} */}
                                </span>
                            </span>


                          

                            {/* clear filter fontawesome refresh */}
                            {/* <span className="badge bg-danger mx-2 p-2 form-control " onClick={clearFilter}>Reset */}


                            {/* </span> */}


                        </div>
                        <div className="row">
                           <div className="col-md-4 mx-auto text-center">
                           {vigrid > 0 && 
                            <span className="badge bg-warning mx-2 position-relative p-2 form-control" onClick={checkStatus1}>เกรดวิกฤติ {' '}
                                <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                                    {vigrid}
                                    {/* {members.filter((member) => member.status === 'C1').length} */}
                                </span>
                            </span>
                          }
                           </div>
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
                    <div className="col mx-auto d-flex flex-column align-items-around  m-2 ">


                        {memberSummary.confirmallnum !== 0 &&

                            <span className={`badge bg-success w-50 mx-auto position-relative py-2 my-1  mx-2  ${memberSummary.confirmallmembers === 0 ? 'disabled' : ''}`} onClick={confirmallnum} >ยืนยันลงทะเบียน
                                <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>

                                    {memberSummary.confirmallnum}
                                </span>
                            </span>

                        }

                        {memberSummary.fundnum !== 0 &&

                            <span className={`badge bg-violet w-50 mx-auto position-relative py-2 my-1  mx-2 ${memberSummary.fundnum === 0 ? 'disabled' : ''}`} onClick={fundNum} >
                                ทุนการศึกษา
                                <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                                    {memberSummary.fundnum}
                                </span>
                            </span>
                        }

                        {memberSummary.notconfirmallnum !== 0 &&
                            <span className={`badge bg-secondary w-50 mx-auto position-relative py-2 my-1 mx-2 ${memberSummary.notconfirmallnum === 0 ? 'disabled' : ''}`} onClick={notconfirmallnum}>ยังไม่ยืนยัน
                                <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>

                                    {memberSummary.notconfirmallnum}
                                </span>
                            </span>
                        }

                        {memberSummary.notregispreservnum !== 0 &&
                            <span className={`badge bg-warning position-relative w-50 py-2 mx-auto my-1 ${memberSummary.notregispreservnum === 0 ? 'disabled' : ''}`} onClick={notregispreservnum}> ไม่รักษาสภาพ  <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>{memberSummary.notregispreservnum}</span></span>
                        }


                        {memberSummary.preservnum !== 0 &&
                            <span className={`badge bg-dark w-50 mx-auto position-relative py-2 my-1  mx-2 ${memberSummary.preservnum === 0 ? 'disabled' : ''}`}
                                onClick={preservnum}
                            >รักษาสภาพ <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>{memberSummary.preservnum}</span></span>
                        }


                        {memberSummary.withdrawallnum !== 0 &&
                            <span className={`badge btn-primary w-50 mx-auto position-relative py-2 my-1 mx-2 ${memberSummary.withdrawallnum === 0 ? 'disabled' : ''}`} onClick={withdrawallnum}>ถอนรายวิชาสำเร็จ : <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>{memberSummary.withdrawallnum}</span></span>
                        }



                        {memberSummary.notwithdrawallnum !== 0 ?
                            <span className={`badge bg-danger w-50 mx-auto position-relative py-2 my-1 m-2  mx-2 ${memberSummary.notwithdrawallnum === 0 ? 'disabled' : ''}`} onClick={notwithdrawall}>ถอนรายวิชาไม่สำเร็จ<span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>{memberSummary.notwithdrawallnum}</span></span>
                            : null
                        }




                        {memberSummary.paidunsuccessnum !== 0 &&
                            <span className={`badge bg-pink w-50 mx-auto position-relative py-2 my-1  mx-2 ${memberSummary.paidunsuccessnum === 0 ? 'disabled' : ''}`}
                                onClick={paidUnsccess}>ค้างชำระค่าเทอม <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>{memberSummary.paidunsuccessnum}</span></span>
                        }



                        {memberSummary.paidsuccessnum !== 0 &&

                            <span className={`badge btn-primary w-50 mx-auto position-relative py-2 my-1 mx-2 ${memberSummary.paidsuccessnum === 0 ? 'disabled' : ''}`}
                                onClick={paidsuccessnum}>ชำระค่าเทอมเรียบร้อย <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>{memberSummary.paidsuccessnum}</span></span>
                        }

                        {members.statusname}


                    </div>


                </div>
            </div >
            <div className="row  mb-3">
                {members.map((member, index) => (
                    <div className="col-lg-4 col-md-6 mx-auto p-2" key={member.id}>
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
                                        }}>

                                        <span className="badge bg-dark  rounded-5 shadow">GPA. : {member.gpa}</span>

                                    </Link>

                                </div>

                                <div style={{ position: 'absolute', top: '15px', left: '20px' }}>

                                    <span className={`badge ${getStatusTextClass(member.status)} rounded-pill`}>{member.statusname}</span>

                                    <div className="badge rounded-pill bg-violet mx-2" >{member.fundname}</div>


                                </div>

                                <div className="d-flex" style={{ position: 'absolute', bottom: '10px', right: '15px' }}>




                                    {member.numcourse > 0 && member.numreserve !== 0 ?
                                        // <Link className="badge btn bg-light text-dark rounded-pill  shadow btn-sm mx-2" onClick={() => navigate(`/courseregis/${member.id}`, { state: state })} >รายการลงทะเบียน
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

                                        </Link> : null}






                                    {/* {member.numcourse > 0 && member.numreserve !== 0 ? <div className="badge btn bg-light text-dark rounded-pill  shadow btn-sm mx-2" onClick={() => courseName(member.id)} >รายการลงทะเบียน</div> : null} */}

                                    {member.numcourse === 0 && member.numreserve > 0 ? <div className="badge bg-dark mx-2" >ลงทะเบียนรักษาสภาพ</div> : null}
                                </div>

                                {/* <div className="badge bg-dark" style={{ position: 'absolute', bottom: '30px', right: '15px' }}>{member.fundname}</div> */}



                                <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                                    {member.numpreserv === 0 ? null :
                                        <span className={`badge bg-dark rounded-pill`}>ลงทะเบียนรักษาสภาพ</span>
                                    }

                                    {/* <div className="badge bg-info mx-2" >{member.fundname}</div> */}

                                    {/* {(member.numcourse > 0 && member.sumaccmoney >= member.sumregismoney) || member.fundtype === 'Y' ? null :
                                        <div>

                                            <span className={`badge bg-pink rounded-pill`}>ค้างชำระค่าเทอม</span>
                                            
                                        </div>

                                    } */}
                                    {(member.numcourse > 0 && member.sumaccmoney < member.sumregismoney && member.fundname !== '') ? <span className={`badge bg-pink rounded-pill`}>ค้างชำระค่าเทอม</span> : null}

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