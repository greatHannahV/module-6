import styled from "styled-components";

export const Input = styled.input`
  margin-left: auto;
  margin-right: 9rem;
  height: 2rem;
  width: 200px;
  margin-top: 8px;
  padding: 5px;
  border-radius: 5px;
  border: none;
  justify-self: flex-end;
  padding-left: 30px;

  &:focus {
    outline: none;
    border: solid 1px #38a169;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  top: 12px;
  left: 2px;
  color: gray;
`;

export const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  position: relative;
  margin-right: 1rem;
`;

export const SearchBarBox = styled.div`
  background-color: red;
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: -25px;
  position: absolute;
  top: 10px;
  right: 20px;
`;
