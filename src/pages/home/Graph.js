import Chart from "pages/home/Chart";

export default function Graph(props){
    const types = {
        watts: {label: 'Потребляемая мощность (Ватт)', color: 'red', series: ['util'], util: 'Ватт'},
        cpus: {label: 'Процессоры (%)', color: 'green', series: ['util', 'temp'], util: '%'},
        gpus: {label: 'Видеоускорители (%)', color: 'blue', series: ['util', 'temp', 'mem'], util: '%'},
    }

    return <div className="bg-dark">
        <h3 className="text-light text-center">Графики</h3>
        {Object.keys(types).map(type=><Chart name={type} type={types[type]}  {...props} key={type}/>)}

    </div>
}
