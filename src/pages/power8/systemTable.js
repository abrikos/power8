import React from "react";

export default function SystemTable(props) {
return <div>
    <h2>Спецификация вычислительной системы</h2>
    <table className="table table-info">

    <thead>
    <tr>
        <th>Наименование</th>
        <th>Характеристики</th>
        <th>Назначение</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>Сервер IBM Power
            System S822LC</td>
        <td>Процессор: Два
            8-ядерных
            3.259/3.857 GHz
            POWER8
            Память: 512GB
            DDR4
            Дисковая
            система: Два
            диска по 1TB
            7.2k RPM 5xx
            SATA SFF-4</td>
        <td>
            позволяет получить доступ к функциям
            быстродействующих GPU.
            Доступ к дисковому хранилищу по FcoE с
            полосой пропускания 16 Гб/с;.</td>
    </tr>
    <tr>
        <td>Графический
            ускоритель (GPU)</td>
        <td>Nvidia Tesla P100
            2 шт.</td>
        <td>Аппаратные модули для
            высокопроизводительных вычислений</td>
    </tr>
    <tr>
        <td>Система хранения
            данных</td>
        <td>СХД V5010 SFF
            CONTROL,
            Суммарной
            емкостью  10            ТБ</td>
        <td>Сохранение результатов работы
            вычислительной системы в обьёмах
            допустимых текущей емкостью СХД.</td>
    </tr>
    </tbody>
</table>
</div>}
