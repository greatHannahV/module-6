import { createContext, useContext, useEffect, useMemo } from "react";
import { Meta } from "./services/StockServices.types";
import { from, startWith, catchError, switchMap, of } from "rxjs";
import {
  fetchStockDetails,
  fetchStockSuggestions,
} from "./services/StockServices";
import { useObservable } from "./hooks/useObservable";
import { useBehavior } from "./hooks/useBehavior";
import { createBehaviorAdapter } from "./utils/behavior.utils";
import {
  initial as initialRD,
  pending as pendingRD,
  success as successRD,
  failure as failureRD,
} from "./utils/remoteData.utils";
import { LiveData } from "./utils/liveData.utils";

interface AppContextProps {
  search: string;
  setSearch: (value: string) => void;
  bookedStocks: Meta[];
  setBookedStocks: (value: Meta[]) => void;
  stocks: Meta[];
  setStocks: (value: Meta[]) => void;
  isLoading: boolean;
}

const initialBookedStocks: Meta[] = JSON.parse(
  localStorage.getItem("bookedStocks") || "[]"
);

const [setSearch, searchTerm$] = createBehaviorAdapter<string>("");
const [setStocks, rawStocks$] = createBehaviorAdapter<Meta[]>([]);
const [setBookedStocks, bookedStocks$] =
  createBehaviorAdapter<Meta[]>(initialBookedStocks);

const getStockDetails = (symbols: string[]): LiveData<Error, Meta[]> => {
  return from(fetchStockDetails(symbols)).pipe(
    switchMap((res) =>
      res && Array.isArray(res)
        ? of(successRD(res))
        : of(failureRD(new Error("Invalid or empty data")))
    ),
    catchError(() => of(failureRD(new Error("Error fetching stock details"))))
  );
};

const getStockSuggestions = (search: string): LiveData<Error, Meta[]> => {
  if (!search.trim()) {
    return of(failureRD(new Error("Search term is empty")));
  }
  return from(fetchStockSuggestions(search)).pipe(
    startWith(pendingRD()),
    switchMap((res) =>
      res && Array.isArray(res)
        ? of(successRD(res))
        : of(failureRD(new Error("Invalid data format")))
    ),
    switchMap((res) => {
      if (res._tag === "Success") {
        const symbols = res.value.map((stock) => stock.symbol);
        return getStockDetails(symbols);
      }
      return of(res);
    }),
    catchError(() =>
      of(failureRD(new Error("An error occurred while fetching")))
    )
  );
};

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const bookedStocks = useBehavior(bookedStocks$);
  const search = useBehavior(searchTerm$);
  const stocks$ = useMemo(() => {
    if (!search.trim()) {
      return of(failureRD(new Error("Search term is empty")));
    }
    return getStockSuggestions(search);
  }, [search]);
  const stocks = useObservable(stocks$, pendingRD());
  const isLoading = stocks._tag === "Pending";
  console.log(isLoading, "isLoading");
  console.log(stocks._tag, "tag");
  const stockData = stocks._tag === "Success" ? stocks.value : [];
  useEffect(() => {
    if (stocks._tag === "Success" && Array.isArray(stocks.value)) {
      setStocks(stocks.value);
    }
  }, [stocks]);

  return (
    <AppContext.Provider
      value={{
        search,
        setSearch,
        stocks: stockData,
        setStocks,
        bookedStocks,
        setBookedStocks,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
