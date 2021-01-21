import React from 'react';
import "./home.sass"
import OsData from "pages/home/OsData";

export default function Home(props) {

    return <div className="home">
        <div className="content">
            <OsData {...props}/>
        </div>
    </div>
}




