import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

function Pet(props) {
    return (
        <TableRow>
            <TableCell>{props.petId}</TableCell>
            <TableCell>{props.petName}</TableCell>
            <TableCell>{props.petType}</TableCell>
            <TableCell>{props.petSex}</TableCell>
            <TableCell>{props.petBirth}</TableCell>
            <TableCell>{props.petNote}</TableCell>
            <TableCell>{props.created}</TableCell>
        </TableRow>
    )
}

export default Pet;
