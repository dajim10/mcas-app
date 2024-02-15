import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import ClassRoomList from './ClassRoomList';
import { Swal } from 'sweetalert2'



const Home = () => {
    const [classRoom, setClassRoom] = useState([]);
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    const [classRoomId, setClassRoomId] = useState('');
    const [student, setStudent] = useState([]);



    const selectClassrom = (classRoomId) => {
        setClassRoomId(classRoomId);
        console.log(classRoomId);
    }



    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
        const fetchClassRoom = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/teacher/supervisor/${token}`);
            console.log(data);
            if (data.status === 'token') {
                navigate('/login');
                return;
            }
            if (data.class.length === 0) {
                alert('ระบบนี้ใช้เฉพาะอาจารย์ที่ปรึกษาเท่านั้น');
                return;
            }




            setClassRoom(data.class);

        }

        fetchClassRoom();
    }
        , [token]);




    return (
        <ClassRoomList />
        // <div className='my-3'>

        //     <div className="jumbotron jumbotron-fluid">
        //         <div className="container">
        //             <h1 className="display-4">ระบบอาจารย์ที่ปรึกษา</h1>
        //             <p className="lead">สำนักวิทยบริการ มทร.ศรีวิชัย ได้พัฒนาระบบอาจารย์ที่ปรึกษาขึ้น เพื่อกำกับดูแลนักศึกษาให้สำเร็จการศึกษาตามที่หลักสูตรกำหนดได้อย่างครบถ้วนสมบูรณ์ โดยนักศึกษาสามารถติดต่ออาจารย์ที่ปรึกษา เพื่อขอคำแนะนำในการลงทะเบียนเรียน ปรึกษาเกี่ยวกับผลการเรียน
        //                 กิจกรรมเสริมหลักสูตรในระหว่างเรียน หรือปรึกษาเรื่องทั่วไป และเรื่องส่วนตัวได้</p>
        //         </div>
        //         <hr />
        //     </div>
        //     {/* <h1>ยินดีต้อนรับ</h1>
        //     <p>ยินดีต้อนรับสู่ระบบอาจารย์ที่ปรึกษา */}

        //     {/* </p> */}

        //     <p className='display-6'>รายชื่อห้องเรียน</p>

        //     <div className="row">
        //         {classRoom.map((classroom, index) => (

        //             <div className="col mx-auto" key={index}>

        //                 <div className="card">
        //                     <div className="card-body">
        //                         <h5 className="card-title">{classroom.classname}</h5>
        //                         {/* <p className="card-text">{classroom.classRoomDescription}</p> */}
        //                         <Link to={`/members/${classroom.classid}`} className="btn btn-primary">เข้าสู่ห้องเรียน</Link>
        //                     </div>
        //                 </div>
        //             </div>

        //         ))}
        //     </div>


        // </div >
    )
}

export default Home