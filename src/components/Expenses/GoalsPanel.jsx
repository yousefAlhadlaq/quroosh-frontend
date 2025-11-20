import React, { useState } from 'react';
import Button from '../Shared/Button';

const currencyFormatter = new Intl.NumberFormat('en-SA', {
  style: 'currency',
  currency: 'SAR',
  maximumFractionDigits: 0
});

function GoalsPanel({ goals = [], onDeleteGoal, onDeposit, compact = false }) {
  const [contributionValues, setContributionValues] = useState({});
  const [feedback, setFeedback] = useState(null);

  const visibleGoals = compact ? goals.slice(0, 3) : goals;

  const handleDeposit = (goalId) => {
    const amount = contributionValues[goalId];
    const result = onDeposit?.(goalId, amount, 'Manual contribution');
    setFeedback(result);
    if (result?.ok) {
      setContributionValues((prev) => ({ ...prev, [goalId]: '' }));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Savings goals</h3>
        {compact && <span className="text-xs text-slate-500">Showing {visibleGoals.length} goals</span>}
      </div>
      {visibleGoals.length === 0 && <p className="text-sm text-slate-400">No goals added yet.</p>}
      <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
        {visibleGoals.map((goal) => {
          const progress = goal.targetAmount ? Math.min((goal.savedAmount / goal.targetAmount) * 100, 100) : 0;
          const remaining = Math.max(goal.targetAmount - goal.savedAmount, 0);
          return (
            <div key={goal.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{goal.name}</p>
                  <p className="text-xs text-slate-400">Target {currencyFormatter.format(goal.targetAmount)}</p>
                </div>
                {!compact && (
                  <button className="text-xs text-red-300" onClick={() => onDeleteGoal?.(goal.id)}>
                    Delete
                  </button>
                )}
              </div>
              <div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className={`h-2 rounded-full ${progress >= 100 ? 'bg-emerald-400' : 'bg-sky-400'}`} style={{ width: `${progress}%` }}></div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
                  <span>Saved {currencyFormatter.format(goal.savedAmount)}</span>
                  <span>Remaining {currencyFormatter.format(remaining)}</span>
                </div>
              </div>
              {!compact && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={contributionValues[goal.id] || ''}
                    onChange={(event) =>
                      setContributionValues((prev) => ({ ...prev, [goal.id]: event.target.value }))
                    }
                    placeholder="Deposit amount"
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm"
                  />
                  <Button type="button" variant="primary" onClick={() => handleDeposit(goal.id)}>
                    Deposit
                  </Button>
                </div>
              )}
              {goal.deadline && <p className="text-xs text-slate-500">Target date: {goal.deadline}</p>}
            </div>
          );
        })}
      </div>
      {feedback && (
        <p className={`text-xs ${feedback.ok ? 'text-emerald-300' : 'text-red-400'}`}>{feedback.message}</p>
      )}
    </div>
  );
}

export default GoalsPanel;
