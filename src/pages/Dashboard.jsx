import { Link, useLoaderData } from "react-router-dom";
import {
  createBudget,
  createExpense,
  delayTime,
  fetchData,
  removeItem,
} from "../helper/helper";
import Intro from "../pages/Intro";
import { toast } from "react-toastify";
import AddBudget from "../componenet/AddBudget";
import AddExpense from "../componenet/AddExpense";
import BudgetItem from "../componenet/BudgetItem";
import Table from "../componenet/Table";

export const dashboardLoader = () => {
  const userName = fetchData("userName");
  const budget = fetchData("budget");
  const expense = fetchData("expense");
  return { userName, budget, expense };
};

export const dashboardAction = async ({ request }) => {
  await delayTime();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // usecase for creating newUser
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (error) {
      throw new Error("There was a problem creating your account!");
    }
  }

  // usecase for creating newBudget
  if (_action === "addNewBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success(`Budget Created!`);
    } catch (error) {
      throw new Error("There was a problem creating your budget!");
    }
  }
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

const Dashboard = () => {
  const { userName, budget, expense } = useLoaderData();
  return (
    <>
      <div>
        {userName ? (
          <div className="dashboard">
            <h1>
              Welcome back, <span className="accent">{userName}</span>
            </h1>
            <div className="grid-sm">
              {/* if budget exits and its length is greater than 0  */}
              {budget && budget.length > 0 ? (
                <div className="grid-lg">
                  <div className="flex-lg">
                    <AddBudget />
                    <AddExpense budget={budget} />
                  </div>
                  <h2>Existing Budget</h2>
                  <div className="budgets">
                    {budget.map((budget) => (
                      <BudgetItem key={budget.id} budget={budget} />
                    ))}
                  </div>
                  {expense && expense.length > 0 && (
                    <div className="grid-md">
                      <h2>Recent Expenses</h2>
                      <Table
                        expense={expense
                          .sort((a, b) => b.createdAt - a.createdAt)
                          .slice(0, 8)}
                      />
                      {expense.length > 8 && (
                        <Link to="Expense" className="btn btn--dark">
                          view all expenses
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid-sm">
                  <p>Personal budgeting is the secret to financial freedom.</p>
                  <p>Create a budget to get started!</p>
                  <AddBudget />
                </div>
              )}
            </div>
          </div>
        ) : (
          <Intro />
        )}
      </div>
    </>
  );
};

export default Dashboard;
