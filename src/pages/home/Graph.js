import ChartDaily from "pages/home/ChartDaily";
import React from "react";
import ChartOnline from "pages/home/ChartOnline";
import ChartWatts from "pages/home/ChartWatts";
import ChartHourly from "pages/home/ChartHourly";

export default function Graph(props){
    const types = {
        //watts: {label: 'Потребленная мощность (Ватт)', color: 'red', series: ['watts'], yAxis: 'Ватт'},
        cpus: {label: 'CPUs', color: 'green', series: ['util', 'temp'], util: '%'},
        gpus: {label: 'GPUs', color: 'blue', series: ['util', 'temp'], util: '%'},
    }

    return <div>

        <ChartOnline types={types} {...props}/>
        <ChartHourly {...props}/>

        <h3 className="text-center">Статистика по дням</h3>
        <div  className="bg-dark p-1">
            <ChartWatts {...props}/>
        {Object.keys(types).map(type=><ChartDaily name={type} type={types[type]}  {...props} key={type}/>)}
        </div>
    </div>
}
