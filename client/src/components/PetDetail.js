import React from "react";
import axios from "axios";
import useAsync from "./useAsync";
import {Dashboard, Table, TableCell, TableCategory, EmptyPetMsg, TableRow} from "./styles/tableStyle"
import Pet from "./Pet";
import petDefaultImg from '../images/hana.png'
import styled from "styled-components";

const PetDetailWrapper = styled.div`
padding: 0 10%;
`


function PetDetail(props) {

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
        <PetDetailWrapper>


            <Table>
                <TableCategory>
                    <TableCell className='alignCenter'>ID</TableCell>
                    <TableCell className='alignCenter'>IMAGE</TableCell>
                    <TableCell className='alignCenter'>NAME</TableCell>
                    <TableCell className='alignCenter'>TYPE</TableCell>
                    <TableCell className='alignCenter'>SEX</TableCell>
                    <TableCell className='alignCenter'>BIRTH</TableCell>
                    <TableCell className='alignCenter'>NOTE</TableCell>
                    <TableCell className='alignCenter'>CREATED</TableCell>

                </TableCategory>
                {pets.length === 0 ? <TableRow>
                    <EmptyPetMsg colSpan='8'>登録されたペット情報がありません。</EmptyPetMsg>

                </TableRow> : null}

                {pets.map(p => (
                    <Pet key={'pet' + p.petId} petId={p.petId}
                         petImg={p.petImg ? p.petImg : petDefaultImg}
                         petName={p.petName}
                         petType={p.petType}
                         petSex={p.petSex === 0 ? "オス" : p.petSex === 1 ? "メス" : "不明"}
                         petBirth={p.petBirth}
                         petNote={p.petNote}
                         created={p.created}
                    />

                ))}

            </Table>

        </PetDetailWrapper>

    )
}


export default PetDetail;
