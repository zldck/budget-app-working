import React, { useState, useEffect } from "react";
import "./App.css";

function formatNumber(num) {
  return Number(num).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function App() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [monthlyBudget, setMonthlyBudget] = useState("");
  const [loading, setLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("budgetData");
      if (savedData) {
        const data = JSON.parse(savedData);
        setExpenses(data.expenses || []);
        setMonthlyBudget(data.monthlyBudget || "");
      }
    } catch (e) {
      console.error("Failed to load data from localStorage", e);
    }
    setLoading(false);
  }, []);

  // Save to localStorage when expenses or budget changes
  useEffect(() => {
    if (!loading) {
      const data = { expenses, monthlyBudget };
      localStorage.setItem("budgetData", JSON.stringify(data));
    }
  }, [expenses, monthlyBudget, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount || !date) return;

    const entry = {
      name,
      amount: parseFloat(amount),
      date,
    };
    setExpenses([...expenses, entry]);
    setName("");
    setAmount("");
    setDate("");
  };

  const handleDelete = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const now = new Date();
  const monthYear = now.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const monthlySaves = expenses.map((e) => {
    const targetDate = new Date(e.date);
    const nowDate = new Date();
    const months =
      (targetDate.getFullYear() - nowDate.getFullYear()) * 12 +
      (targetDate.getMonth() - nowDate.getMonth());
    const savePerMonth = months > 0 ? e.amount / months : e.amount;
    return { ...e, savePerMonth };
  });

  const totalNeeded = monthlySaves.reduce((sum, e) => sum + e.savePerMonth, 0);
  const budgetNum = parseFloat(monthlyBudget.toString().replace(/,/g, "")) || 0;
  const budgetDiff = budgetNum - totalNeeded;

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</p>;
  }

  return (
    <div className="container">
      <h1>🧾 Budget Planner (LocalStorage)</h1>

      <form onSubmit={handleSubmit} className="expense-form">
        <input
          type="text"
          placeholder="Expense Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Amount"
          value={
            amount === "" ? "" : Number(amount.replace(/,/g, "")).toLocaleString()
          }
          onChange={(e) => {
            const raw = e.target.value.replace(/,/g, "");
            if (!isNaN(raw)) setAmount(raw);
          }}
        />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button type="submit">Add</button>
      </form>

      <div className="budget-summary">
        <input
          type="text"
          placeholder="Enter Monthly Budget"
          value={
            monthlyBudget === ""
              ? ""
              : Number(monthlyBudget.replace(/,/g, "")).toLocaleString()
          }
          onChange={(e) => {
            const raw = e.target.value.replace(/,/g, "");
            if (!isNaN(raw)) setMonthlyBudget(raw);
          }}
        />
        <p>🗓️ <strong>{monthYear}</strong></p>
        <p>Total to Set Aside: ₱{formatNumber(totalNeeded)}</p>
        <p>Your Monthly Budget: ₱{formatNumber(budgetNum)}</p>
        <p>
          Difference:{" "}
          <span style={{ color: budgetDiff >= 0 ? "green" : "red" }}>
            ₱{formatNumber(budgetDiff)}
          </span>
        </p>
      </div>

      <table className="expenses-table">
        <thead>
          <tr>
            <th>📝 Name</th>
            <th>💰 Amount</th>
            <th>📅 Date</th>
            <th>🗓️ Monthly Save</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {monthlySaves.map((e, index) => (
            <tr key={index} className="animate-entry">
              <td>{e.name}</td>
              <td>₱{formatNumber(e.amount)}</td>
              <td>{new Date(e.date).toLocaleDateString()}</td>
              <td>₱{formatNumber(e.savePerMonth)}</td>
              <td>
                <button onClick={() => handleDelete(index)} className="icon-btn">
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
