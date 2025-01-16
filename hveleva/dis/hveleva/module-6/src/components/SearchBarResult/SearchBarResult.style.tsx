import styled from "styled-components";
import theme from "../../styles/theme.styles";

export const SearchBarResultStyle = styled.div`
  background-color: ${theme.background.main};
  box-shadow: rgba(17, 12, 46, 0.15) 0px 5px 100px 0px;
  width: 350px;
  max-height: 540px;
  position: fixed;
  top: 50px;
  rigth: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  z-index: 88888;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 40rem) {
    width: 250px;
    padding-right: 10px;
  }
`;

export const ResultStyle = styled.div`
  padding: 10px 15px;
  display: flex;
  align-items: center;
  border-bottom: ${theme.border.main};
  width: 100%;
  flex-grow: 1;
`;

export const Button = styled.button<{ clicked?: boolean }>`
  background: none;
  color: inherit;
  border: none;
  padding: 5px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  margin-left: auto;
  svg {
    color: ${({ clicked }) => (clicked ? "rgb(130, 169, 145)" : "grey")};
    font-size: 24px;
  }
`;

export const ResultDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 1rem;
  flex-grow: 1;
  width: 100%;
  height: 80px;
}
`;
export const ShortName = styled.div`
  font-weight: bold;
`;

export const RightContent = styled.div<{ $textColor?: string }>`
  color: ${({ $textColor }) => $textColor || "black"};
  justify-self: end;
  margin-right: 10px;
  font-weight: bold;
`;

export const StockSymbol = styled.div<{ $textColor?: string }>`
  color: ${theme.color.second};
`;

export const SearchBarButton = styled.button`
  padding: 7px;
  background-color: ${theme.color.main};
  width: 100px;
  align-self: end;
  border: none;
`;
