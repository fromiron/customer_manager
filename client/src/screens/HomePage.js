import React, {useState, useEffect} from "react";
import CustomerList from "../components/CustomerList";
import Header from "../components/Header";

function HomePage() {


    return (

        <div>
            <Header/>
            <CustomerList/>

        </div>
    );
}

export default HomePage;
