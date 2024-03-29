import React from "react";
import "themes/main/theme-main.sass"
import MenuTop from "./MenuTop";
import Routes from "../../Routes";

export default function ThemeMain(props) {


    return <div>
        <div className="theme-main">
            <div className="text-center alert-info">
                <h1>{process.env.REACT_APP_SITE_TITLE}</h1>
                <i>{process.env.REACT_APP_SITE_DESCRIPTION}</i>
            </div>
            <Routes {...props}/>
            <hr/>
            <footer>
                <a href="https://asrsya.ru"><img src="https://asrsya.ru/logo.svg" alt="Академия наук РС(Я)"/></a>
            </footer>
        </div>
    </div>
}
