import React, { useEffect, useMemo, useState } from 'react';
import { Edit3 } from 'lucide-react';
import InputField from '../Shared/InputField';
import Button from '../Shared/Button';

const defaultIconChoices = ['🍽️', '🏠', '🚗', '🎬', '💊', '🎁'];

function CategoryManager({
  categories = [],
  usageMap = {},
  onSaveCategory,
  onDeleteCategory,
  onToggleCategory,
  onEditCategory,
  editingCategoryId,
  onCancelEdit
}) {
  const editingCategory = useMemo(
    () => categories.find((category) => category.id === editingCategoryId),
    [categories, editingCategoryId]
  );

  const [form, setForm] = useState({ name: '', color: '#62d5ba', icon: defaultIconChoices[0] });
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (editingCategory) {
      setForm({ name: editingCategory.name, color: editingCategory.color, icon: editingCategory.icon });
    } else {
      setForm({ name: '', color: '#62d5ba', icon: defaultIconChoices[0] });
    }
  }, [editingCategory]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = onSaveCategory?.({ id: editingCategory?.id, ...form });
    setFeedback(result);
    if (result?.ok && !editingCategory) {
      setForm({ name: '', color: '#62d5ba', icon: defaultIconChoices[0] });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm text-slate-400">Categories</p>
          <h2 className="text-2xl font-semibold">Manage spending labels</h2>
        </div>
        {editingCategory && (
          <button className="text-sm text-slate-400" onClick={onCancelEdit}>Cancel edit</button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Edit3 className="w-4 h-4" />
            {editingCategory ? 'Edit category' : 'Add new category'}
          </h3>
          <InputField
            label="Name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Travel, Utilities, ..."
            required
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Color</label>
              <input
                type="color"
                value={form.color}
                onChange={(event) => setForm({ ...form, color: event.target.value })}
                className="w-full h-10 rounded-lg border border-slate-700 bg-slate-800"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Icon</label>
              <select
                value={form.icon}
                onChange={(event) => setForm({ ...form, icon: event.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
              >
                {defaultIconChoices.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button type="submit" variant="primary" fullWidth>
            {editingCategory ? 'Save changes' : 'Add category'}
          </Button>
          {feedback && (
            <p className={`text-sm ${feedback.ok ? 'text-emerald-300' : 'text-red-400'}`}>
              {feedback.message}
            </p>
          )}
        </form>

        <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2">
          {categories.map((category) => {
            const usage = usageMap[category.id] || 0;
            return (
              <div
                key={category.id}
                className="flex items-center justify-between bg-slate-900/40 border border-slate-800 rounded-2xl px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" role="img" aria-label={`${category.name} icon`}>
                    {category.icon}
                  </span>
                  <div>
                    <p className="font-medium" style={{ color: category.color }}>
                      {category.name}
                    </p>
                    <p className="text-xs text-slate-400">{usage} linked expense(s)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => onToggleCategory?.(category.id)}
                    className={`text-xs ${category.enabled ? 'border-emerald-500/40 text-emerald-300' : 'border-slate-600 text-slate-300'}`}
                  >
                    {category.enabled ? 'Disable' : 'Enable'}
                  </Button>
                  <Button variant="secondary" onClick={() => onEditCategory?.(category.id)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    disabled={usage > 0}
                    onClick={() => onDeleteCategory?.(category.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CategoryManager;
