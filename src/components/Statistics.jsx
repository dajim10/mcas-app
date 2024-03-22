import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import 'chart.js/auto';
import { Pie, Bar, Doughnut, Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie, faChartBar } from '@fortawesome/free-solid-svg-icons'
import Back from './Back';






const Statistics = ({ token }) => {
    const navigate = useNavigate()
    const [childrendata, setChildrendata] = useState([]);
    const [org, setOrg] = useState('');
    const [studentstatus, setStudentstatus] = useState({});
    const [selected, setSelected] = useState('bar');
    const type = localStorage.getItem('type')
    const [trace, setTrace] = useState({})
    const [traceStatus, setTraceStatus] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/student/report/getalldata/${token}`)
                console.log(res.data)
                setOrg(res.data.org)
                setStudentstatus(res.data.trace.studentstatus)
                setTrace({
                    paidsuccessmoney: res.data.trace.paidsuccessmoney,
                    paidunsuccessmoney: res.data.trace.paidunsuccessmoney,
                });
                setTraceStatus({
                    confirmallnum: res.data.trace.confirmallnum,
                    notconfirmallnum: res.data.trace.notconfirmallnum,
                })
                // setTrace(res.data.trace)
                // console.log(res.data.trace)



            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }
        , [token, navigate]);

    let student = {
        labels: Object.keys(studentstatus),
        datasets: [
            {
                data: Object.values(studentstatus),
                borderColor: 'rgba(255,255,255, 0.2)',
                backgroundColor: [
                    "rgba(255, 253, 203, 0.6)",
                    "rgba(51, 255, 87, 0.6)",
                    "rgba(87, 51, 255, 0.6)",
                    "rgba(51, 151, 102, 0.2)",
                    "rgba(51, 255, 102, 0.6)",
                    "rgba(102, 51, 255, 0.6)",
                    "rgba(100, 102, 51, 0.6)",
                    "rgba(51, 255, 51, 0.6)",
                    "rgba(51, 102, 255, 0.6)",
                    "rgba(255, 204, 51, 0.6)",
                    "rgba(51, 255, 204, 0.6)",
                    "rgba(204, 51, 255, 0.6)",
                    "rgba(255,12 , 51, 0.6)",
                    "rgba(51, 204, 255, 0.6)",
                    "rgba(255, 51, 204, 0.6)"
                    // Add more colors as needed
                ],
            },
        ],
    };

    let traceStudent = {
        labels: Object.keys(trace) === 'paidsuccessmoney' ? ['ชำระค่าเทอมสำเร็จ', 'ชำระค่าเทอมไม่สำเร็จ'] : ['ชำระค่าเทอมสำเร็จ', 'ชำระค่าเทอมไม่สำเร็จ'],

        datasets: [
            {
                data: Object.values(trace),
                borderColor: 'rgba(255,255,255)',
                backgroundColor: [

                    "#00154c",
                    "#ffdd00"
                    // Add more colors as needed
                ],
            },
        ],
    };

    let traceStudentStatus = {
        labels: Object.keys(traceStatus) === 'confirmallnum' ? ['ยืนยันการลงทะเบียน', 'ยังไม่ยืนยัน'] : ['ยืนยันการลงทะเบียน', 'ยังไม่ยืนยัน'],

        // labels: Object.keys(traceStatus),

        datasets: [
            {
                datalabels: {
                    color: 'white',
                    display: true,
                    font: {
                        weight: 'bold'
                    },
                    formatter: function (value, context) {
                        return value;
                    }
                },
                data: Object.values(traceStatus),
                borderColor: 'rgba(255,255,255)',
                backgroundColor: [

                    "blue",
                    "#ffdd00"
                    // Add more colors as needed
                ],
            },
        ],
    };

    return (
        <div>
            {/* <button onClick={() => navigate('/studentstatus')}>Next</button> */}

            {/* <ul>
                {Object.keys(studentstatus).map((key) => {
                    return (
                        <li key={key}>{key}: {studentstatus[key]}</li>
                    )
                })}
            </ul> */}


            <h5 className='text-center mt-2 card p-2'>ภาพรวมสถิตินักศึกษา{org}</h5>
            <div className="row">
                <div className="col-lg-6 mx-auto mb-2 text-center">
                    <div className="btn-group d-none ">

                        <button className="btn btn-primary" onClick={() => setSelected('pie')}><FontAwesomeIcon icon={faChartPie} /> </button>
                        <button className="btn btn-success" onClick={() => setSelected('bar')}><FontAwesomeIcon icon={faChartBar} /></button>
                    </div>
                </div>
            </div>

            <div className="row  mb-2" style={{ backgroundColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)', padding: '1rem', borderRadius: '25px' }}>
                <div className="col-lg-6 col-md-6 col-sm ">
                    <h5 className='p-2 mt-2  card shadow text-center'>สถานะการเป็นนักศึกษา</h5>
                    {/* {selected === 'pie' ? <Pie data={student} /> : <Bar data={student} />} */}
                    <div className="card">
                        <Pie data={student} />
                    </div>
                </div>
                {/* </div> */}
                {/* <div className="row card " > */}
                <div className="col-lg-3 col-md-6 col-sm">
                    <h5 className='p-2 mt-2'>การชำระค่าเทอม</h5>
                    {/* {selected === 'bar' ? <Pie data={traceStudent} /> : <Bar data={traceStudent} />} */}
                    <div className="card">
                        <Pie data={traceStudent} />
                    </div>

                </div>
                <div className='col-lg-3 col-md-6 col-sm '>
                    <h5 className='p-2 mt-2'>สถานะการลงทะเบียน</h5>


                    {/* format number with thousand */}
                    <div className='align-items-end  '>
                        <label htmlFor="" className='my-2 mx-2'>ยืนยันการลงทะเบียน</label>
                        <span className='badge bg-primary'>{traceStatus.confirmallnum}</span>

                    </div>
                    <div className='align-items-end'>
                        <label htmlFor="" className='my-2 mx-2'>ยังไม่ยืนยัน</label>
                        <span className='badge bg-warning'>{traceStatus.notconfirmallnum}</span>
                    </div>
                    <div className="row">
                        <Bar data={traceStudentStatus} />
                    </div>




                    {/* <Bar data={traceStudentStatus} /> */}

                </div>
            </div>


            {/* <h5>รวมทั้งหมด {totalCount} รางวัล</h5> */}
            {/* <Back /> */}


        </div>
    )
}

export default Statistics