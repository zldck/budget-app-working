import React from "react";
import "./App.css"; // Make sure this is imported

function BillList({ bills }) {
  return (
    <div className="bill-list">
      {bills.length === 0 ? (
        <p className="empty">No bills added yet.</p>
      ) : (
        <table className="bill-table">
          <thead>
            <tr>
              <th>Bill Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill, index) => (
              <tr key={index} className="fade-slide-in">
                <td>{bill.name}</td>
                <td>₱{bill.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BillList;
