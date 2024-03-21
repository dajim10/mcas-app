import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import 'chart.js/auto';
import { Pie, Bar } from 'react-chartjs-2';
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




    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/student/report/getalldata/${token}`)
                console.log(res.data)
                setOrg(res.data.org)
                setStudentstatus(res.data.trace.studentstatus)
                setTrace({
                    paidsuccessmoney: res.data.trace.paidsuccessmoney,
                    paidunsuccessmoney: res.data.trace.paidunsuccessmoney
                });
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
                    "rgba(255, 102, 51, 0.6)",
                    "rgba(51, 255, 51, 0.6)",
                    "rgba(51, 102, 255, 0.6)",
                    "rgba(255, 204, 51, 0.6)",
                    "rgba(51, 255, 204, 0.6)",
                    "rgba(204, 51, 255, 0.6)",
                    "rgba(255, 99, 51, 0.6)",
                    "rgba(51, 204, 255, 0.6)",
                    "rgba(255, 51, 204, 0.6)"
                    // Add more colors as needed
                ],
            },
        ],
    };

    let traceStudent = {
        labels: Object.keys(trace) === 'paidsuccessmoney' ? ['จ่ายเงินสำเร็จ', 'จ่ายเงินไม่สำเร็จ'] : ['จ่ายเงินสำเร็จ', 'จ่ายเงินไม่สำเร็จ'],

        datasets: [
            {
                data: Object.values(trace),
                borderColor: 'rgba(0,0,0, 0.2)',
                backgroundColor: [

                    "#00154c",
                    "rgb(160, 21, 62)"
                    // Add more colors as needed
                ],
            },
        ],
    };

    return (
        <div className='container'>
            <button onClick={() => navigate('/studentstatus')}>Next</button>

            {/* <ul>
                {Object.keys(studentstatus).map((key) => {
                    return (
                        <li key={key}>{key}: {studentstatus[key]}</li>
                    )
                })}
            </ul> */}


            <h1 className='text-center mt-2 card'>ภาพรวมสถิตินักศึกษา{org}</h1>
            <div className="row">
                <div className="col-lg-6 mx-auto mb-2 text-center">
                    <div className="btn-group ">

                        <button className="btn btn-primary" onClick={() => setSelected('pie')}><FontAwesomeIcon icon={faChartPie} /> </button>
                        <button className="btn btn-success" onClick={() => setSelected('bar')}><FontAwesomeIcon icon={faChartBar} /></button>
                    </div>
                </div>
            </div>

            <div className="row card mb-2">
                <div className="col-lg-6 mx-auto">
                    <h2 className='text-center'>สถานะนักศึกษา</h2>
                    {selected === 'pie' ? <Pie data={student} /> : <Bar data={student} />}
                </div>
            </div>
            <div className="row card " >
                <div className="col-lg-6 mx-auto">
                    <h2 className='text-center'>การชำระค่าเทอม</h2>
                    {selected === 'pie' ? <Pie data={traceStudent} /> : <Bar data={traceStudent} />}
                </div>
            </div>


            {/* <h5>รวมทั้งหมด {totalCount} รางวัล</h5> */}
            {/* <Back /> */}

        </div>
    )
}

export default Statistics