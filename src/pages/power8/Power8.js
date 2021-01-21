import React from "react";

import front from "./front.png"
import overview from "./overview.png"
import arch from "./arch.png"
import "./power8.sass"
import SystemTable from "pages/power8/systemTable";

export default function (props) {
return <div className="power8">
    <h1>Сервер
        IBM Power System S822LC
        с двумя графическими ускорителями
        NVIDIA Tesla P100</h1>
    <img src={front} className="img-fluid m-auto d-block" alt={'front'}/>
    <hr/>
        <SystemTable/>
    <img src={overview} className="img-fluid m-auto d-block" alt={'overview'}/>


    <h2>Основными областями применения вычислительной системы</h2>
    <ul>
        <li>Научное и инженерное моделирование. Молекулярная динамика, квантовая химия,
            геологическое моделирование для широкого спектра целей в том числе и обнаружения новых
            нефтегазовых месторождений и др.</li>
        <li>Deep Learning (Глубокое обучение) – большинство методов основано на <a href="https://ru.wikipedia.org/wiki/%D0%93%D0%BB%D1%83%D0%B1%D0%BE%D0%BA%D0%BE%D0%B5_%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5"> теории
            искусственных нейронных сетей</a>. Прикладным назначением может быть, например,
            обработка космических или аэрофотоснимков высокого разрешения, подобный алгоритм
            позволяет обнаружить и классифицировать разные типы объектов, пожаров, наводнений для
            предупреждения ЧС.</li>
        <li>
            Обработка Больших Данных (Big Data), генетическая инженерия, криптография, обработка
            видео и др.
        </li>
    </ul>

    <h2>Характеристики производительности графического ускорителя GPU P100</h2>
    <table className="table table-info">
        <tbody>
        <tr><td>Double-Precision Performance</td><td>5.3 teraFLOPS</td></tr>
        <tr><td>Single-Precision Performance </td><td>10.6 teraFLOPS</td></tr>
        <tr><td>Half-Precision Performance </td><td>21.2 teraFLOPS</td></tr>
        <tr><td>NVIDIA NVLink Interconnect Bandwidth</td><td>160 GB/s</td></tr>
        <tr><td>PCIe x16 Interconnect Bandwidth </td><td>32 GB/s</td></tr>
        <tr><td>CoWoS HBM2 Stacked Memory Capacity </td><td>16 GB</td></tr>
        <tr><td>CoWoS HBM2 Stacked Memory Bandwidth </td><td>732 GB/s</td></tr>
        </tbody>
    </table>

    <h2>Архитектурно вычислительная система</h2>
    <img src={arch} className="img-fluid m-auto d-block" alt={'architecture'}/>

    <h2>Результаты тестов</h2>
    <table className="table table-info">
        <tbody>
        <tr>
            <td>Скорость системы хранения данных</td>
            <td>1.7 GB/s</td>
        </tr>
        <tr>
            <td>Пропускная способность между глобальной памятью и
                памятью GPU</td>
            <td>535.7 GB/s</td>
        </tr>
        <tr>
            <td>Пропускная способность NVLink</td>
            <td>33.1 GB/s</td>
        </tr>
        <tr>
            <td colSpan={2} className="text-center">Средняя производительность</td>
        </tr>
        <tr>
            <td>SGEMM</td>
            <td>9397.4 GFlops</td>
        </tr>
        <tr>
            <td>DGEMM</td>
            <td>4819.2 GFlops</td>
        </tr>
        <tr>
            <td>XL IBM</td>
            <td>29.1 GFlops</td>
        </tr>
        <tr>
            <td>SMP64</td>
            <td>232.1 GFlops</td>
        </tr>
        <tr>
            <td>SMP CUDA</td>
            <td>6971.3 GFlops</td>
        </tr>
        <tr>
            <td>HPL</td>
            <td>189 Gflops</td>
        </tr>
        </tbody>
    </table>

    <div>
        Серия тестов для получения максимальной производительности в реальных
        ненагруженных условиях, показывает следующие результаты:
        <ul>
            <li>Операции с плавающей точкой одинарной точности составляет 88.65 % от
                заявленных производителем</li>
            <li>Операция двойной точности – 90.92 % от пиковой производительности GPU</li>
            <li>Использование ESSL 64 bit – 34 % от пиковой</li>
        </ul>

    </div>
    <a href="https://drive.google.com/open?id=1ahezkv7zc1_zFSo8uYviwguo1u6HcK7X">Подробный отчет о тестировании системы</a>

</div>
}
