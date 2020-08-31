import React from "react";
import axios from "axios";
import useAsync from "./useAsync";
import TableBody from "@material-ui/core/TableBody";
import Pet from "./Pet";
import Table from "@material-ui/core/Table";


function PetDetail(props) {
    //get customer
    const [state, refetch] = useAsync(getPet, []);
    const {loading, data: pets, error} = state;
    const customerId = props.customerId;
    if (loading) return <div>Loading</div>;
    if (error) return <div>Error</div>
    if (!pets) return null;

    async function getPet() {
        const response = await axios.get(
            'http://localhost:5000/api/customers/' + customerId + '/pets/'
        );
        if (response.data.length === 0) {
            console.log("データーがありません。");
        }
        return response.data;
    }

    return (
        <Table>

            <TableBody>
                {pets.map(p => (
                    <Pet key={'pet' + p.petId} petId={p.petId}
                         petName={p.petName}
                         petType={p.petType}
                         petSex={p.petSex === 0 ? "オス" : p.petSex === 1 ? "メス" : "不明"}
                         petBirth={p.petBirth}
                         petNote={p.petNote}
                         created={p.created}
                    />

                ))}

            </TableBody>
        </Table>


    )
}


export default PetDetail;
