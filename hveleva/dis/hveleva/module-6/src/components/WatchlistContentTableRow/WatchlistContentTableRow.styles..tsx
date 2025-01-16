import styled from "styled-components";
import { NavLink } from "react-router";
import theme from "../../styles/theme.styles";

export const TableBodyItems = styled(NavLink)`
  display: grid;
  grid-template-columns: 1fr 200px 200px 30px;
  width: 50%;
  align-items: center;
  text-decoration: none;
  color: black;
  padding: 15px;
  border-bottom: ${theme.border.secondary};
  cursor: grab;
  transition: all 0.3s;

  &:hover {
    background-color: ${theme.color.main};
    box-shadow: 0px 2px 8px 0px rgba(99, 99, 99, 0.2);
  }

  @media (max-width: 62rem) {
    grid-template-columns: 1fr 100px 100px 10px;
    padding: 10px;
  }
  @media (max-width: 45rem) {
    min-width: 380px;
    border-bottom: ${theme.border.secondary};
  }
  @media (max-width: 25rem) {
    min-width: 340px;
  }
`;

export const TableNameAndSymbol = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
`;

export const SymbolStyle = styled.div`
  color: #4d4d4d;
  padding: 5px;
`;

export const ShortNameStyle = styled.div`
  font-weight: bold;
  padding: 5px;
`;

export const MarketChange = styled.div<{ $isNegative: boolean }>`
  color: ${(props) => (props.$isNegative ? "#A80000" : "#005700")};
`;
