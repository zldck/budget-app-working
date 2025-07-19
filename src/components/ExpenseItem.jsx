import React from "react";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="expense-item"
      style={{
        background: "rgba(255, 255, 255, 0.02)",
        marginBottom: "1rem",
        padding: "0.75rem",
        borderRadius: "8px",
        border: "1px solid #333",
      }}
    >
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
    </motion.div>
  );
}
