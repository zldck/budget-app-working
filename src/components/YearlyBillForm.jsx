import React, { useState } from 'react';

export default function YearlyBillForm({ onAddYearlyBill }) {
  const [billName, setBillName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const yearly = parseFloat(amount);
    if (!isNaN(yearly) && yearly > 0 && billName) {
      onAddYearlyBill({ name: billName, yearlyAmount: yearly });
      setBillName('');
      setAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Yearly Bill</h2>
      <input
        type="text"
        placeholder="e.g., Domain Renewal"
        value={billName}
        onChange={(e) => setBillName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Yearly amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Add Yearly Bill</button>
    </form>
  );
}
