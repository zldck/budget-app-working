import React, { useState } from 'react';

export default function MoneyForm({ onSetMonthlyBudget }) {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (!isNaN(num) && num > 0) {
      onSetMonthlyBudget(num);
      setAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Set Monthly Budget</h2>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Set Budget</button>
    </form>
  );
}
