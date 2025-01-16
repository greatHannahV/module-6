import { memo, useEffect, useRef, useState } from "react";
import { from, fromEvent } from "rxjs";
import { debounceTime, finalize, map, switchMap } from "rxjs/operators";
import { Input, SearchBarContainer, SearchIcon } from "./Search.style";
import { useAppContext } from "../../AppContext";
import SearchBarResult from "../SearchBarResult/SearchBarResult";
import { BiSearch } from "react-icons/bi";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {
  fetchStockDetails,
  fetchStockSuggestions,
} from "../../services/StockServices";

const Search: React.FC = () => {
  const { setSearch, isLoading } = useAppContext();

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      const subscription = fromEvent(inputRef.current, "input")
        .pipe(
          debounceTime(400),
          map((event: Event) => (event.target as HTMLInputElement).value),
          switchMap((search) => {
            setSearch(search);
            return from(fetchStockSuggestions(search)).pipe(
              map((stocks) => stocks.map((stock) => stock.symbol)),
              switchMap((symbols) => from(fetchStockDetails(symbols))),
              finalize(() => {})
            );
          })
        )
        .subscribe({
          error: (error) => {
            console.error("Error fetching data:", error);
          },
        });

      return () => subscription.unsubscribe();
    }
  }, [setSearch]);

  return (
    <SearchBarContainer>
      <SearchIcon>
        <BiSearch style={{ fontSize: "24px" }} />
      </SearchIcon>
      <Input
        data-testid="search-input"
        ref={inputRef}
        type="text"
        placeholder="Search..."
      />
      {isLoading ? <LoadingSpinner /> : <SearchBarResult />}{" "}
    </SearchBarContainer>
  );
};

export default memo(Search);
