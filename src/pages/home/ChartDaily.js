import {useEffect, useState} from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function ChartDaily(props) {
    const [data, setData] = useState([])

    const labels = {
        watts: [props.type.label, 'orange'],
        util: ['%', 'green'],
        temp: ['Температура (°C)', 'red'],
        mem: ['Память', 'blue'],
    }

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
        yAxis: {
            title: {text: props.type.yAxis || ''}
        },
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
        series: props.type.series.map(r => {
            return {
                color: labels[r][1],
                //pointPlacement: -0.2,
                data: data.map(d => d[r]),
                name: labels[r][0],

            }
        })
    };

    return <div className="border bg-light  m-1">
        <HighchartsReact highcharts={Highcharts} options={options}/>
    </div>
}
