import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const SearchStudent = () => {

    const [search, setSearch] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(search)
        fetch(`${import.meta.env.VITE_API_URL}/student/${search}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // setStudent(data);
            })
    }



    return (
        <div className='container text-center '>
            <div className="row">
                <div className="col-lg-6 col-md mx-auto">
                    <div className="card glass p-2 mt-2">
                        <h1>ค้นหาข้อมูลนักศึกษา</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 ">
                                <label htmlFor="studentId" className="form-label">คำค้น</label>
                                <div className='position-relative'>

                                    <input type="text" className="form-control" id="studentId" onChange={e => setSearch(e.target.value)} placeholder='ใส่ข้อความที่ต้องการค้นหา' />
                                    <span onClick={handleSubmit} className='field-icon'><FontAwesomeIcon icon={faSearch} /></span>
                                </div>
                            </div>
                            {/* <button type="submit" className="btn btn-primary">ค้นหา</button> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchStudent