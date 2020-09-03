import styled from "styled-components";
import colors from "./colors";


export const Dashboard = styled.div`
display: flex;
justify-content: right;
flex-direction: column;
padding: 5% 10%;
margin: auto;
transition: all 1s ease-in-out;
`;

export const Table = styled.table`
border-spacing: 0 10px;
width: 100%;
`

export const TableCategory = styled.tr`
width: 100%;
color: ${colors.white};
`

export const TableRow = styled.tr`
background-color: ${colors.white};
color: ${colors.mainText};
font-weight: bold;
width: 100%;
box-sizing: border-box;
transition: background-color 0.2s ease-in-out;
&:hover{
background-color: ${colors.rowShadow};
}


`
export const ChangePetRow = styled(TableRow)`
outline: none;
width: fit-content;
background-color: transparent;
&:hover{
background-color: transparent;
}

&.hidden{
height: 0;
display: none;
opacity: 0;
}
&.visible{
height: auto;
display: table-row;
opacity: 1;
}
`

export const TableCell = styled.td`
max-width: 180px;
text-align: left;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
padding: 0 0 0 15px;
  &.category{
  font-weight: 700;
  }
  &.roundLeft{
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  }
   &.roundRight{
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  }
  &.alignRight{
  text-align: right;
  }
  &.alignCenter{
  text-align: center;
  }
`

export const MoreBtn = styled.button`
border: none;
outline: none;
background-color: ${colors.white};
cursor: pointer;
transition: all 0.3s ease-in-out;
&:hover{
background-color: ${colors.rowShadow};
}
`
export const EmptyPetMsg = styled(TableCell)`
text-align: center;
`