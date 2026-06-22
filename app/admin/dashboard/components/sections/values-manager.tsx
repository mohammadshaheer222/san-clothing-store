"use client";

import React, { useState, useRef } from "react";
import { Button, Typography, Flex } from "@/components/ui";
import { useValues } from "@/hooks";
import { ValueItem } from "@/types";
import { Plus, Trash2, Edit3, Heart, Loader2 } from "lucide-react";
import * as LucideIcons from "lucide-react";

const POPULAR_ICONS = [
  "Compass",
  "ShieldCheck",
  "Gem",
  "Heart",
  "Award",
  "Star",
  "Leaf",
  "Zap",
  "Globe",
  "Package",
  "Smile",
  "Sparkles",
  "Eye",
  "Fingerprint"
];

export function ValuesManager() {
  const { values, loading, saving, error, createValue, updateValue, deleteValue } = useValues({ admin: true });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingValue, setEditingValue] = useState<ValueItem | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [iconName, setIconName] = useState("Compass");
  const [order, setOrder] = useState<number>(0);
  const [isActive, setIsActive] = useState(true);
  const [formError, setFormError] = useState("");

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const openAddModal = () => {
    setEditingValue(null);
    setTitle("");
    setDescription("");
    setIconName("Compass");
    setOrder(values.length);
    setIsActive(true);
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (val: ValueItem) => {
    setEditingValue(val);
    setTitle(val.title);
    setDescription(val.description);
    setIconName(val.iconName);
    setOrder(val.order);
    setIsActive(val.isActive);
    setFormError("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError("Title is required.");
      setTimeout(() => {
        titleRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        titleRef.current?.focus();
      }, 50);
      return;
    }
    if (!description.trim()) {
      setFormError("Description is required.");
      setTimeout(() => {
        descriptionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        descriptionRef.current?.focus();
      }, 50);
      return;
    }

    setFormError("");

    const payload = {
      title: title.trim(),
      description: description.trim(),
      iconName,
      order: Number(order),
      isActive,
    };

    let result;
    if (editingValue) {
      result = await updateValue(editingValue.id, payload);
    } else {
      result = await createValue(payload);
    }

    if (result) {
      setIsModalOpen(false);
    }
  };

  const handleToggleActive = async (val: ValueItem) => {
    await updateValue(val.id, { isActive: !val.isActive });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this brand value item?")) {
      await deleteValue(id);
    }
  };

  return (
    <div className="space-y-6 text-sm">
      <Flex justify="between" align="center" className="flex-wrap gap-4">
        <Typography variant="p" className="text-neutral-500">
          Manage the brand value items that appear in the &ldquo;Standard/Philosophy&rdquo; section of your storefront.
        </Typography>
        <Button onClick={openAddModal} className="flex items-center gap-2 uppercase tracking-wider text-[11px] font-bold">
          <Plus size={16} /> Add Value Item
        </Button>
      </Flex>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col gap-4 animate-pulse">
          <div className="h-12 bg-neutral-200 rounded-xl" />
          <div className="h-12 bg-neutral-200 rounded-xl" />
          <div className="h-12 bg-neutral-200 rounded-xl" />
        </div>
      ) : values.length === 0 ? (
        <div className="border-2 border-dashed border-neutral-200 rounded-3xl p-16 text-center max-w-md mx-auto">
          <Heart className="mx-auto text-neutral-300 mb-4" size={48} />
          <Typography variant="h3" className="text-neutral-800 font-bold mb-1">No Values Configured</Typography>
          <Typography variant="p" className="text-neutral-500 text-xs mb-6">
            Add your first brand value card so storefront visitors understand your standard.
          </Typography>
          <Button onClick={openAddModal} variant="outline" size="sm">
            Create Value Item
          </Button>
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-semibold text-xs tracking-wider uppercase">
                  <th className="py-4 px-6 w-16 text-center">Order</th>
                  <th className="py-4 px-6 w-20 text-center">Icon</th>
                  <th className="py-4 px-6 w-1/3">Title</th>
                  <th className="py-4 px-6">Description</th>
                  <th className="py-4 px-6 w-28 text-center">Status</th>
                  <th className="py-4 px-6 w-28 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-700">
                {values.map((val) => {
                  const IconComp = (LucideIcons as any)[val.iconName] || LucideIcons.HelpCircle;
                  return (
                    <tr key={val.id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="py-4 px-6 text-center font-medium text-neutral-400">{val.order}</td>
                      <td className="py-4 px-6 text-center">
                        <div className="inline-flex p-2 bg-neutral-100 rounded-lg text-neutral-600">
                          <IconComp size={18} />
                        </div>
                      </td>
                      <td className="py-4 px-6 font-semibold text-neutral-800">{val.title}</td>
                      <td className="py-4 px-6 text-neutral-500 max-w-xs truncate">{val.description}</td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleToggleActive(val)}
                          disabled={saving}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                            val.isActive
                              ? "bg-green-50 text-green-700 hover:bg-green-100"
                              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                          }`}
                        >
                          {val.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        <Flex gap={2} justify="center">
                          <button
                            onClick={() => openEditModal(val)}
                            className="p-2 text-neutral-400 hover:text-primary hover:bg-neutral-100 rounded-xl transition-colors"
                            title="Edit"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(val.id)}
                            className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </Flex>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-neutral-100">
            <Typography variant="h3" className="text-lg font-bold text-neutral-800 mb-4">
              {editingValue ? "Edit Brand Value" : "Add Brand Value"}
            </Typography>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs mb-4">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Title <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  ref={titleRef}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Premium Materials"
                  className="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-primary text-sm text-neutral-800 bg-white placeholder:text-neutral-400"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Description <span className="text-red-500 ml-0.5">*</span>
                </label>
                <textarea
                  ref={descriptionRef}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter value description..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-primary text-sm text-neutral-800 bg-white placeholder:text-neutral-400 resize-none animate-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    Icon <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <select
                    value={iconName}
                    onChange={(e) => setIconName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-primary text-sm text-neutral-800 bg-white cursor-pointer"
                  >
                    {POPULAR_ICONS.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">Display Order</label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-primary text-sm text-neutral-800 bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary cursor-pointer"
                />
                <label htmlFor="isActive" className="text-sm font-semibold text-neutral-700 cursor-pointer select-none">
                  Show on Storefront
                </label>
              </div>

              <Flex justify="end" gap={3} className="pt-4 border-t border-neutral-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  disabled={saving}
                  className="rounded-2xl"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} className="rounded-2xl flex items-center gap-2">
                  {saving && <Loader2 className="animate-spin" size={16} />}
                  {editingValue ? "Save Changes" : "Add Value"}
                </Button>
              </Flex>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
