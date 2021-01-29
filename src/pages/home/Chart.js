import {useEffect, useState} from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function Chart(props) {
    const [data, setData] = useState([])
    const types = {
        watts: {label: 'Потребляемая мощность (Ватт)', color: 'red', series: ['util'], util: 'Ватт'},
        cpus: {label: 'Процессоры (%)', color: 'green', series: ['util', 'temp'], util: '%'},
        gpus: {label: 'Видеоускорители (%)', color: 'blue', series: ['util', 'temp', 'mem'], util: '%'},
    }

    const labels = {
        util: types[props.type].util,
        temp: 'Температура',
        mem: 'Память',
    }

    useEffect(() => {
        props.store.api(`/data/${props.type}/30`)
            .then(setData)
    }, [])


    console.log(JSON.stringify(data))
    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: types[props.type].label
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
        series: types[props.type].series.map(r => {
            return {
                color: r.color,
                //pointPlacement: -0.2,
                data: data.map(d => d[r]),
                name: labels[r],

            }
        })
    };

    return <div className="border m-3">
        <HighchartsReact highcharts={Highcharts} options={options}/>
    </div>
}
