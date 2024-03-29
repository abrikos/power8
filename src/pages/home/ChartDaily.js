import {useEffect, useState} from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function ChartDaily(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        props.store.api(`/daily/${props.name}/30`)
            .then(setData)
    }, [])


    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: props.type.label
        },
        legend: {
            enabled: true
        },
        yAxis: [{
            title: {text: '%'},
        }, {
            title: {text: '°C', rotation:0,},

            opposite: true
        }],
        xAxis: {categories: data.map(d => d.date)},
        plotOptions: {
            bar: {
                dataLabels: true
            },
            series: {
                dataLabels: {
                    enabled: true,
                    //borderRadius: 2,
                    //y: -10,
                    shape: 'callout'
                }
            }
        },
        series: [{
            yAxis: 0,
            color:'green',
            name:'Нагрузка %',
            data: data.map(d=>d.util)
        }, {
            color:'red',
            name:'Температура (°C)',
            yAxis: 1, data: data.map(d=>d.temp)
        }]
    };

    return <div className="border bg-light  m-1">
        <HighchartsReact highcharts={Highcharts} options={options}/>
    </div>
}
