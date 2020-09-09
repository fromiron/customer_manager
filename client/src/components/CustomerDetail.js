import React from "react";
import axios from "axios";
import useAsync from "./useAsync";
import PetDetail from "./PetDetail";
import CustomerUpdateForm from "./CustomerUpdateForm";
import ButtonAnimation from "./styles/ButtonAnimation";
import PetCreate from './PetCreate';
import {API_SERVER} from './dotEnv'

function CustomerDetail(props) {
    //get customer
    const [state, refetch] = useAsync(getCustomer, []);
    const {loading, data: customers, error} = state;
    const customerId = props.customerId;
    if (loading) return <div>Loading</div>;
    if (error) return <div>Error</div>
    if (!customers) return null;

    async function getCustomer() {
        const response = await axios.get(
            API_SERVER + '/customers/' + customerId
        );
        if (response.data.length === 0) {
            console.log("データーがありません。");
        }
        return response.data;
    }


    return (
        <div>


            <div>
                {customers.map(c => (
                    <CustomerUpdateForm
                        key={c.id} id={c.id}
                        name={c.name}
                        age={c.age}
                        gender={c.gender}
                        address={c.address}
                        mail={c.mail}
                        tel={c.tel}
                        note={c.note}
                        created={c.created}
                    />

                ))}

            </div>

            <PetDetail customerId={customerId}/>

            <PetCreate customerId={customerId}/>
        </div>

    )
}


export default CustomerDetail;
