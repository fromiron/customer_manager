import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import colors from './components/styles/colors'
import App from "./screens/App";


import styled, {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${colors.backgroundYellow}
  }
  
  * {
  box-sizing: border-box;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-weight: 500;
  font-size: 18px;
 
  &::before, &::after {
    box-sizing: border-box;
  }
  input:focus {outline:none;}
    textarea:focus {outline:none;}
}
`;

ReactDOM.render(
    <BrowserRouter>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap"
              rel="stylesheet"/>
        <GlobalStyle/>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
);

serviceWorker.unregister();
