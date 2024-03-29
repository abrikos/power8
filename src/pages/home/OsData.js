import React, {useEffect, useState} from 'react';
import "./home.sass"

export default function OsData(props) {
    const [os, setOs] = useState();

    useEffect(() => {
        init()
        const timer = setInterval(init, 30000)
        return () => clearInterval(timer);
    }, [])

    const init = () => {
        props.store.api('/os/data')
            .then(setOs)
    }

    console.log(os)
    if (!os) return <div/>
    return <div className="os-data">
        <table className="table">
            <tbody>
            <tr>
                <th>Дата</th>
                <td>{os.date}</td>
            </tr>
            <tr>
                <th>Потребляемая мощность</th>
                <td>{os.watts} Watts</td>
            </tr>
            </tbody>
            {os.gpus.length > 0 && <tbody>
            <tr>
                <th colSpan={3} className="text-center">Видео Tesla P100-SXM2-16GB</th>
            </tr>
            {os.gpus.map((g, i) => <tr key={i}>
                <td>
                    <div className="alert-danger" style={{width: g.sys + '%'}}>{g.sys}%</div>
                </td>
                <td>
                    Mem: {g.mem}%, Temp {g.temp} <sup>o</sup>C
                </td>
            </tr>)}
            </tbody>}
            <tbody>
            <tr>
                <th colSpan={3} className="text-center">Оперативная память</th>
            </tr>
            <tr>
                <td>Всего</td>
                <td>{(os.mem.total / 1024).toFixed(1)} Gb</td>
            </tr>
            <tr>
                <td>Использовано</td>
                <td>{(os.mem.used / 1024).toFixed(1)} Gb</td>
            </tr>
            </tbody>
            <tbody>
            <tr>
                <th colSpan={3} className="text-center">Процессоры</th>
            </tr>
            {os.cpus.filter(c => c.usr > 2).length === 0 && <tr>
                <td>128 юнитов. Нет нагрузки выше 2%</td>
            </tr>}
            {os.cpus.filter(c => c.usr > 2).map((cpu, i) => <tr key={i}>
                <td>{cpu.cpu}</td>
                <td>
                    <div className="alert-danger" style={{width: cpu.usr + '%'}}>{cpu.usr}%</div>
                </td>
                <td> sys: {cpu.sys}%, t: {cpu.temp}<sup>o</sup>C</td>

            </tr>)}
            </tbody>
        </table>
    </div>
}




