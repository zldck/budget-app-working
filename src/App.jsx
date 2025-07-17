import React, { useState } from "react";
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
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);

  const now = new Date();
  const current = new Date(now.getFullYear(), now.getMonth() + currentMonthOffset);
  const monthYear = current.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount || !date) return;

    const entry = { name, amount: parseFloat(amount), date };
    const updatedExpenses = [...expenses];
    if (editingIndex !== null) {
      updatedExpenses[editingIndex] = entry;
      setEditingIndex(null);
    } else {
      updatedExpenses.push(entry);
    }
    setExpenses(updatedExpenses);
    setName("");
    setAmount("");
    setDate("");
  };

  const handleEdit = (index) => {
    const entry = expenses[index];
    setName(entry.name);
    setAmount(entry.amount);
    setDate(entry.date);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = expenses.filter((_, i) => i !== index);
    setExpenses(updated);
  };

  const visibleExpenses = expenses.filter((e) => {
    const d = new Date(e.date);
    return d.getMonth() === current.getMonth() && d.getFullYear() === current.getFullYear();
  });

  const totalNeeded = visibleExpenses.reduce((sum, e) => sum + e.amount, 0);

  const monthlySaves = expenses.map((e) => {
    const targetDate = new Date(e.date);
    const nowDate = new Date();
    const months =
      (targetDate.getFullYear() - nowDate.getFullYear()) * 12 +
      (targetDate.getMonth() - nowDate.getMonth());
    const savePerMonth = months > 0 ? e.amount / months : e.amount;
    return { ...e, savePerMonth };
  });

  return (
    <div className="container">
      <h1>🧾 Budget Planner</h1>
      <form onSubmit={handleSubmit}>
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
    amount === ''
      ? ''
      : Number(amount.replace(/,/g, '')).toLocaleString()
  }
  onChange={(e) => {
    const raw = e.target.value.replace(/,/g, '');
    if (!isNaN(raw)) {
      setAmount(raw);
    }
  }}
/>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">{editingIndex !== null ? "Update" : "Add"}</button>
      </form>

      

      <table>
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
            <tr key={index}>
              <td>{e.name}</td>
              <td>₱{formatNumber(e.amount)}</td>
              <td>{new Date(e.date).toLocaleDateString()}</td>
              <td>₱{formatNumber(e.savePerMonth)}</td>
              <td>
                <button onClick={() => handleEdit(index)} className="icon-btn">✏️</button>
                <button onClick={() => handleDelete(index)} className="icon-btn">❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total to Set Aside this Month: ₱{formatNumber(totalNeeded)}</h3>
    </div>
  );
}

export default App;
