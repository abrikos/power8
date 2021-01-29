import Chart from "pages/home/Chart";

export default function Graph(props){
    return <div>
        <h3>Графики</h3>
        <Chart type="watts"  name={"Потребляемая мощность (Вт)"} {...props} />
        <Chart type="cpus" name={"CPU"}  {...props}/>
        <Chart type="gpus" name={"GPU"} {...props}/>
    </div>
}
