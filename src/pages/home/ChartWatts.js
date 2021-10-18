import {useEffect, useState} from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function ChartWatts(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        props.store.api(`/daily/watts/30`)
            .then(setData)
    }, [])


    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Потребленная мощность'
        },
        legend: {
            enabled: true
        },
        yAxis: {
            title: {text: 'Ватт'},
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
        series: {
            color:'orange',
            data: data.map(d=>d.watts)
        }
    };
    return <div className="border bg-light  m-1">
        <HighchartsReact highcharts={Highcharts} options={options}/>
    </div>
}
