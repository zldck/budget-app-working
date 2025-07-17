import { useState } from "react";

function AddBillForm({ onAddBill }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) return;

    onAddBill({ name, amount: parseFloat(amount) });
    setName("");
    setAmount("");
  };

  return (
    <form className="bill-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Bill name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount (₱)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Add Bill</button>
    </form>
  );
}

export default AddBillForm;
