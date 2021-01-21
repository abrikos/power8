import React, {useEffect, useState} from 'react';
import "./home.sass"

export default function OsData(props) {
    const [os, setOs] = useState();

    useEffect(() => {
        init()
        const timer = setInterval(init,5000)
        return () => clearInterval(timer);
    }, [])

    const init = ()=>{
        props.store.api('/os/data')
            .then(setOs)
    }

    console.log(os)
    if (!os) return <div/>
    return <div className="os-data">
        <table className="table">
            <tbody>
            <tr>
                <th colSpan={2}>Процессоры</th>
            </tr>
            {os.cpus.map((cpu,i)=><tr key={i}>
                <td>{cpu.model}</td>
                <td>{Object.keys(cpu.times).map(k=><div key={k}>{k}: {cpu.times[k]}</div>)}</td>
            </tr>)}
            <tr>
                <th colSpan={2}>Видео</th>
            </tr>
            <tr>
                <td>Всего</td>
                <td>{(os.mem.total/1024/1024/1024).toFixed(1)} Gb</td>
            </tr>
            <tr>
                <th colSpan={2}>Память</th>
            </tr>
            <tr>
                <td>Всего</td>
                <td>{(os.mem.total/1024/1024/1024).toFixed(1)} Gb</td>
            </tr>
            <tr>
                <td>Свободно</td>
                <td>{(os.mem.free/1024/1024/1024).toFixed(1)} Gb</td>
            </tr>
            </tbody>
        </table>
    </div>
}




