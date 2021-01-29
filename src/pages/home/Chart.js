import {useEffect, useState} from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function Chart(props) {
    const [data, setData] = useState([])

    const labels = {
        util: [props.type.util, 'green'],
        temp: ['Температура', 'red'],
        mem: ['Память', 'blue'],
    }

    useEffect(() => {
        props.store.api(`/data/${props.name}/30`)
            .then(setData)
    }, [])


    console.log(JSON.stringify(data))
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

    console.log(props.type.series.map(r => {
        return {
            color: r.color,
            //pointPlacement: -0.2,
            data: data,
            name: labels[r],

        }
    }))

    return <div className="border bg-light  m-1">
        <HighchartsReact highcharts={Highcharts} options={options}/>
    </div>
}
