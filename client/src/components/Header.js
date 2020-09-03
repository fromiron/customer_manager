import React from "react";
import styled from "styled-components";
import logo from '../images/logo.svg'


const LogoImg = styled.svg`
background-image: url(${logo});
background-size: contain;
background-repeat: no-repeat;
width: 205px;
height: 98px;

`
const HeaderWrapper = styled.header`
display: flex;
justify-content: center;
margin-top: 70px;
`

function Header() {

    return (
        <HeaderWrapper>
            <LogoImg/>
        </HeaderWrapper>
    )
}

export default Header;