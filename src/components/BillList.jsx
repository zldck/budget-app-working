function BillList({ bills }) {
  return (
    <div className="bill-list">
      {bills.length === 0 ? (
        <p className="empty">No bills added yet.</p>
      ) : (
        <ul>
          {bills.map((bill, index) => (
            <li key={index}>
              <span>{bill.name}</span>
              <span>₱{bill.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BillList;
