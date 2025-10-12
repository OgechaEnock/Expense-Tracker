import React, { useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import SearchBar from './components/SearchBar';

function App() {
  const [expenses, setExpenses] = useState([
    { 
      id: 1, 
      name: 'Uber Matumbo', 
      description: 'Wednesday Lunch', 
      category: 'Food', 
      amount: 1200, 
      date: '2024-01-15' 
    },
    { 
      id: 2, 
      name: 'KPLC tokens', 
      description: 'power tokens', 
      category: 'Utilities', 
      amount: 500, 
      date: '2024-01-14' 
    },
    { 
      id: 3, 
      name: 'Buy shoes', 
      description: 'Add to my shoe collection', 
      category: 'Shopping', 
      amount: 3500, 
      date: '2024-01-13' 
    },
    { 
      id: 4, 
      name: 'Buy book', 
      description: 'add to my book collection', 
      category: 'Education', 
      amount: 800, 
      date: '2024-01-12' 
    },
    { 
      id: 5, 
      name: 'Pay Loan', 
      description: 'bank loan repayment', 
      category: 'Finance', 
      amount: 5000, 
      date: '2024-01-11' 
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Add new expense
  const addExpense = (newExpense) => {
    const expense = {
      ...newExpense,
      id: Date.now(),
      amount: parseFloat(newExpense.amount)
    };
    setExpenses([...expenses, expense]);
  };

  // Delete expense
  const deleteExpense = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter(expense => expense.id !== id));
    }
  };

  // Handle sort change
  const handleSortChange = (e) => {
    const value = e.target.value;
    if (value.includes('-')) {
      const [field, order] = value.split('-');
      setSortField(field);
      setSortOrder(order);
    }
  };

  // Filter expenses based on search term
  const filteredExpenses = expenses.filter(expense => {
    const searchLower = searchTerm.toLowerCase();
    return (
      expense.name.toLowerCase().includes(searchLower) ||
      expense.description.toLowerCase().includes(searchLower) ||
      expense.category.toLowerCase().includes(searchLower)
    );
  });

  // Sort filtered expenses
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (!sortField) return 0;
    
    let aVal = a[sortField];
    let bVal = b[sortField];
    
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    
    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Calculate statistics
  const totalAmount = sortedExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const expenseCount = sortedExpenses.length;
  const averageExpense = expenseCount > 0 ? totalAmount / expenseCount : 0;

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>💰 Expense Tracker</h1>
          <p>Start taking control of your finances and life. Record, categorize and analyze your spending.</p>
        </header>

        <div className="main-content">
          <div className="form-section">
            <ExpenseForm onAddExpense={addExpense} />
          </div>

          <div className="table-section">
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-label">📊 Total Expenses</div>
                <div className="stat-value">{expenseCount}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">💵 Total Amount</div>
                <div className="stat-value">KSh {totalAmount.toLocaleString()}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">📈 Average</div>
                <div className="stat-value">
                  KSh {averageExpense.toLocaleString(undefined, {maximumFractionDigits: 0})}
                </div>
              </div>
            </div>

            <div className="controls-row">
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
              <div className="sort-controls">
                <label htmlFor="sort-select">Sort by:</label>
                <select 
                  id="sort-select"
                  className="sort-select" 
                  onChange={handleSortChange} 
                  value={`${sortField}-${sortOrder}`}
                >
                  <option value="date-desc">Date (Newest First)</option>
                  <option value="date-asc">Date (Oldest First)</option>
                  <option value="amount-desc">Amount (High to Low)</option>
                  <option value="amount-asc">Amount (Low to High)</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="category-asc">Category (A-Z)</option>
                  <option value="category-desc">Category (Z-A)</option>
                  <option value="description-asc">Description (A-Z)</option>
                  <option value="description-desc">Description (Z-A)</option>
                </select>
              </div>
            </div>

            <ExpenseTable 
              expenses={sortedExpenses}
              onDelete={deleteExpense}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;