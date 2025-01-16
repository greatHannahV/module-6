import { createBrowserRouter, RouteObject } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import Chart from "./pages/Chart/Chart";
import Error from "./pages/Error/Error";
import Watchlist from "./pages/Watchlist/Watchlist";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
    errorElement: <Error />,
  },
  {
    path: "/chart/:symbol",
    element: <Chart />,
    errorElement: <Error />,
  },
  {
    path: "/watchlist",
    element: <Watchlist />,
    errorElement: <Error />,
  },
];

const router = createBrowserRouter(routes);

export default router;
