import { useCallback } from "react";
import { useAppContext } from "../AppContext";
import { Meta } from "../services/StockServices.types";

export const useBookmarks = () => {
  const { setBookedStocks, bookedStocks } = useAppContext();

  const addBookmark = useCallback(
    (stock: Meta) => {
      const updatedBookedStocks = [...bookedStocks, stock];
      localStorage.setItem("bookedStocks", JSON.stringify(updatedBookedStocks));
      setBookedStocks(updatedBookedStocks);
    },
    [setBookedStocks, bookedStocks]
  );

  const removeBookmark = useCallback(
    (stock: Meta) => {
      const updatedBookedStocks = bookedStocks.filter(
        (s: Meta) => s.shortName !== stock.shortName
      );
      localStorage.setItem("bookedStocks", JSON.stringify(updatedBookedStocks));
      setBookedStocks(updatedBookedStocks);
    },
    [setBookedStocks, bookedStocks]
  );

  return {
    addBookmark,
    removeBookmark,
  };
};
