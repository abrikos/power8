import {Breadcrumb, BreadcrumbItem} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";

export default function MyBreadCrumb(props) {
    //if (props.items.length) props.items[props.items.length - 1].href = null;
    return <Breadcrumb>
        <BreadcrumbItem linkAs={'span'}><Link key={'home'} href={'/'}>Начало</Link></BreadcrumbItem>
        {props.items.map((item, i) => <BreadcrumbItem key={i} linkAs={'span'}>{item.href ?
            <Link to={item.href}>{item.label}</Link> : item.label}</BreadcrumbItem>)}
    </Breadcrumb>
}
