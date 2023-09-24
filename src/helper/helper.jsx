const generateNewRandomColor = () => {
  const existingBudgetLength = fetchData("budget")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

//creating budget
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateNewRandomColor(),
  };
  const existingBudget = fetchData("budget") ?? [];
  return localStorage.setItem(
    "budget",
    JSON.stringify([...existingBudget, newItem])
  );
};
//creating expense
export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  const existingExpense = fetchData("expense") ?? [];
  return localStorage.setItem(
    "expense",
    JSON.stringify([...existingExpense, newItem])
  );
};

//generate random time delay
export const delayTime = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

// formating currency

export const formatCurrency = (amount) => {
  return amount.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};

// format percentage
export const formatPercetage = (amount) => {
  return amount.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

// total expent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expense = fetchData("expense") ?? [];
  const budgetSpent = expense.reduce((acc, expenses) => {
    // check if expense.id === budget.id
    if (expenses.budgetId !== budgetId) return acc;

    // add the current amount to my total
    return (acc += expenses.amount);
  }, 0);
  return budgetSpent;
};

// format date to locale String
export const formatDateToLocaleString = (epoch) => {
  return new Date(epoch).toLocaleDateString();
};

// get all data
export const getAllMatchingItems = ({ catagory, key, value }) => {
  const data = fetchData(catagory) ?? [];
  return data.filter((item) => item[key] === value);
};

// deleting item from local storage
export const removeItem = ({ key, id }) => {
  const existingItem = fetchData(key);
  if (id) {
    const newData = existingItem.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};
