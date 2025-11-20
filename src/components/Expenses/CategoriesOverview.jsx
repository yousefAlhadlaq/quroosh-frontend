import React from 'react';
import { AlertTriangle, CheckCircle, PauseCircle } from 'lucide-react';

const statusTokens = {
  'no-budget': {
    label: 'No budget',
    classes: 'bg-slate-800 text-slate-300'
  },
  tracked: {
    label: 'Tracked',
    classes: 'bg-emerald-500/10 text-emerald-200'
  },
  warning: {
    label: 'At risk',
    classes: 'bg-amber-500/20 text-amber-100'
  },
  over: {
    label: 'Over limit',
    classes: 'bg-red-500/20 text-red-100'
  },
  disabled: {
    label: 'Disabled',
    classes: 'bg-slate-700/40 text-slate-300'
  }
};

const currencyFormatter = new Intl.NumberFormat('en-SA', {
  style: 'currency',
  currency: 'SAR',
  maximumFractionDigits: 0
});

function CategoriesOverview({ summaries = [], onEditCategory, onToggleCategory }) {
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4">
      <div>
        <p className="text-sm text-slate-400">Categories</p>
        <h2 className="text-xl font-semibold">Status by category</h2>
      </div>
      <div className="space-y-3 max-h-[360px] overflow-y-auto pr-2">
        {summaries.map((summary) => {
          const token = statusTokens[summary.status] ?? statusTokens['no-budget'];
          const Icon = summary.status === 'over' ? AlertTriangle : summary.status === 'disabled' ? PauseCircle : CheckCircle;
          return (
            <div
              key={summary.id}
              className="flex flex-col gap-3 bg-slate-900/50 border border-slate-800 rounded-2xl p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl" role="img" aria-label={`${summary.name} icon`}>
                    {summary.icon}
                  </span>
                  <div>
                    <p className="font-semibold" style={{ color: summary.color }}>
                      {summary.name}
                    </p>
                    <p className="text-xs text-slate-400">{summary.transactions} transactions</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full ${token.classes}`}>
                  <Icon className="w-3 h-3" />
                  <span>{token.label}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-slate-400">Spent</p>
                  <p className="text-lg font-semibold">{currencyFormatter.format(summary.total)}</p>
                </div>
                {summary.budget ? (
                  <div className="flex flex-col items-end">
                    <p className="text-slate-400 text-xs">Budget {currencyFormatter.format(summary.budget.limit)}</p>
                    <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden mt-1">
                      <div
                        className={`${summary.budget.status === 'over' ? 'bg-red-400' : summary.budget.status === 'warning' ? 'bg-amber-400' : 'bg-emerald-400'} h-2`}
                        style={{ width: `${Math.min(summary.budget.percent, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">No budget set</p>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs">
                <button className="text-emerald-300" onClick={() => onEditCategory?.(summary.id)}>
                  Edit
                </button>
                <button className="text-slate-300" onClick={() => onToggleCategory?.(summary.id)}>
                  {summary.status === 'disabled' ? 'Enable' : 'Disable'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoriesOverview;
