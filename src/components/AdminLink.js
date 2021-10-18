import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {Link} from "react-router-dom";

export default function (props) {
    if (!props.model) return 'no model';
    if (!props.model.adminLink) return 'no model.adminLink';
    return props.isAdmin || props.store.authenticatedUser.admin ?
        <Link href={props.model.adminLink}><FontAwesomeIcon icon={faEdit}/></Link> : ''
}
