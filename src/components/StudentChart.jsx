import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MyChartComponent = ({ memberSummary }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (memberSummary) {
            renderChart();
        }
    }, [memberSummary]);

    const renderChart = () => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');

            // Destroy the previous chart instance if it exists
            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }

            chartRef.current.chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [
                        'ยืนยันลงทะเบียน',
                        'ทุนการศึกษา',
                        'ยังไม่ยืนยัน',
                        'ไม่รักษาสภาพ',
                        'รักษาสภาพ',
                        'ถอนรายวิชาสำเร็จ',
                        'ถอนรายวิชาไม่สำเร็จ',
                        'ค้างชำระค่าเทอม',
                        'ชำระค่าเทอมเรียบร้อย',
                    ],
                    datasets: [{
                        label: 'Number of Items',
                        data: [
                            memberSummary.confirmallnum,
                            memberSummary.fundnum,
                            memberSummary.notconfirmallnum,
                            memberSummary.notregispreservnum,
                            memberSummary.preservnum,
                            memberSummary.withdrawallnum,
                            memberSummary.notwithdrawallnum,
                            memberSummary.paidunsuccessnum,
                            memberSummary.paidsuccessnum,
                        ],
                        backgroundColor: [
                            'green',
                            'violet',
                            'grey',
                            'orange',
                            'black',
                            'blue',
                            'red',
                            'pink',
                            'lightblue',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                },
                maintainAspectRatio: false,
                responsive: true
            });
        }
    };

    return (
        <div>
            <canvas ref={chartRef} />
        </div>
    );
};

export default MyChartComponent;
