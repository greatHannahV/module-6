import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const NavigationStyles = styled.nav`
  height: 3rem;
  width: 100%;
  z-index: 99;
  background-color: #ececec;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 5px 80px 0px;
  display: flex;
`;

export const NavigationList = styled.div`
  display: flex;
  margin-left: 18px;
  transition: all 0.3s;
  }
`;

export const NavigationLink = styled(NavLink)`
 color:black;
 text-decoration:none;
 padding: 1rem;
 
    &:hover {
      color: #38a169;
      text-decoration: none;
    
`;
