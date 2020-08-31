import React from 'react';
import {Route} from 'react-router-dom';
import HomePage from './HomePage'
import CustomerPage from "./CustomerPage";



function App() {
    return (

        <div>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/:id/" component={CustomerPage}/>
        </div>
    );
}

export default App;



