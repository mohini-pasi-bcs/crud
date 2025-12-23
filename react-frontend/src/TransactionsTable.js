import React, { useEffect, useState } from "react";
import "./TransactionsTable.css";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ title: "", amount: "", tranaction_type: "CREDIT" });
  const [editingId, setEditingId] = useState(null);

  const fetchTransactions = () => {
    fetch("http://127.0.0.1:8000/api/transactions/")
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // CREATE or UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editingId
      ? `http://127.0.0.1:8000/api/transactions/update/${editingId}/`
      : "http://127.0.0.1:8000/api/transactions/create/";
    const method = editingId ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(() => {
        fetchTransactions();
        setForm({ title: "", amount: "", tranaction_type: "CREDIT" });
        setEditingId(null);
      });
  };

  // DELETE
  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/transactions/delete/${id}/`, { method: "DELETE" })
      .then(() => fetchTransactions());
  };

  // EDIT
  const handleEdit = (transaction) => {
    setForm({
      title: transaction.title,
      amount: transaction.amount,
      tranaction_type: transaction.tranaction_type,
    });
    setEditingId(transaction.id);
  };

  return (
    <div className="container">
      <h2>Transactions</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="transaction-form">
        <input
          type="text"
          name="title"
          value={form.title}
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          value={form.amount}
          placeholder="Amount"
          onChange={handleChange}
          required
        />
        <select name="tranaction_type" value={form.tranaction_type} onChange={handleChange}>
          <option value="CREDIT">CREDIT</option>
          <option value="DEBIT">DEBIT</option>
        </select>
        <button type="submit">{editingId ? "Update" : "Add"}</button>
      </form>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id} className={t.tranaction_type === "DEBIT" ? "debit" : "credit"}>
              <td>{t.title}</td>
              <td>{t.amount}</td>
              <td>{t.tranaction_type}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(t)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
