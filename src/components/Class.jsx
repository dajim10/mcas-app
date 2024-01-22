import React, { useState, useEffect } from 'react'

const Class = () => {



    return (
        <div className='container'>
            <p className='display-6'>รายชื่อห้องที่ปรึกษา</p>

            <div className="row">
                {classRoom.map((classroom, index) => (

                    <div className="col mx-auto" key={index}>

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{classroom.classname}</h5>
                                {/* <p className="card-text">{classroom.classRoomDescription}</p> */}
                                <Link to={`/members/${classroom.classid}`} className="btn btn-primary">เข้าสู่ห้องเรียน</Link>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default Class