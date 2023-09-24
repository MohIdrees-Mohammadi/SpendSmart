// function and components imports
import Main, { mainLoader } from "./layout/Main";
import Error from "./pages/Error";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import { logoutFunction } from "./actions/logout";
import BudgetPage, { budgetLoader, budgetdAction } from "./pages/BudgetPage";
// react router dom
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// reatc tostify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import ExpensePage, {
  expensePageAction,
  expensePageLoader,
} from "./pages/ExpensePage";
import { deleteBudget } from "./actions/deleteBudet";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
      },
      {
        path: "expense",
        element: <ExpensePage />,
        loader: expensePageLoader,
        action: expensePageAction,
      },
      {
        path: "/logout",
        action: logoutFunction,
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetdAction,
        children: [
          {
            path: "delete",
            action: deleteBudget,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
