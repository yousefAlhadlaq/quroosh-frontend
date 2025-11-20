import React, { useState } from 'react';
import InputField from '../Shared/InputField';
import Button from '../Shared/Button';

function AddGoalForm({ onAddGoal }) {
  const [form, setForm] = useState({ name: '', targetAmount: '', deadline: '', initialContribution: '' });
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = onAddGoal?.(form);
    setFeedback(result);
    if (result?.ok) {
      setForm({ name: '', targetAmount: '', deadline: '', initialContribution: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h3 className="text-lg font-semibold">New savings goal</h3>
      <InputField
        label="Name"
        value={form.name}
        onChange={(event) => setForm({ ...form, name: event.target.value })}
        placeholder="e.g., Umrah fund"
        required
      />
      <InputField
        label="Target amount"
        type="number"
        value={form.targetAmount}
        onChange={(event) => setForm({ ...form, targetAmount: event.target.value })}
        min="0"
        step="0.01"
        required
      />
      <InputField
        label="Target date"
        type="date"
        value={form.deadline}
        onChange={(event) => setForm({ ...form, deadline: event.target.value })}
      />
      <InputField
        label="Initial deposit (optional)"
        type="number"
        value={form.initialContribution}
        onChange={(event) => setForm({ ...form, initialContribution: event.target.value })}
        min="0"
        step="0.01"
      />
      <Button type="submit" variant="primary" fullWidth>
        Save goal
      </Button>
      {feedback && (
        <p className={`text-sm ${feedback.ok ? 'text-emerald-300' : 'text-red-400'}`}>{feedback.message}</p>
      )}
    </form>
  );
}

export default AddGoalForm;
