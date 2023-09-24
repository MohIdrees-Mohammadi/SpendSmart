import { toast } from "react-toastify";
import AddExpense from "../componenet/AddExpense";
import BudgetItem from "../componenet/BudgetItem";
import Table from "../componenet/Table";
import {
  createExpense,
  delayTime,
  getAllMatchingItems,
  removeItem,
} from "../helper/helper";
import { useLoaderData } from "react-router-dom";

export const budgetLoader = ({ params }) => {
  const budget = getAllMatchingItems({
    catagory: "budget",
    key: "id",
    value: params.id,
  })[0];

  const expense = getAllMatchingItems({
    catagory: "expense",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget you're try to find doesn't exist");
  }

  return { budget, expense };
};

// Action
export const budgetdAction = async ({ request }) => {
  await delayTime();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "submitExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} Created!`);
    } catch (error) {
      throw new Error("There was a problem creating your Expense!");
    }
  }

  if (_action === "deleteExpense") {
    try {
      removeItem({
        key: "expense",
        id: values.expenseId,
      });
      return toast.success("Expense Deleted!");
    } catch (error) {
      throw new Error("There was a problem deleting your Expense!");
    }
  }
};

const BudgetPage = () => {
  const { budget, expense } = useLoaderData();
  return (
    <div className="grid-lg" style={{ "--accent": budget.color }}>
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpense budget={[budget]} />
      </div>
      {expense && expense.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <Table expense={expense} showBudget={false} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
