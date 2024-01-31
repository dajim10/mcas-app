import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ClassRoomList = () => {

    const [classRoom, setClassRoom] = useState([])
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Check if the user is logged in
        if (!token) {
            window.location.href = '/login'
        } else {
            const apiEndpoint = `${import.meta.env.VITE_API_URL}/teacher/supervisor/${token}`;
            // const token = localStorage.getItem('token');
            const fetchData = async () => {
                const response = await fetch(apiEndpoint, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                console.log(data);
                setClassRoom(data.class)
            }
            fetchData();

        }
    }
        , [token]);




    return (
        <div className='container '>
            <p className='display-6'>รายชื่อห้องเรียน</p>

            <div className="row">
                {classRoom.map((classroom, index) => (

                    <div className="col mx-auto" key={index}>

                        <div className="card">
                            <div className="card-body text-center">
                                <h5 className="card-title">{classroom.classname}</h5>

                                <Link to={`/members/${classroom.classid}`} className="btn btn-primary">เข้าสู่ห้องเรียน</Link>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default ClassRoomList