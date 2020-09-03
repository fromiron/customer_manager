import React from "react";
import {Link} from "react-router-dom";
import {TableRow, TableCell} from "./styles/tableStyle"
import {FontAwesomeIcon as FAIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons"
import colors from './styles/colors';
import {MoreBtn} from './styles/tableStyle'


function Customer(props) {
    return (
        <TableRow>
            <TableCell className="roundLeft alignRight">{props.id}</TableCell>
            <TableCell>{props.name} 様</TableCell>
            <TableCell>{props.age} 歳</TableCell>
            <TableCell>{props.address}</TableCell>
            <TableCell>{props.tel}</TableCell>
            <TableCell className="roundRight"><Link to={"/" + props.id}><MoreBtn>
                <FAIcon icon={faEllipsisH} color={colors.lightGray}/>
            </MoreBtn></Link></TableCell>
        </TableRow>

    )
}


export default Customer;
