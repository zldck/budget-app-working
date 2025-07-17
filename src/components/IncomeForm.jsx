import React, { useState } from 'react';

export default function IncomeForm({ onIncomeSubmit }) {
  const [income, setIncome] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsed = parseFloat(income);
    if (!isNaN(parsed)) {
      onIncomeSubmit(parsed);
      setIncome('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Monthly Income</h2>
      <input
        type="number"
        placeholder="Enter your income"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
        required
      />
      <button type="submit">Set Income</button>
    </form>
  );
}
