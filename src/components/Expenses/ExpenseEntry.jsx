import React, { useEffect, useMemo, useState } from 'react';
import { PlusCircle, Wallet } from 'lucide-react';
import InputField from '../Shared/InputField';
import Button from '../Shared/Button';

const currencyFormatter = new Intl.NumberFormat('en-SA', {
  style: 'currency',
  currency: 'SAR',
  maximumFractionDigits: 0
});

function ExpenseEntry({
  categories = [],
  accounts = [],
  onAddExpense,
  onAddAccount,
  onQuickAddCategory,
  expenses = []
}) {
  const today = new Date().toISOString().split('T')[0];
  const activeCategories = useMemo(() => categories.filter((category) => category.enabled), [categories]);

  const [form, setForm] = useState({
    title: '',
    amount: '',
    date: today,
    categoryId: activeCategories[0]?.id || '',
    accountId: accounts[0]?.id || '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [newAccountName, setNewAccountName] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAccountField, setShowAccountField] = useState(false);
  const [showCategoryField, setShowCategoryField] = useState(false);

  useEffect(() => {
    if (!activeCategories.length) return;
    setForm((prev) => ({
      ...prev,
      categoryId: activeCategories.find((category) => category.id === prev.categoryId)?.id || activeCategories[0].id
    }));
  }, [activeCategories]);

  useEffect(() => {
    if (!accounts.length) return;
    setForm((prev) => ({
      ...prev,
      accountId: accounts.find((account) => account.id === prev.accountId)?.id || accounts[0].id
    }));
  }, [accounts]);

  const validateForm = () => {
    const nextErrors = {};
    if (!form.title.trim()) {
      nextErrors.title = 'Title is required';
    }
    const amount = Number(form.amount);
    if (!amount || amount <= 0) {
      nextErrors.amount = 'Amount must be positive';
    }
    if (!form.categoryId) {
      nextErrors.categoryId = 'Choose a category';
    }
    if (!form.accountId) {
      nextErrors.accountId = 'Create an account before saving';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    const result = onAddExpense ? onAddExpense(form) : { ok: true, message: 'Expense saved locally' };
    setFeedback(result);
    if (result?.ok) {
      setForm((prev) => ({
        ...prev,
        title: '',
        amount: '',
        date: today,
        notes: ''
      }));
    }
  };

  const handleCreateAccount = () => {
    if (!newAccountName.trim()) return;
    const result = onAddAccount?.(newAccountName.trim());
    setFeedback(result);
    if (result?.ok) {
      setNewAccountName('');
      setShowAccountField(false);
    }
  };

  const handleCreateCategory = () => {
    if (!newCategoryName.trim()) return;
    const result = onQuickAddCategory?.(newCategoryName.trim());
    setFeedback(result);
    if (result?.ok) {
      setNewCategoryName('');
      setShowCategoryField(false);
    }
  };

  const recentExpenses = expenses.length
    ? expenses
    : [
        { id: 'sample-1', title: 'Groceries', amount: 125, date: today, categoryName: 'Food' },
        { id: 'sample-2', title: 'Ride Share', amount: 38, date: today, categoryName: 'Transportation' }
      ];

  return (
    <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Manual Expense Entry</h2>
        <span className="text-sm text-slate-400">SAR currency · Secure input</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputField
            label="Expense title"
            name="title"
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
            placeholder="e.g., Client dinner"
            required
            error={errors.title}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              label="Amount"
              type="number"
              name="amount"
              value={form.amount}
              onChange={(event) => setForm({ ...form, amount: event.target.value })}
              min="0"
              step="0.01"
              required
              error={errors.amount}
            />
            <InputField
              label="Date"
              type="date"
              name="date"
              value={form.date}
              onChange={(event) => setForm({ ...form, date: event.target.value })}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Account</label>
              {accounts.length > 0 ? (
                <select
                  value={form.accountId}
                  onChange={(event) => setForm({ ...form, accountId: event.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                >
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-sm text-red-300">Create an account to store expenses</p>
              )}
              {errors.accountId && <p className="text-xs text-red-400 mt-1">{errors.accountId}</p>}
              <button
                type="button"
                onClick={() => setShowAccountField((prev) => !prev)}
                className="mt-2 flex items-center gap-1 text-xs text-emerald-300"
              >
                <Wallet className="w-3 h-3" />
                {showAccountField ? 'Cancel account' : 'Add new account'}
              </button>
              {showAccountField && (
                <div className="mt-2 flex gap-2">
                  <input
                    value={newAccountName}
                    onChange={(event) => setNewAccountName(event.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                    placeholder="Account name"
                  />
                  <Button onClick={handleCreateAccount} variant="primary" type="button">
                    Save
                  </Button>
                </div>
              )}
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Category</label>
              {activeCategories.length > 0 ? (
                <select
                  value={form.categoryId}
                  onChange={(event) => setForm({ ...form, categoryId: event.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                >
                  {activeCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-sm text-red-300">Enable at least one category</p>
              )}
              {errors.categoryId && <p className="text-xs text-red-400 mt-1">{errors.categoryId}</p>}
              <button
                type="button"
                onClick={() => setShowCategoryField((prev) => !prev)}
                className="mt-2 flex items-center gap-1 text-xs text-emerald-300"
              >
                <PlusCircle className="w-3 h-3" />
                {showCategoryField ? 'Cancel quick add' : 'Quick add category'}
              </button>
              {showCategoryField && (
                <div className="mt-2 flex gap-2">
                  <input
                    value={newCategoryName}
                    onChange={(event) => setNewCategoryName(event.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                    placeholder="Category name"
                  />
                  <Button onClick={handleCreateCategory} variant="primary" type="button">
                    Save
                  </Button>
                </div>
              )}
            </div>
          </div>

          <InputField
            label="Notes"
            name="notes"
            value={form.notes}
            onChange={(event) => setForm({ ...form, notes: event.target.value })}
            placeholder="Optional details"
          />

          <Button type="submit" variant="primary" fullWidth>
            Save expense
          </Button>
          {feedback && (
            <p className={`text-sm ${feedback.ok ? 'text-emerald-300' : 'text-red-400'}`}>
              {feedback.message}
            </p>
          )}
        </form>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Recent expenses</h3>
              <p className="text-sm text-slate-400">Latest entries sync automatically</p>
            </div>
            <span className="text-xs text-slate-500">last {recentExpenses.length} items</span>
          </div>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
            {recentExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between bg-slate-800/60 rounded-xl px-4 py-3"
              >
                <div>
                  <p className="font-medium">{expense.title}</p>
                  <p className="text-xs text-slate-400">
                    {expense.categoryName || categories.find((cat) => cat.id === expense.categoryId)?.name || '—'} · {expense.date}
                  </p>
                </div>
                <p className="font-semibold text-rose-300">{currencyFormatter.format(expense.amount)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseEntry;
