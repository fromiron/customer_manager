import React from "react";
import CustomerDetail from "../components/CustomerDetail";
import Header from "../components/Header";

function CustomerPage(props) {
    const customerId = props.match.params.id ? props.match.params.id : null;

    return (

        <div>
            <Header/>
            <CustomerDetail customerId={customerId}/>
        </div>
    );
}

export default CustomerPage;
