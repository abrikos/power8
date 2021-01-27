import React from "react";
import "themes/main/theme-main.sass"
import MenuTop from "./MenuTop";

export default function ThemeMain(props) {


    return <div>
        <div className="theme-main">
            <MenuTop {...props}/>
            <div className="text-center">
                <h1>{process.env.REACT_APP_SITE_TITLE}</h1>
                <i>{process.env.REACT_APP_SITE_DESCRIPTION}</i>
            </div>
            {props.errorPage || props.routeResult}
            <hr/>
            <footer>
                <a href="https://asrsya.ru"><img src="https://asrsya.ru/logo.svg" alt="Академия наук РС(Я)"/></a>
            </footer>
        </div>
    </div>
}
