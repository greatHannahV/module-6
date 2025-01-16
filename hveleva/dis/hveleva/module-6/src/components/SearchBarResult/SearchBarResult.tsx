import {
  SearchBarResultStyle,
  ResultStyle,
  Button,
  ResultDetails,
  RightContent,
  StockSymbol,
  SearchBarButton,
  ShortName,
} from "./SearchBarResult.style";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { useAppContext } from "../../AppContext";
import { getTextColorForTable } from "../Table/Table.util";
import { useEffect, useRef, memo } from "react";
import { Meta } from "../../services/StockServices.types";
import { useBookmarks } from "../../hooks/useBookmarks";
import { useToggle } from "../../hooks/useToggle";

function SearchBarResult() {
  const { search, stocks, bookedStocks, setSearch } = useAppContext();
  const { addBookmark, removeBookmark } = useBookmarks();
  const [modal, toggleModal, setModal] = useToggle();

  const searchResultRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bookedStocks.length > 0) {
      localStorage.setItem("bookedStocks", JSON.stringify(bookedStocks));
    }
  }, [bookedStocks]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchResultRef.current &&
        !searchResultRef.current.contains(event.target as Node)
      ) {
        setModal(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBookmarkToggle = (stock: Meta) => {
    if (bookedStocks.some((s) => s.shortName === stock.shortName)) {
      removeBookmark(stock);
    } else {
      addBookmark(stock);
    }
  };

  const hasMatchingStocks = search.trim().length > 0;

  useEffect(() => {
    setModal(search.trim().length > 0);
  }, [search]);

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.shortName &&
      stock.shortName.toLowerCase().includes(search.toLowerCase())
  );

  const isNoMatchingStockFound = filteredStocks.length === 0;

  // If there are no matching stocks and search term is not empty, show the error message
  if (!hasMatchingStocks) return null;

  return (
    <SearchBarResultStyle ref={searchResultRef}>
      <SearchBarButton data-testid="clear-button" onClick={() => setSearch("")}>
        Clear search
      </SearchBarButton>

      {modal && stocks.length > 0 && filteredStocks.length > 0
        ? filteredStocks.map((stock) => {
            const isBookmarked = bookedStocks.some(
              (s) => s.shortName === stock.shortName
            );

            return (
              <ResultStyle key={stock.symbol}>
                <ResultDetails>
                  <ShortName>{stock.shortName}</ShortName>
                  <RightContent>
                    {stock.regularMarketChange?.toFixed(2)}
                  </RightContent>
                  <StockSymbol>{stock.symbol}</StockSymbol>
                  <RightContent
                    $textColor={getTextColorForTable(
                      "regularMarketChangePercent",
                      stock.regularMarketChangePercent
                    )}
                  >
                    {stock.regularMarketChangePercent?.toFixed(2)}
                  </RightContent>
                </ResultDetails>
                <Button
                  data-testid="button"
                  onClick={() => handleBookmarkToggle(stock)}
                >
                  {isBookmarked ? (
                    <IoBookmark data-testid="add-bookmark-button" />
                  ) : (
                    <IoBookmarkOutline data-testid="remove-bookmark-button" />
                  )}
                </Button>
              </ResultStyle>
            );
          })
        : isNoMatchingStockFound && (
            <SearchBarResultStyle style={{ color: "red", padding: "1rem" }}>
              No matching stocks found for "{search}"
            </SearchBarResultStyle>
          )}
    </SearchBarResultStyle>
  );
}

export default memo(SearchBarResult);
