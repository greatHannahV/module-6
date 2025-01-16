import { WatchlistHeaders } from "../WatchlistContent/WatchlistContent.utils";
import {
  IconOfHeader,
  NameOfHeader,
  TableHeader,
  TableItem,
} from "./WatchlistContentHeader.styles";
import { GoArrowDown } from "react-icons/go";

const headerName = (name?: string) => {
  if (name === "Name") {
    return (
      <NameOfHeader>
        <div>{name}</div>
        <IconOfHeader>
          <GoArrowDown />
        </IconOfHeader>
      </NameOfHeader>
    );
  }
  return name;
};

function WatchlistContentHeader() {
  return (
    <TableHeader>
      {Object.values(WatchlistHeaders).map((name, index) => (
        <TableItem key={index}>{headerName(name)}</TableItem>
      ))}
    </TableHeader>
  );
}

export default WatchlistContentHeader;
