import styled from "styled-components";
import theme from "../../styles/theme.styles";

export const TableHeader = styled.div`
  display: grid;
  width: 50%;
  height: 50px;
  border-bottom: ${theme.border.secondary};
  margin-top: 10px;
  padding: 10px 0 10px 25px;
  grid-template-columns: 1fr 200px 250px;
  color: #4d4d4d;
  align-items: center;
  background-color: #ececec;
  overflow-x: hidden;

  @media (max-width: 62rem) {
    grid-template-columns: 1fr 100px 150px;
    padding: 5px 0 5px 25px;
  }
  @media (max-width: 45rem) {
    min-width: 380px;
  }
  @media (max-width: 25rem) {
    min-width: 340px;
  }
`;

export const TableItem = styled.div`
  justify-self: center;

  &:first-child {
    justify-self: start;
  }
  &:last-child {
    margin-left: -30px;
  }
`;

export const NameOfHeader = styled.div`
  display: flex;
`;

export const IconOfHeader = styled.div`
  margin: 2px;
`;
