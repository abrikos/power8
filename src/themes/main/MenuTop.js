import React from 'react';
import "themes/main/menu-top.sass"
import {Navbar} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import LoginFormGoogle from "components/login/LoginFormGoogle";
import {Link} from "react-router-dom";

export default function MenuTop(props) {
    console.log('zzzzzzzzzz',props.store)
    const items = [
        //{label: "Нагрузка онлайн", href: "/resource"},
        {label: "Статистика", href: "/"},
        {label: "Спецификации", href: "/spec"},
        //{label: "Видео", items: [{label: "Level 1", href: "/zzz"}, {label: "Level 2", href: "/zzz"}]},
        {label: "АДМИН", href: "/admin", hidden: !(props.store.authenticatedUser && props.store.authenticatedUser.admin)},
        {label: "Кабинет", href: "/cabinet", hidden: !(props.store.authenticatedUser)},

    ];
    return <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/"><img src="/logo.svg" alt="Логотип" width={150}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                {items.filter(i=>!i.hidden).map((item, i) => item.items ?
                    <NavDropdown title={item.label} id="basic-nav-dropdown" key={i}>
                        {item.items.map((item2, i2) => <NavDropdown.Item key={i2} as={"span"}><Link to={item2.href}>{item2.label}</Link></NavDropdown.Item>)}
                    </NavDropdown>
                    :
                    <Nav.Link as={"span"} key={i}><Link to={item.href}>{item.label}</Link></Nav.Link>)}
                {/*<Nav.Item>
                    {props.store.authenticatedUser ? <A href="/logout" className={'nav-link'}>Выход</A> : <LoginFormGoogle store={props.store}/>}
                </Nav.Item>*/}
            </Nav>
            {/*<Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
            </Form>*/}
        </Navbar.Collapse>
    </Navbar>
}
