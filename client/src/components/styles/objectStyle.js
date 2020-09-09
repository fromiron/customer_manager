import styled from "styled-components";
import colors from "./colors";


export const DeleteLockBtn = styled.button`
padding: 5px;
width: 95px;
margin-left: 70px;
background-color: ${props => props.bgcolor === true ? colors.pointRed : colors.formInput};
outline: none;
border: none;
margin-bottom: 10px;
cursor: pointer;
color: ${colors.mainText};
margin-right: 10px;
font-weight: 700;
box-shadow: 1px 2px 3px 1px rgba(0,0,0,0.2);
transition: all 0.5s ease-in-out;
&:hover{
color: ${colors.white};
background-color: ${colors.point};
width: 145px;
}
`
;

export const DeleteBtn = styled.button`
padding: 5px;
width: 95px;
background-color: ${colors.pointRed};
outline: none;
border: none;
margin-bottom: 10px;
cursor: pointer;
color: ${colors.mainText};
font-weight: 700;
box-shadow: 1px 2px 3px 1px rgba(0,0,0,0.2);
transition: all 0.5s ease-in-out;
&:hover{
color: ${colors.white};
background-color: ${colors.mainText};
width: 145px;

}
`
;


export const UpdateBtn = styled.button`
padding: 5px;
width: 200px;
margin: 10px 0 10px 70px;
background-color: ${colors.formInput};
outline: none;
border: none;
cursor: pointer;
color: ${colors.white};
font-weight: 700;
box-shadow: 1px 2px 3px 1px rgba(0,0,0,0.2);
transition: all 0.5s ease-in-out;
&:hover{
color: ${colors.point};
background-color: ${colors.mainText};
width: 250px;
}
`
;

export const BackBtn = styled.button`
padding: 5px;
width: 200px;
margin: 10px 0 10px 70px;
background-color: ${colors.formInput};
outline: none;
border: none;
cursor: pointer;
color: ${colors.white};
font-weight: 700;
box-shadow: 1px 2px 3px 1px rgba(0,0,0,0.2);
transition: all 0.5s ease-in-out;
&:hover{
color: ${colors.point};
background-color: ${colors.mainText};
width: 250px;

}
`
;

export const PetProfile = styled.img`
width: auto;
height:80px;
border-radius: 20px;
margin-top:5px;
`
;
export const PetProfileBig = styled.img`
border-radius: 20px;
height:200px;
max-width:300px;
margin-left: 40px;
margin-bottom: 20px;
`;


export const AlignCenter = styled.div`
display: flex;
justify-content: center;
`;
export const Divider = styled.div`
display: flex;
`

export const PageBtn = styled.button`
cursor: pointer;
outline: none;
border: none;
border-radius: 5px;
margin: 0 4px;
color: ${colors.mainText};
background-color:${props => props.clicked === true ? colors.lightGray : colors.white}; 
color:${props => props.clicked === true ? colors.white : colors.mainText}; 
transition: all 0.1s ease-in-out;
&:hover{
background-color: ${colors.point};
}
`
