import React, { useEffect, useState } from 'react';
import InputField from '../Shared/InputField';
import Button from '../Shared/Button';

const currencyFormatter = new Intl.NumberFormat('en-SA', {
  style: 'currency',
  currency: 'SAR',
  maximumFractionDigits: 0
});

function BudgetsGoals({ categories = [], budgets = [], onAddBudget, onRemoveBudget }) {
  const [form, setForm] = useState({ categoryId: '', limit: '', period: 'monthly' });
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (!categories.length) return;
    setForm((prev) => ({
      ...prev,
      categoryId: categories.find((category) => category.id === prev.categoryId)?.id || categories[0].id
    }));
  }, [categories]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = onAddBudget?.(form);
    setFeedback(result);
    if (result?.ok) {
      setForm((prev) => ({ ...prev, limit: '', period: 'monthly' }));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Budgets</p>
          <h3 className="text-xl font-semibold">Per-category limits</h3>
        </div>
        <span className="text-xs text-slate-500">{budgets.length} active</span>
      </div>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Category</label>
            <select
              value={form.categoryId}
              onChange={(event) => setForm({ ...form, categoryId: event.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <InputField
            label="Limit"
            type="number"
            name="limit"
            value={form.limit}
            onChange={(event) => setForm({ ...form, limit: event.target.value })}
            min="0"
            step="0.01"
            required
          />
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Period</label>
            <select
              value={form.period}
              onChange={(event) => setForm({ ...form, period: event.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
        <Button type="submit" variant="primary" fullWidth>
          Save budget
        </Button>
        {feedback && (
          <p className={`text-sm ${feedback.ok ? 'text-emerald-300' : 'text-red-400'}`}>{feedback.message}</p>
        )}
      </form>

      <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
        {budgets.length === 0 && <p className="text-sm text-slate-400">No budgets yet.</p>}
        {budgets.map((budget) => (
          <div key={budget.id} className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{budget.categoryName}</p>
                <p className="text-xs text-slate-400">{budget.period} limit</p>
              </div>
              <button className="text-xs text-slate-400" onClick={() => onRemoveBudget?.(budget.id)}>
                Remove
              </button>
            </div>
            <div className="flex items-center justify-between text-sm mt-3">
              <span>{currencyFormatter.format(budget.spent)} spent</span>
              <span>{currencyFormatter.format(budget.limit)} limit</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 mt-2">
              <div
                className={`${budget.status === 'over' ? 'bg-red-400' : budget.status === 'warning' ? 'bg-amber-400' : 'bg-emerald-400'} h-2 rounded-full`}
                style={{ width: `${Math.min(budget.percent, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BudgetsGoals;
