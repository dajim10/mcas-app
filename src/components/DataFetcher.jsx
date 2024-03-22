import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PieChart from './PieChart';
import BarChart from './BarChart';

const DataFetcher = ({ token, navigate }) => {
    const [data, setData] = useState({});
    const [statusRegis, setStatusRegis] = useState({});
    const [statusPaid, setStatusPaid] = useState({});
    const [statusWithdraw, setStatusWithdraw] = useState({});
    const [statusFund, setStatusFund] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/student/report/getalldata/${token}`);
                setData(res.data.trace.studentstatus);
                const filteredRegis = {
                    ยืนยันลงทะเบียน: res.data.trace.confirmallnum,
                    ยังไม่ยืนยันลงทะเบียน: res.data.trace.notconfirmallnum,
                    ลงทะเบียนรักษาสภาพ: res.data.trace.preservnum,
                    ไม่ลงทะเบียนรักษาสภาพ: res.data.trace.notregispreservnum
                }
                setStatusRegis(filteredRegis);
                const filteredPaid = {
                    ชำระเงินสำเร็จ: res.data.trace.paidsuccessmoney,
                    ชำระเงินไม่สำเร็จ: res.data.trace.paidunsuccessmoney
                }
                const filteredWithdraw = {
                    ถอนรายวิชา: res.data.trace.withdrawnum,
                    ยังไม่ถอนรายวิชา: res.data.trace.notwithdrawnum
                }
                const filteredFund = {
                    นักเรียนทุน: res.data.trace.fundnum,
                    ไม่ใช้ทุน: res.data.trace.unfundnum,

                }
                setStatusPaid(filteredPaid);
                setStatusFund(filteredFund);
                console.log(res.data.trace);
                // setStatusWithdraw(filteredWithdraw);
                // setStatusFund(filteredFund);

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [token, navigate]);

    return (
        <div className='row mt-3'>
            {/* Render PieChart component to render the pie chart */}
            <h4 className='mt-3 p-2 text-center card'>สถานะการเรียน:(จำนวนนักศึกษา)</h4>
            <div className="col-lg-6 col-sm">

                <PieChart data={data} />
            </div>
            <div className="col-lg-6 col-sm">

                <BarChart data={data} />
            </div>

            <h4 className='mt-3 p-2 text-center card'>สถานะการลงทะเบียน:(จำนวนนักศึกษา)</h4>

            <div className="col-lg-6 col-sm">

                <PieChart data={statusRegis} />
            </div>
            <div className="col-lg-6 col-sm">

                <BarChart data={statusRegis} />
            </div>
            <h4 className='mt-3 p-2 text-center card'>สถานะการชำระเงินค่าเทอม:(บาท)</h4>

            <div className="col-lg-6 col-sm">

                <PieChart data={statusPaid} />
            </div>
            <div className="col-lg-6 col-sm">

                <BarChart data={statusPaid} />
            </div>

            <h4 className='mt-3 p-2 text-center card'>ทุนการศึกษา:(จำนวนนักศึกษา)</h4>

            <div className="col-lg-6 col-sm">

                <PieChart data={statusFund} />
            </div>
            <div className="col-lg-6 col-sm">

                <BarChart data={statusFund} />
            </div>


        </div>
    );
};

export default DataFetcher;
