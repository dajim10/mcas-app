import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BarChart = ({ data }) => {
    // Convert data object into an array of objects for Highcharts series data
    // const customColors = ['#FAA300', '#FF5BAE', '#90ed7d', '#59D5E0', '#58A399', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#f7d7a3', '#5a2a2a', '#9a5b74', '#008DDA', '#f45b5b', '#91e8e1'];
    // random color
    const customColors = [
        "rgba(51, 255, 51, 0.6)",
        "rgba(51, 102, 255, 0.6)",
        "rgba(255, 204, 51, 0.6)",
        "rgba(51, 255, 204, 0.6)",
        "rgba(204, 51, 255, 0.6)",
        "rgba(255,12 , 51, 0.6)",
        "rgba(51, 204, 255, 0.6)",
        "rgba(255, 51, 204, 0.6)"
        // Add more colors as needed
    ];
    const seriesData = Object.entries(data).map(([status, count], index) => ({
        name: status + ' : ' + count.toLocaleString() + ' ',
        y: count,

        color: customColors[index % customColors.length]
    }));

    // Highcharts configuration options for the pie chart
    const options = {
        chart: {
            type: 'column',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}</b>'
        },
        series: [{
            name: '',
            data: seriesData
        }],
        yAxis: {
            title: {
                text: 'จำนวนนักศึกษา'
            }
        },
        xAxis: {
            title: {
                text: 'สถานะ'
            }
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true,
                    color: 'white',
                    formatter: function () {
                        return this.y.toLocaleString();
                    }
                }
            }
        }



    };

    return (
        <div>
            {/* Render HighchartsReact component for the pie chart */}
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
};

export default BarChart;
