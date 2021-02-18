import {useEffect, useState} from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from "moment";

export default function ChartHourly(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        init();
        const timer = setInterval(init, 60000)
        return () => clearInterval(timer);
    }, [])

    function init(){
        props.store.api(`/hourly`)
            .then(setData)
    }



    const options = {
        title: {
            text: 'Среднее в час'
        },
        subtitle: {
            text: 'Обновление - 1 мин'
        },
        legend: {
            enabled: true
        },
        xAxis: {categories: data.map(d=>d.hour)},
        yAxis: {
            title: {text: '%'}
        },
        series: [ {
                color: 'green',
                data: data.map(d=>d.cpus),
                name: 'CPU',

            },{
                color: 'blue',
                data: data.map(d=>d.gpus),
                name: 'GPU',

            }
        ]
    };


    return <div className="border bg-light  m-1">
        <HighchartsReact highcharts={Highcharts} options={options}/>
    </div>
}
