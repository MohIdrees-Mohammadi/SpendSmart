import { Form, Link } from "react-router-dom";
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercetage,
} from "../helper/helper";

const BudgetItem = ({
  budget: { id, name, amount, color },
  showDelete = false,
}) => {
  const spent = calculateSpentByBudget(id);
  return (
    <div
      className="budget"
      style={{
        "--accent": color,
      }}
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} budgeted</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercetage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small> {formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </div>
      <div className="flex-sm">
        {showDelete ? (
          <div className="flex-sm">
            <Form
              method="post"
              action="delete"
              onSubmit={(e) => {
                if (
                  !confirm(
                    "Are you sure you want to ermanently delete this budget?"
                  )
                ) {
                  e.preventDefault();
                }
              }}
            >
              <button type="submit" className="btn">
                <span>Delete Budget</span>
              </button>
            </Form>
          </div>
        ) : (
          <Link to={`/budget/${id}`} className="btn">
            <span>View Details</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BudgetItem;
