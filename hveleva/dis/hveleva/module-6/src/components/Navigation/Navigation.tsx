import { memo } from "react";
import Search from "../Search/Search";
import {
  NavigationLink,
  NavigationList,
  NavigationStyles,
} from "./Navigation.styles";

const Navigation: React.FC = () => {
  return (
    <NavigationStyles>
      <NavigationList>
        <NavigationLink to="/">Home</NavigationLink>
        <NavigationLink to="/watchlist">Watchlist</NavigationLink>
      </NavigationList>
      <Search />
    </NavigationStyles>
  );
};

export default memo(Navigation);
