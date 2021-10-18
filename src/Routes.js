import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "pages/home/home";
import PostList from "pages/post/PostList";
import Logout from "components/login/Logout";
import ErrorPage from "components/service/ErrorPage";
import AdminIndex from "pages/admin/AdminIndex";
import Login from "components/login/login";
import Cabinet from "pages/cabinet/cabinet";
import PostView from "pages/post/PostView";
import Power8 from "pages/power8/Power8";
import Graph from "pages/home/Graph";
import OsData from "pages/home/OsData";
import MenuTop from "./themes/main/MenuTop";

export default function Routes(props) {
    const routes = {
        "/": () => <Graph {...props}/>,
        "/resource": () => <OsData {...props}/>,
        "/spec": () => <Power8 {...props}/>,
        "/graph": () => <Graph {...props}/>,
        "/news": () => <PostList key={'news'} title="Новости" modelName="post" filter={{order: {createdAt: -1}}} {...props}/>,
        "/post/:id/:head": (params) => <PostView {...props} {...params}/>,
        "/login": () => <Login {...props}/>,

        //"/persons/:type": (params) => <PersonListLarge {...params} {...props}/>,

    };

    const routesLogged = {
        "/cabinet": () => <Cabinet {...props}/>,
        "/logout": () => <Logout {...props}/>,
    }

    const routesEditor = {}

    const routesAdmin = {
        "/admin/:control": (params) => <AdminIndex {...params} {...props}/>,
        "/admin/:control/:id/update": (params) => <AdminIndex {...params} {...props}/>,
        "/admin": () => <AdminIndex {...props}/>,
    }


    for (const path of Object.keys(routesLogged)) {
        routes[path] = props.authenticatedUser ? routesLogged[path] : () => <ErrorPage error={401} {...props}/>;
    }
    for (const path of Object.keys(routesEditor)) {
        routes[path] = props.authenticatedUser ?
            props.authenticatedUser.editor || props.authenticatedUser.admin ? routesEditor[path] : () => <ErrorPage error={403} {...props} message={'Доступ разрешен только редакторам'}/>
            :
            () => <ErrorPage error={401} {...props}/>
        ;
    }
    for (const path of Object.keys(routesAdmin)) {
        routes[path] = props.authenticatedUser ?
            props.authenticatedUser.admin ? routesAdmin[path] : () => <ErrorPage error={403} {...props} message={'Доступ разрешен только администраторам'}/>
            :
            () => <ErrorPage error={401} {...props}/>
        ;
    }
    return <Router>
        <MenuTop {...props}/>
        <Switch>
            {Object.keys(routes).map(path=><Route exact path={path}>{routes[path]}</Route>)}
        </Switch>
    </Router>;
}
