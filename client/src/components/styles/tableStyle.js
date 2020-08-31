import styled from "styled-components";
import colors from "./colors";

export const Table = styled.table`
border-spacing: 0 10px;
`

export const TableCategory = styled.tr`
width: 100%;
color: ${colors.lightGray};

`

export const TableRow = styled.tr`
background-color: ${colors.white};
color: ${colors.mainText};
font-weight: bold;
width: 100%;
box-sizing: border-box;
`

export const TableCell = styled.td`
max-width: 180px;
text-align: left;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
padding: 0 0 0 15px;

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
