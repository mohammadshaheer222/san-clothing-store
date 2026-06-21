"use client";

import React, { useState, useRef } from "react";
import { Button, Typography, Flex } from "@/components/ui";
import { useFaqs } from "@/hooks";
import { FAQItem } from "@/types";
import { Plus, Trash2, Edit3, HelpCircle, Loader2 } from "lucide-react";

export function FaqManager() {
  const { faqs, loading, saving, error, createFaq, updateFaq, deleteFaq } = useFaqs({ admin: true });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);

  // Form states
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [order, setOrder] = useState<number>(0);
  const [isActive, setIsActive] = useState(true);
  const [formError, setFormError] = useState("");

  const questionRef = useRef<HTMLTextAreaElement>(null);
  const answerRef = useRef<HTMLTextAreaElement>(null);

  const openAddModal = () => {
    setEditingFaq(null);
    setQuestion("");
    setAnswer("");
    setOrder(faqs.length);
    setIsActive(true);
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (faq: FAQItem) => {
    setEditingFaq(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setOrder(faq.order);
    setIsActive(faq.isActive);
    setFormError("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      setFormError("Question is required.");
      setTimeout(() => {
        questionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        questionRef.current?.focus();
      }, 50);
      return;
    }
    if (!answer.trim()) {
      setFormError("Answer is required.");
      setTimeout(() => {
        answerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        answerRef.current?.focus();
      }, 50);
      return;
    }

    setFormError("");

    const payload = {
      question: question.trim(),
      answer: answer.trim(),
      order: Number(order),
      isActive,
    };

    let result;
    if (editingFaq) {
      result = await updateFaq(editingFaq.id, payload);
    } else {
      result = await createFaq(payload);
    }

    if (result) {
      setIsModalOpen(false);
    }
  };

  const handleToggleActive = async (faq: FAQItem) => {
    await updateFaq(faq.id, { isActive: !faq.isActive });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      await deleteFaq(id);
    }
  };

  return (
    <div className="space-y-6 text-sm">
      <Flex justify="between" align="center" className="flex-wrap gap-4">
        <Typography variant="p" className="text-neutral-500">
          Manage frequently asked questions that appear on your storefront landing page.
        </Typography>
        <Button onClick={openAddModal} className="flex items-center gap-2 uppercase tracking-wider text-[11px] font-bold">
          <Plus size={16} /> Add FAQ
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
      ) : faqs.length === 0 ? (
        <div className="border-2 border-dashed border-neutral-200 rounded-3xl p-16 text-center max-w-md mx-auto">
          <HelpCircle className="mx-auto text-neutral-300 mb-4" size={48} />
          <Typography variant="h3" className="text-neutral-800 font-bold mb-1">No FAQs Configured</Typography>
          <Typography variant="p" className="text-neutral-500 text-xs mb-6">
            Add your first FAQ item so your store visitors can read common questions.
          </Typography>
          <Button onClick={openAddModal} variant="outline" size="sm">
            Create FAQ
          </Button>
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-semibold text-xs tracking-wider uppercase">
                  <th className="py-4 px-6 w-16 text-center">Order</th>
                  <th className="py-4 px-6 w-1/3">Question</th>
                  <th className="py-4 px-6">Answer</th>
                  <th className="py-4 px-6 w-28 text-center">Status</th>
                  <th className="py-4 px-6 w-28 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-700">
                {faqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="py-4 px-6 text-center font-medium text-neutral-400">{faq.order}</td>
                    <td className="py-4 px-6 font-semibold text-neutral-800">{faq.question}</td>
                    <td className="py-4 px-6 text-neutral-500 max-w-xs truncate">{faq.answer}</td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleToggleActive(faq)}
                        disabled={saving}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                          faq.isActive
                            ? "bg-green-50 text-green-700 hover:bg-green-100"
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                        }`}
                      >
                        {faq.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="py-4 px-6">
                      <Flex gap={2} justify="center">
                        <button
                          onClick={() => openEditModal(faq)}
                          className="p-2 text-neutral-400 hover:text-primary hover:bg-neutral-100 rounded-xl transition-colors"
                          title="Edit"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(faq.id)}
                          className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </Flex>
                    </td>
                  </tr>
                ))}
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
              {editingFaq ? "Edit FAQ Item" : "Add FAQ Item"}
            </Typography>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs mb-4">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Question <span className="text-red-500 ml-0.5">*</span>
                </label>
                <textarea
                  ref={questionRef}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Enter the question..."
                  rows={2}
                  className="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-primary text-sm text-neutral-800 bg-white placeholder:text-neutral-400 resize-none animate-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Answer <span className="text-red-500 ml-0.5">*</span>
                </label>
                <textarea
                  ref={answerRef}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter the answer..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-primary text-sm text-neutral-800 bg-white placeholder:text-neutral-400 resize-none animate-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">Display Order</label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-primary text-sm text-neutral-800 bg-white"
                  />
                </div>

                <div className="flex items-center gap-3 pt-6 pl-2">
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
                  {editingFaq ? "Save Changes" : "Add FAQ"}
                </Button>
              </Flex>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
