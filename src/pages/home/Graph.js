import Chart from "pages/home/Chart";

export default function Graph(props){
    const types = {
        watts: {label: 'Потребляемая мощность', color: 'red', series: ['util'], util: 'Ватт'},
        cpus: {label: 'Процессоры', color: 'green', series: ['util', 'temp'], util: '%'},
        gpus: {label: 'Видеоускорители', color: 'blue', series: ['util', 'temp', 'mem'], util: '%'},
    }

    return <div>
        <h3 className="text-center">Статистика по дням</h3>
        <div  className="bg-dark p-1">
        {Object.keys(types).map(type=><Chart name={type} type={types[type]}  {...props} key={type}/>)}
        </div>
    </div>
}
