import React from "react";
import CustomerDetail from "../components/CustomerDetail";

function CustomerPage(props) {
    const customerId = props.match.params.id ? props.match.params.id : null;

    return (

        <div>
            <CustomerDetail customerId={customerId}/>
        </div>
    );
}

export default CustomerPage;
