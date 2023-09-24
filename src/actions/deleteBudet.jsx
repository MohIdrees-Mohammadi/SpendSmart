import { toast } from "react-toastify";
import { getAllMatchingItems, removeItem } from "../helper/helper";
import { redirect } from "react-router-dom";

export const deleteBudget = ({ params }) => {
  try {
    removeItem({
      key: "budget",
      id: params.id,
    });

    const associatedExpenses = getAllMatchingItems({
      catagory: "expense",
      key: "budgetId",
      value: params.id,
    });

    associatedExpenses.forEach((expenses) => {
      removeItem({
        key: "expense",
        id: expenses.id,
      });
    });

    toast.success("Budget has been deleted successfully");
  } catch (error) {
    throw new Error("There is problem deleting your budget!");
  }

  return redirect("/");
};
