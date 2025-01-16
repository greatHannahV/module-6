import { useAppContext } from "../../AppContext";
import DeleteButton from "../DeleteButton/DeleteButton";
import WatchlistContentTableRow from "../WatchlistContentTableRow/WatchlistContentTableRow";
import { TableBody, BookedStocksStyle } from "./WatchlistContentBody.styles";

function WatchlistContentBody() {
  const { bookedStocks } = useAppContext();

  return (
    <TableBody>
      {bookedStocks.map((stock, i) => (
        <BookedStocksStyle key={i} data-testid="stock-row">
          <WatchlistContentTableRow stock={stock} />
          <DeleteButton stock={stock} />
        </BookedStocksStyle>
      ))}
    </TableBody>
  );
}

export default WatchlistContentBody;
