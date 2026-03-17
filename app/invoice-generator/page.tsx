"use client";

import { useState, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";

interface Item {
  id: number;
  description: string;
  quantity: number;
  price: number;
}

export default function InvoiceGeneratorPage() {
  const [from, setFrom] = useState({ name: "", email: "", address: "" });
  const [to, setTo] = useState({ name: "", email: "", address: "" });
  const [invoiceNumber, setInvoiceNumber] = useState("INV-001");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState("");
  const [items, setItems] = useState<Item[]>([
    { id: 1, description: "", quantity: 1, price: 0 },
  ]);
  const [taxRate, setTaxRate] = useState(0);
  const [notes, setNotes] = useState("");
  const [currency, setCurrency] = useState("$");
  const printRef = useRef<HTMLDivElement>(null);

  const addItem = () =>
    setItems([
      ...items,
      { id: Date.now(), description: "", quantity: 1, price: 0 },
    ]);

  const removeItem = (id: number) =>
    setItems(items.filter((i) => i.id !== id));

  const updateItem = (id: number, field: keyof Item, value: string | number) =>
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.price, 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  const printInvoice = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Invoice ${invoiceNumber}</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #333; }
        .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
        .header h1 { font-size: 32px; color: #1a1a1a; }
        .info { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px; }
        .info-block h3 { color: #666; font-size: 12px; text-transform: uppercase; margin-bottom: 8px; }
        .info-block p { margin: 2px 0; font-size: 14px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th { background: #f5f5f5; text-align: left; padding: 10px; font-size: 12px; text-transform: uppercase; color: #666; }
        td { padding: 10px; border-bottom: 1px solid #eee; font-size: 14px; }
        .totals { text-align: right; margin-top: 20px; }
        .totals .row { display: flex; justify-content: flex-end; gap: 40px; padding: 4px 0; font-size: 14px; }
        .totals .total { font-size: 20px; font-weight: bold; border-top: 2px solid #333; padding-top: 8px; margin-top: 8px; }
        .notes { margin-top: 40px; padding: 15px; background: #f9f9f9; border-radius: 5px; font-size: 13px; color: #666; }
        @media print { body { padding: 0; } }
      </style></head><body>
        <div class="header">
          <h1>INVOICE</h1>
          <div style="text-align:right">
            <p><strong>${invoiceNumber}</strong></p>
            <p>Date: ${date}</p>
            ${dueDate ? `<p>Due: ${dueDate}</p>` : ""}
          </div>
        </div>
        <div class="info">
          <div class="info-block">
            <h3>From</h3>
            <p><strong>${from.name}</strong></p>
            <p>${from.email}</p>
            <p>${from.address.replace(/\n/g, "<br>")}</p>
          </div>
          <div class="info-block">
            <h3>Bill To</h3>
            <p><strong>${to.name}</strong></p>
            <p>${to.email}</p>
            <p>${to.address.replace(/\n/g, "<br>")}</p>
          </div>
        </div>
        <table>
          <thead><tr><th>Description</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
          <tbody>
            ${items.map((i) => `<tr><td>${i.description}</td><td>${i.quantity}</td><td>${currency}${i.price.toFixed(2)}</td><td>${currency}${(i.quantity * i.price).toFixed(2)}</td></tr>`).join("")}
          </tbody>
        </table>
        <div class="totals">
          <div class="row"><span>Subtotal:</span><span>${currency}${subtotal.toFixed(2)}</span></div>
          ${taxRate > 0 ? `<div class="row"><span>Tax (${taxRate}%):</span><span>${currency}${tax.toFixed(2)}</span></div>` : ""}
          <div class="row total"><span>Total:</span><span>${currency}${total.toFixed(2)}</span></div>
        </div>
        ${notes ? `<div class="notes"><strong>Notes:</strong><br>${notes}</div>` : ""}
      </body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <ToolLayout
      title="Free Invoice Generator"
      description="Create professional invoices for free. Download as PDF instantly. No signup needed."
    >
      <div className="space-y-6">
        {/* Invoice Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Invoice #</label>
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="w-full p-2 border border-white/10 rounded-lg text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-white/10 rounded-lg text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2 border border-white/10 rounded-lg text-gray-100"
            />
          </div>
        </div>

        {/* From / To */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-medium text-gray-100">From</h3>
            <input
              type="text"
              placeholder="Your name / company"
              value={from.name}
              onChange={(e) => setFrom({ ...from, name: e.target.value })}
              className="w-full p-2 border border-white/10 rounded-lg text-gray-100"
            />
            <input
              type="email"
              placeholder="Your email"
              value={from.email}
              onChange={(e) => setFrom({ ...from, email: e.target.value })}
              className="w-full p-2 border border-white/10 rounded-lg text-gray-100"
            />
            <textarea
              placeholder="Your address"
              value={from.address}
              onChange={(e) => setFrom({ ...from, address: e.target.value })}
              rows={2}
              className="w-full p-2 border border-white/10 rounded-lg resize-none text-gray-100"
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-gray-100">Bill To</h3>
            <input
              type="text"
              placeholder="Client name / company"
              value={to.name}
              onChange={(e) => setTo({ ...to, name: e.target.value })}
              className="w-full p-2 border border-white/10 rounded-lg text-gray-100"
            />
            <input
              type="email"
              placeholder="Client email"
              value={to.email}
              onChange={(e) => setTo({ ...to, email: e.target.value })}
              className="w-full p-2 border border-white/10 rounded-lg text-gray-100"
            />
            <textarea
              placeholder="Client address"
              value={to.address}
              onChange={(e) => setTo({ ...to, address: e.target.value })}
              rows={2}
              className="w-full p-2 border border-white/10 rounded-lg resize-none text-gray-100"
            />
          </div>
        </div>

        {/* Items */}
        <div>
          <h3 className="font-medium text-gray-100 mb-2">Items</h3>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex gap-2 items-start">
                <input
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) =>
                    updateItem(item.id, "description", e.target.value)
                  }
                  className="flex-1 p-2 border border-white/10 rounded-lg text-gray-100"
                />
                <input
                  type="number"
                  placeholder="Qty"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(item.id, "quantity", Number(e.target.value))
                  }
                  className="w-20 p-2 border border-white/10 rounded-lg text-gray-100"
                />
                <input
                  type="number"
                  placeholder="Price"
                  min={0}
                  step={0.01}
                  value={item.price || ""}
                  onChange={(e) =>
                    updateItem(item.id, "price", Number(e.target.value))
                  }
                  className="w-28 p-2 border border-white/10 rounded-lg text-gray-100"
                />
                <span className="p-2 text-sm text-gray-500 w-24 text-right">
                  {currency}{(item.quantity * item.price).toFixed(2)}
                </span>
                {items.length > 1 && (
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-500 hover:text-red-400"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={addItem}
            className="mt-2 text-sm text-indigo-400 hover:text-indigo-300"
          >
            + Add Item
          </button>
        </div>

        {/* Tax & Currency */}
        <div className="flex gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Tax %</label>
            <input
              type="number"
              min={0}
              max={100}
              value={taxRate || ""}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="w-24 p-2 border border-white/10 rounded-lg text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="p-2 border border-white/10 rounded-lg text-gray-100"
            >
              <option value="$">$ USD</option>
              <option value="€">€ EUR</option>
              <option value="£">£ GBP</option>
              <option value="¥">¥ JPY</option>
              <option value="CA$">CA$ CAD</option>
            </select>
          </div>
        </div>

        {/* Totals */}
        <div className="bg-white/5 rounded-lg p-4 text-right space-y-1">
          <div className="text-sm text-gray-400">
            Subtotal: {currency}{subtotal.toFixed(2)}
          </div>
          {taxRate > 0 && (
            <div className="text-sm text-gray-400">
              Tax ({taxRate}%): {currency}{tax.toFixed(2)}
            </div>
          )}
          <div className="text-xl font-bold text-gray-100">
            Total: {currency}{total.toFixed(2)}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Payment terms, bank details, thank you note..."
            rows={3}
            className="w-full p-2 border border-white/10 rounded-lg resize-none text-gray-100"
          />
        </div>

        <button
          onClick={printInvoice}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-500 transition-colors"
        >
          Download / Print Invoice (PDF)
        </button>
      </div>
      <div ref={printRef} />
    </ToolLayout>
  );
}
