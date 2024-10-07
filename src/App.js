import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions'));
    if (savedTransactions) {
      setTransactions(savedTransactions);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = () => {
    if (text && amount) {
      const newTransaction = {
        id: Date.now(),
        text,
        amount: +amount,
        type,
      };
      setTransactions([...transactions, newTransaction]);
      setText('');
      setAmount('');
    }
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const calculateBalance = () => {
    return transactions.reduce(
      (acc, transaction) =>
        transaction.type === 'income'
          ? acc + transaction.amount
          : acc - transaction.amount,
      0
    );
  };

  const calculateTotalIncome = () => {
    return transactions
      .filter((transaction) => transaction.type === 'income')
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  };

  const calculateTotalExpense = () => {
    return transactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  };

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <div className="balance">
        <h2>Your Balance: ₹{calculateBalance()}</h2>
      </div>

      <div className="income-expense">
        <div>
          <h3>Income</h3>
          <p>₹{calculateTotalIncome()}</p>
        </div>
        <div>
          <h3>Expenses</h3>
          <p>₹{calculateTotalExpense()}</p>
        </div>
      </div>

      <div className="add-transaction">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter description"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button onClick={handleAddTransaction}>Add Transaction</button>
      </div>

      <ul className="transaction-list">
        {transactions.map((transaction) => (
          <li key={transaction.id} className={transaction.type}>
            <span>{transaction.text}</span>
            <span>
              ₹{transaction.amount}{' '}
              <button onClick={() => handleDeleteTransaction(transaction.id)}>X</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
