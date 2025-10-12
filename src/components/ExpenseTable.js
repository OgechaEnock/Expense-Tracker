import React from 'react';

function ExpenseTable({ expenses, onDelete }) {
  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="table-container">
      <table className="expense-table">
        <thead>
          <tr>
            <th>Expense</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">
                No expenses found. Add your first expense to get started!
              </td>
            </tr>
          ) : (
            expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="expense-name">{expense.name}</td>
                <td>{expense.description}</td>
                <td>
                  <span className="category-badge">{expense.category}</span>
                </td>
                <td className="amount">
                  KSh {expense.amount.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </td>
                <td>{formatDate(expense.date)}</td>
                <td>
                  <button 
                    onClick={() => onDelete(expense.id)}
                    className="delete-btn"
                    title="Delete this expense"
                    aria-label={`Delete ${expense.name}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;