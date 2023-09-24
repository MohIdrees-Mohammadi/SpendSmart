import { useLoaderData } from "react-router-dom";
import { delayTime, fetchData, removeItem } from "../helper/helper";
import Table from "../componenet/Table";
import { toast } from "react-toastify";

export const expensePageLoader = () => {
  const expense = fetchData("expense");
  return { expense };
};
export const expensePageAction = async ({ request }) => {
  await delayTime();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === "deleteExpense") {
    alert("happened");
  }
};
const ExpensePage = () => {
  const { expense } = useLoaderData();
  return (
    <div className="grid-lg">
      <h1>All Expense</h1>
      {expense && expense.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expense <small>({expense.length} items)</small>
          </h2>
          <Table expense={expense} />
        </div>
      ) : (
        <p>Nothing to show here!</p>
      )}
    </div>
  );
};

export default ExpensePage;
