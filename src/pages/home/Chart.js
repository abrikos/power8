import {useEffect, useState} from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function Chart(props) {
    const [data, setData] = useState([])
    const fields = {
        temp: {label: 'Температура', color: 'red'},
        mem: {label: 'Память', color: 'green'},
        util: {label: 'Показатель', color: 'blue'},
    }

    useEffect(() => {
        props.store.api(`/data/${props.type}/30`)
            .then(setData)
    }, [])

    function adaptData(d){
        return [d.date, d.util];
    }

    console.log(JSON.stringify(data))
    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: props.name
        },
        legend: {
            enabled: true
        },
        xAxis:{ categories: data.map(d=>d.date)},
        plotOptions:{
            bar:{
                dataLabels:true
            },
            series: {
                dataLabels: {
                    enabled: true,
                    borderRadius: 2,
                    y: -10,
                    shape: 'callout'
                }
            }
        },
        series: [
            {
                color: 'green',
                pointPlacement: -0.2,
                data: data.map(d=>d.util),
                name:'Значение',

            },
            {
                color: 'red',
                pointPlacement: -0.2,
                data: data.map(d=>d.temp),
                name:'Температура C'
            },
            {
                color: 'blue',
                pointPlacement: -0.2,
                data: data.map(d=>d.mem),
                name:'Память'
            }
        ]
    };

    return <div className="border m-3">
        <HighchartsReact highcharts={Highcharts} options={options}/>
    </div>
}
