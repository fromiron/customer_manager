import styled from "styled-components";
import colors from './colors'
import bgimg from '../../images/content-marketing-5509584_1280.png'

export const FormRow = styled.div`
position: relative;
`;

export const CreateFormWrapper = styled.div` //index用
overflow: hidden;
border-radius: 3px;
transition: height, max-height 0.5s ease-in-out;
max-height: 0;
display: flex;
background-color: #FFBD59;
background-image: url("${bgimg}");
background-repeat: no-repeat;
background-position: right;
background-size: contain;
&.visible{
height: auto;
max-height:700px;
}
`;

export const UpdateFormWrapper = styled.div`
overflow: hidden;
border-radius: 3px;
transition: height, max-height 0.5s ease-in-out;
max-height:700px;
display: flex;
background-color:${colors.backgroundYellow};
background-image: url("${bgimg}");
background-repeat: no-repeat;
background-position: right;
background-size: contain;
`;


export const InputText = styled.input`
margin-left: 70px ;
padding: 6px 10px;
border: 5px solid ${colors.formInput};
color: ${colors.mainText};
margin-bottom: 10px;
font-weight: bold;
transition: all 0.5s ease-in-out;
width: 200px;
box-shadow: 1px 2px 3px 1px rgba(0,0,0,0.2);

&:focus{
border: 5px solid ${colors.mainText};
width: 250px;
transition: all 0.5s ease-in-out;

  }
&:focus::placeholder{
transition: all 0.5s ease-in-out;
color: ${colors.mainText};

  }
 &::placeholder{
 color: ${colors.formInput};
 letter-spacing: 5px;
 padding-left: 6px;
 }

`

export const FormInnerWrapper = styled.div`
padding: 20px 0;
margin-left: 20%;


`;
export const InputSelect = styled.select`
margin-left: 70px;
padding: 6px 10px;
border: 5px solid ${colors.formInput};
color: ${colors.formInput};
font-weight: bold;
transition: all 0.5s ease-in-out;
margin-bottom: 10px;
overflow: hidden;
width: 200px;
 letter-spacing: 5px;
box-shadow: 1px 2px 3px 1px rgba(0,0,0,0.2);

&:focus{
border: 5px solid ${colors.mainText};
width: 250px;
color: ${colors.mainText};
`

export const TextArea = styled.textarea`

margin-left: 70px;
padding: 6px 10px;
height: 100px;
border: 5px solid ${colors.formInput};
color: ${colors.mainText};
font-weight: bold;
transition: all 0.5s ease-in-out;
margin-bottom: 10px;
overflow: hidden;
width: 200px;
box-shadow: 1px 2px 3px 1px rgba(0,0,0,0.2);

&:focus{
border: 5px solid ${colors.mainText};
width: 250px;
  }
  &:focus::placeholder{
transition: all 0.5s ease-in-out;
color: ${colors.mainText};

  }
 &::placeholder{
 color: ${colors.formInput};
 letter-spacing: 5px;
 padding-left: 6px;
 }
  
`
export const FormLabel = styled.label`
position: absolute;
top:5px;
left:1px;
color: ${colors.white};
font-size: 13px;

`;


export const InputCheckBox = styled.input`
  margin-left: 70px;


`
export const AlertMsg = styled.div`
background-color: ${colors.formInput};
color: ${colors.white};
margin-left: 70px;
margin-bottom: 10px;
padding: 4px 10px;
width: fit-content;
font-size: 13px;
`;

export const InformMsg = styled.div`
padding: 3px 5px;
text-align: center;
`