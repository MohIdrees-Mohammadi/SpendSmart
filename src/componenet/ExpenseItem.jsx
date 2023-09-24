import React from "react";
import {
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingItems,
} from "../helper/helper";
import { Link, useFetcher } from "react-router-dom";

const ExpenseItem = ({ expense, showBudget = true }) => {
  const budget = getAllMatchingItems({
    catagory: "budget",
    key: "id",
    value: expense.budgetId,
  })[0];

  const fetcher = useFetcher();

  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      <td>
        {showBudget && (
          <td>
            <Link
              style={{
                "--accent": budget.color,
              }}
              to={`/budget/${budget.id}`}
            >
              {budget.name}
            </Link>
          </td>
        )}
      </td>
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />

          <button
            className="btn btn--warning"
            type="submit"
            aria-label={`Delete ${expense.name} expense`}
          >
            Delete
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
