"use client";

import React, { useState, useEffect } from "react";
import { Button, Typography, Flex } from "@/components/ui";
import { useStripes } from "@/hooks";
import { Loader2, Plus, Trash2, CheckCircle2, Columns } from "lucide-react";

export function StripeManager() {
  const { stripes, loading, saving, error, updateStripe } = useStripes();

  // Header stripe form states
  const [headerText, setHeaderText] = useState("");
  const [headerActive, setHeaderActive] = useState(true);

  // Marquee stripe form states
  const [marqueeItems, setMarqueeItems] = useState<string[]>([]);
  const [marqueeActive, setMarqueeActive] = useState(true);

  // Success messages state
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Populate local states when stripes load
  useEffect(() => {
    const headerStripe = stripes.find((s) => s.key === "header");
    if (headerStripe) {
      setHeaderText(headerStripe.content[0] || "");
      setHeaderActive(headerStripe.isActive);
    }

    const marqueeStripe = stripes.find((s) => s.key === "marquee");
    if (marqueeStripe) {
      setMarqueeItems(marqueeStripe.content);
      setMarqueeActive(marqueeStripe.isActive);
    }
  }, [stripes]);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  };

  const handleSaveHeader = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await updateStripe({
      key: "header",
      content: [headerText.trim()],
      isActive: headerActive,
    });
    if (result) {
      showSuccess("Header announcement stripe updated successfully!");
    }
  };

  const handleSaveMarquee = async (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out empty items
    const cleaned = marqueeItems.map((item) => item.trim()).filter(Boolean);
    const result = await updateStripe({
      key: "marquee",
      content: cleaned,
      isActive: marqueeActive,
    });
    if (result) {
      showSuccess("Scrolling marquee stripe updated successfully!");
    }
  };

  const handleAddMarqueeItem = () => {
    setMarqueeItems((prev) => [...prev, ""]);
  };

  const handleMarqueeItemChange = (index: number, val: string) => {
    setMarqueeItems((prev) => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const handleRemoveMarqueeItem = (index: number) => {
    setMarqueeItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8 text-sm">
      <Flex justify="between" align="center" className="flex-wrap gap-4">
        <Typography variant="p" className="text-neutral-500">
          Customize the promo stripes shown on your storefront.
        </Typography>
      </Flex>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl">
          {error}
        </div>
      )}

      {successMessage && (
        <Flex align="center" gap={2} className="p-4 bg-green-50 border border-green-100 text-green-700 rounded-2xl transition-all duration-300">
          <CheckCircle2 size={18} />
          <span>{successMessage}</span>
        </Flex>
      )}

      {loading ? (
        <div className="flex flex-col gap-6 animate-pulse">
          <div className="h-40 bg-neutral-200 rounded-3xl" />
          <div className="h-60 bg-neutral-200 rounded-3xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Header Announcement Stripe */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
            <form onSubmit={handleSaveHeader} className="space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <Typography variant="h3" className="text-lg! font-bold text-neutral-800 flex items-center gap-2">
                  <Columns size={18} className="text-primary" />
                  Header Announcement Stripe
                </Typography>
                <div className="w-full h-px bg-neutral-100" />

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    Announcement Text
                  </label>
                  <input
                    type="text"
                    value={headerText}
                    onChange={(e) => setHeaderText(e.target.value)}
                    placeholder="e.g. FREE SHIPPING ON PREPAID ORDERS"
                    className="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-primary text-sm text-neutral-800 bg-white placeholder:text-neutral-400"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="headerActive"
                    checked={headerActive}
                    onChange={(e) => setHeaderActive(e.target.checked)}
                    className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary cursor-pointer"
                  />
                  <label htmlFor="headerActive" className="text-sm font-semibold text-neutral-700 cursor-pointer select-none">
                    Show on Storefront
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-100 mt-6">
                <Button type="submit" disabled={saving} className="rounded-2xl flex items-center gap-2 w-full justify-center">
                  {saving && <Loader2 className="animate-spin" size={16} />}
                  Save Header Announcement
                </Button>
              </div>
            </form>
          </div>

          {/* Card 2: Scrolling Marquee Stripe */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
            <form onSubmit={handleSaveMarquee} className="space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <Flex justify="between" align="center">
                  <Typography variant="h3" className="text-lg! font-bold text-neutral-800 flex items-center gap-2">
                    <Columns size={18} className="rotate-90 text-primary" />
                    Scrolling Marquee Stripe
                  </Typography>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddMarqueeItem}
                    className="flex items-center gap-1 text-[11px] font-bold py-1.5 px-3 rounded-xl"
                  >
                    <Plus size={14} /> Add Item
                  </Button>
                </Flex>
                <div className="w-full h-px bg-neutral-100" />

                <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
                  {marqueeItems.length === 0 ? (
                    <div className="text-center py-6 text-neutral-400">
                      No items configured. Click 'Add Item' to create scrolling texts.
                    </div>
                  ) : (
                    marqueeItems.map((item, idx) => (
                      <Flex key={idx} align="center" gap={3}>
                        <span className="text-xs font-bold text-neutral-400 w-5">{idx + 1}.</span>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleMarqueeItemChange(idx, e.target.value)}
                          placeholder={`Scrolling message ${idx + 1}`}
                          className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-primary text-sm text-neutral-800 bg-white placeholder:text-neutral-400"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveMarqueeItem(idx)}
                          className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </Flex>
                    ))
                  )}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="marqueeActive"
                    checked={marqueeActive}
                    onChange={(e) => setMarqueeActive(e.target.checked)}
                    className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary cursor-pointer"
                  />
                  <label htmlFor="marqueeActive" className="text-sm font-semibold text-neutral-700 cursor-pointer select-none">
                    Show on Storefront
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-100 mt-6">
                <Button type="submit" disabled={saving} className="rounded-2xl flex items-center gap-2 w-full justify-center">
                  {saving && <Loader2 className="animate-spin" size={16} />}
                  Save Marquee Stripe
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
