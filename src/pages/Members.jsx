import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import BarChart from '../components/BarChart'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faEnvelope, faChevronLeft, faClone, faPhone, faUser } from '@fortawesome/fontawesome-free-solid'

const Members = () => {

    const { classid } = useParams();
    const token = localStorage.getItem('token');
    const [members, setMembers] = useState([]);
    const [memberSummary, setMemberSummary] = useState([]);
    const navigate = useNavigate();


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


    // const handleLinkClick = () => {
    //     navigate(`/studentinfo`, { state: { id: members.id } });
    //     console.log('clicked')
    // };

    const clearFilter = () => {
        fetchStudent();
    }


    const getStatusTextClass = (status) => {
        switch (status) {
            case 'R':
                return 'bg-success';
            case 'WITHDRAW' || 'CHEAT':
                return 'bg-danger text-dark';

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
            return member.fname.includes(search) || member.lname.includes(search) || member.id.includes(search) || member.email.includes(search) || member.gpa.includes(search);
        })
        setMembers(filterMembers);

    }

    const paidUnsccess = () => {
        const filterMembers = members.filter((member) => {
            return member.paid === 0;
        })
        setMembers(filterMembers);
    }


    const fetchStudent = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/teacher/class/${classid}/${token}`);
        setMembers(data.members);
        console.log(data.members);
    }

    const fetchMemberSummary = async () => {
        // https://api.rmutsv.ac.th/teacher/trace/404141NM_66/kitisak.w:bw6uP7dmTocCxQ0rSxPZyMxsQcNvZ4OtEMXXSt8DAT6YChOHS0recpyT8m2VeQZv
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/teacher/trace/${classid}/${token}`);
        setMemberSummary(data);
        console.log(data);
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
                        <div className="input-group mb-2">
                            {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
                            <input type="text" className="form-control" placeholder="ค้นหานักศึกษา" aria-label="Recipient's username" aria-describedby="button-addon2"
                                onChange={handleSearch}
                            />

                        </div>
                    </div>

                    {/* จำนวนนักศึกษา */}
                    <div className="col-md mx-auto">
                        <div className="">
                            <div className=" text-center d-flex justify-content-between align-items-center">

                                <div>

                                    <button className="btn btn-primary" onClick={fetchStudent}>จำนวนนักศึกษาทั้งหมด {memberSummary.confirmallnum}{' '}  <FontAwesomeIcon icon={faUser} />
                                    </button>
                                </div>

                                <div>
                                    <small className="p-1 btn  rounded-pill btn-success">ปกติ : {' '}
                                        {members.filter((member) => member.status === 'R').length}
                                    </small>
                                </div>

                                <div>
                                    <small className="p-1 btn rounded-pill btn-warning">วิกฤติ : {' '}
                                        {members.filter((member) => member.status === 'C1').length}
                                    </small>
                                </div>


                            </div>
                        </div>
                    </div>




                </div>
            </div>
            <div className="container mt-2 border rounded-3 shadow " style={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)',
            }}>
                <div className="row">
                    <div className="col-md mx-auto   ">



                        <button className='btn  btn-success mx-2 my-2' onClick={clearFilter} >ยืนยันลงทะเบียน : {memberSummary.confirmallnum}</button>


                        <button className='btn btn-secondary mx-2 my-2'>ยังไม่ยืนยัน : {memberSummary.notconfirmallnum}</button>

                        <button className='btn btn-warning mx-2 my-2'>ไม่ลงทะเบียน ไม่รักษาสภาพ : {memberSummary.notregispreservnum}</button>

                        <button className='btn btn-dark  mx-2 my-2'>รักษาสภาพ : {memberSummary.preservnum}</button>
                        <button className='btn btn-primary  mx-2 my-2'>ถอนรายวิชาสำเร็จ : {memberSummary.withdrawallnum}</button>
                        <button className="btn btn-danger  mx-2 my-2">ถอนรายวิชาไม่สำเร็จ : {memberSummary.notwithdrawallnum}</button>
                        <button className="btn  mx-2 my-2" style={{ backgroundColor: '#B71375', color: '#fff' }}
                            onClick={paidUnsccess}>ค้างชำระค่าเทอม : {memberSummary.paidunsuccessnum}</button>


                    </div>


                </div>
            </div>
            <div className="row  mb-3">
                {members.map((member, index) => (
                    <div className="col-lg-4 col-md mx-auto p-2" key={member.id}>
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

                                        <small className="card-text text-muted mb-3" ><FontAwesomeIcon icon={faEnvelope} /> {member.email}
                                            {' '}
                                            <FontAwesomeIcon icon={faClone} onClick={() => copyToClipboard(member.email)} />
                                            {/* <button className="btn btn-sm " onClick={() => copyToClipboard(member.email)}>copy</button> */}
                                        </small>
                                        <small className="card-text text-muted mb-3" ><FontAwesomeIcon icon={faEnvelope} /> {member.microsoftid}
                                            {' '}
                                            <FontAwesomeIcon icon={faClone} onClick={() => copyToClipboard(member.microsoftid)} />
                                            {/* <button className="btn btn-sm " onClick={() => copyToClipboard(member.email)}>copy</button> */}
                                        </small>

                                        <div className='d-flex align-items-center  justify-content-center'>
                                            <span>เบอร์โทรติดต่อ {' '}
                                                <small className="badge bg-dark text-light 
                                        mb-3">
                                                    <a href={`tel:${member.phone}`} className='nav-link'><FontAwesomeIcon icon={faPhone} />{' '}
                                                        {member.phone}
                                                    </a>
                                                </small>

                                            </span>
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
                                <div style={{ position: 'absolute', top: '15px', left: '15px' }}>

                                    <span className={`badge ${getStatusTextClass(member.status)} rounded-pill`}>{member.statusname}</span>



                                    {/* <button>{member.status === 'C1' ? 'รอพินิจ' : 'ปกติ'}</button> */}
                                </div>

                                <div className="badge bg-dark" style={{ position: 'absolute', bottom: '30px', right: '15px' }}>{member.fundname}</div>

                                <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                                    {member.numpreserv === 0 ? null :
                                        <span className={`badge bg-dark rounded-pill`}>ลงทะเบียนรักษาสภาพ</span>
                                    }
                                    {member.paid === 1 ? null :
                                        <span className={`badge bg-danger rounded-pill`}>ค้างชำระค่าเทอม</span>
                                    }
                                </div>




                            </div>
                        </div>
                    </div>
                ))}

            </div >

            <div id="back" style={{ zIndex: '9999' }}>
                <Link to="/" className="btn btn-primary">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Link>
            </div>
        </>
    )
}

export default Members