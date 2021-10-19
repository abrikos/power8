import {useEffect, useState} from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from "moment";

export default function ChartOnline(props) {
    const [data, setData] = useState([])
    delete props.types.watts;
    useEffect(() => {
        init();
        const timer = setInterval(init, 60000)
        return () => clearInterval(timer);
    }, [])

    function init() {
        props.store.api(`/online/30`)
            .then(d => setData(adaptData(d)))
    }

    function avg(a) {
        return a.reduce((p, c) => p + c, 0) / a.length
    }

    function adaptData(d) {
        console.log(d)
        const gpus = d.map(dd => dd.gpuUtil)
        const cpus = d.map(dd => dd.cpuUtil)
        const dates = d.map(dd => moment(dd.date).format('HH:mm'))
        return {cpus, gpus, dates}
    }

    const options = {
        title: {
            text: 'Нагрузка онлайн'
        },
        subtitle: {
            text: 'Обновление - 1 мин'
        },
        legend: {
            enabled: true
        },
        xAxis: {categories: data.dates},
        yAxis: {
            title: {text: '%'}
        },
        series: Object.keys(props.types).map(key => {
            return {
                color: props.types[key].color,
                //pointPlacement: -0.2,
                data: data[key],
                name: props.types[key].label,

            }
        })
    };


    return <div className="border bg-light  m-1">
        <HighchartsReact highcharts={Highcharts} options={options}/>
    </div>
}
