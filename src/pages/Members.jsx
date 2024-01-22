import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faEnvelope, faChevronLeft, faClone } from '@fortawesome/fontawesome-free-solid'

const Members = () => {

    const { classid } = useParams();
    const token = localStorage.getItem('token');
    const [members, setMembers] = useState([]);
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
            confirmButtonText: 'Cool'
        })

    }


    const getStatusTextClass = (status) => {
        switch (status) {
            case 'R':
                return 'btn-success';
            case 'WITHDRAW' || 'CHEAT':
                return 'btn-danger';

            default:
                return 'btn-warning'; // Default color for unknown status
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

    const fetchStudent = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/teacher/class/${classid}/${token}`);
        setMembers(data.members);
        console.log(data.members);
    }

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }


        fetchStudent();
    }
        , [token]);



    return (
        <>
            {/* search input */}
            <div className="mt-2">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="ค้นหานักศึกษา" aria-label="Recipient's username" aria-describedby="button-addon2"
                        onChange={handleSearch}
                    />

                </div>
            </div>
            <div className="row sticky-top">
                <div className="col mx-auto">
                    <div className="card">
                        <div className="card-body text-center">
                            <h5 className="card-title">จำนวนนักศึกษาทั้งหมด {members.length}</h5>

                            <h5 className="card-title btn btn-success text-light rounded-pill p-2 m-2">ปกติ : {' '}
                                {members.filter((member) => member.status === 'R').length}
                            </h5>

                            <h5 className="card-title btn btn-warning rounded-pill p-2 m-2">วิกฤติ : {' '}
                                {members.filter((member) => member.status === 'C1').length}
                            </h5>


                        </div>
                    </div>
                </div>

            </div>
            <div className="row">
                {members.map((member, index) => (
                    <div className="col-lg-4 col-md mx-auto p-2" key={member.id}>
                        <div className={`card h-100 `}>
                            <div className="card-body">


                                <img src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png' className="rounded-pill shadow" width={50} alt="..." />

                                <p className="card-title">ชื่อ-สกุล :
                                    <span>{member.fname} {member.lname}</span>
                                </p>
                                <h6 className="card-subtitle mb-2 text-muted">รหัสนักศึกษา : <span>{member.id}</span>
                                    {' '}
                                    <FontAwesomeIcon icon={faClone} onClick={() => copyToClipboard(member.id)} />
                                </h6>
                                {/* <form onSubmit={copyToClipboard}> */}

                                <p className="card-text" ><FontAwesomeIcon icon={faEnvelope} /> {member.email}
                                    {' '}
                                    <FontAwesomeIcon icon={faClone} onClick={() => copyToClipboard(member.email)} />
                                    {/* <button className="btn btn-sm " onClick={() => copyToClipboard(member.email)}>copy</button> */}
                                </p>


                                {/* </form> */}

                                <div style={{ position: 'absolute', bottom: '5px', right: '5px' }}>
                                    <small className="btn btn-outline-dark rounded-5 ">GPA. : {member.gpa}</small>
                                </div>
                                <div style={{ position: 'absolute', top: '5px', right: '5px' }}>

                                    <button className={`btn ${getStatusTextClass(member.status)} rounded-pill`}>{member.statusname}</button>
                                    {/* {member.status === 'C1' ? 'รอพินิจ' : 'ปกติ'}</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            <div id="back">
                <Link to="/" className="btn btn-primary">
                    <FontAwesomeIcon icon={faChevronLeft} /> กลับหน้าหลัก
                </Link>
            </div>
        </>
    )
}

export default Members