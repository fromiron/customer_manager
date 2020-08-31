import React from "react";
import styled from "styled-components";
import colors from "./colors";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

`;

const Btn = styled.button`
border-radius: 4px;
text-align: center;
 background: transparent;
  color: ${colors.mainText};
  border: 6px solid ${colors.mainText};
  font-size: 25px;
  margin: 10px 0;
  width: 100%;
  padding: 5px 80px;
  cursor: pointer;
  display: inline-block;
  transition: all 0.4s;
  overflow: hidden;
  position: relative;
  letter-spacing: 10px;
  font-weight: 700;
box-shadow: 1px 2px 3px 1px rgba(0,0,0,0.2);

  &:hover{
  color: ${colors.white};}
  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    transition: all 0.4s;
    width: 100%;
    height: 0;
    top: 0;
    left: 0;
    background: ${colors.mainText};}
    
    &:hover:after,
&:active:after {
    height: 100%;
}

`;


function ButtonAnimation(props) {
    return (
        <ButtonContainer>
            <Btn onClick={props.handleClick}>{props.text}</Btn>
        </ButtonContainer>

    )
}


export default ButtonAnimation;
