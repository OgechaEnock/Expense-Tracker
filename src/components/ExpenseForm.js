import React, { useState } from 'react';

function ExpenseForm({ onAddExpense }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    amount: '',
    date: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields are filled
    if (!formData.name || !formData.description || !formData.category || !formData.amount || !formData.date) {
      alert('Please fill in all fields');
      return;
    }

    // Validate amount is positive
    if (parseFloat(formData.amount) <= 0) {
      alert('Amount must be greater than 0');
      return;
    }

    // Create new expense object
    const newExpense = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      amount: parseFloat(formData.amount),
      date: formData.date
    };

    // Call parent function to add expense
    onAddExpense(newExpense);
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      category: '',
      amount: '',
      date: ''
    });
  };

  return (
    <div className="expense-form">
      <h2>Add Expense</h2>
      <p className="form-subtitle">Enter your expense details below.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Expense Name *</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Uber Matumbo"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <input
            id="description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="e.g., Wednesday Lunch"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <input
            id="category"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="e.g., Food, Transport, Shopping"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount (KSh) *</label>
          <input
            id="amount"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="e.g., 1200"
            step="0.01"
            min="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date *</label>
          <input
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;