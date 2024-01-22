import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faEnvelope, faChevronLeft } from '@fortawesome/fontawesome-free-solid'

const Members = () => {

    const { classid } = useParams();
    const token = localStorage.getItem('token');
    const [members, setMembers] = useState([]);


    const getStatusTextClass = (status) => {
        switch (status) {
            case 'R':
                return 'btn-success';
            case 'C1':
                return 'btn-warning';
            // Add more cases for other status types
            default:
                return 'btn-light'; // Default color for unknown status
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
            <div className="row">
                {members.map((member, index) => (
                    <div className="col-lg-4 col-md mx-auto p-2" key={member.id}>
                        <div className={`card h-100 `}>
                            <div className="card-body">
                                {/* <img src={member.avatar} className="avatar" alt="..." /> */}
                                <p className="card-title">ชื่อ-สกุล :
                                    <span>{member.fname} {member.lname}</span>
                                </p>
                                <h6 className="card-subtitle mb-2 text-muted">รหัสนักศึกษา : <span>{member.id}</span></h6>
                                <p className="card-text"><FontAwesomeIcon icon={faEnvelope} /> {member.email}</p>

                                <div style={{ position: 'absolute', bottom: '5px', right: '5px' }}>
                                    <p className="card-text">GPA. : {member.gpa}</p>
                                </div>
                                <div style={{ position: 'absolute', top: '5px', right: '5px' }}>

                                    <button className={`btn ${getStatusTextClass(member.status)} rounded-pill`}>{member.status === 'C1' ? 'รอพินิจ' : 'ปกติ'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <div className="row">
                <div className="col mx-auto">
                    <div className="card">
                        <div className="card-body text-center">
                            <h5 className="card-title">จำนวนนักศึกษาทั้งหมด {members.length}</h5>
                            {/* <h6 className="card-subtitle mb-2 text-muted">{members.length}</h6> */}
                            {/* จำนวนนักศึกษา Status = R */}
                            <h5 className="card-title btn btn-success text-light rounded-pill p-2 m-2">ปกติ : {' '}
                                {members.filter((member) => member.status === 'R').length}
                            </h5>
                            {/* <h6 className="card-subtitle mb-2 text-muted">{members.filter((member) => member.status === 'R').length}</h6> */}
                            {/* จำนวนนักศึกษา Status = C1 */}
                            <h5 className="card-title btn btn-warning rounded-pill p-2 m-2">รอพินิจ : {' '}
                                {members.filter((member) => member.status === 'C1').length}
                            </h5>

                            {/* <h6 className="card-subtitle mb-2 text-muted">{members.filter((member) => member.status === 'C1').length}</h6> */}
                        </div>
                    </div>
                </div>

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