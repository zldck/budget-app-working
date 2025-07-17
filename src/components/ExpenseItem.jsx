import React from "react";

export default function ExpenseItem({ name, amount, date, onEdit, onDelete, monthlySaving }) {
  const formattedAmount = amount.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedMonthly = monthlySaving.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="expense-item">
      <div className="expense-info">
        <strong>{name}</strong>
        <span>₱{formattedAmount}</span>
        <small>{new Date(date).toLocaleDateString()}</small>
        <div className="monthly-saving">
          Save ₱{formattedMonthly} per month
        </div>
      </div>
      <div className="expense-actions">
        <button onClick={onEdit} className="icon-btn">✏️</button>
        <button onClick={onDelete} className="icon-btn">❌</button>
      </div>
    </div>
  );
}
