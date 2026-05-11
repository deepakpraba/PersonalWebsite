"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send.");
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
      <p className="text-xs tracking-[0.4em] uppercase text-green-500/70 mb-2">// Transmit</p>
      <h1 className="text-3xl sm:text-5xl font-bold mb-2 tracking-tight glow-green text-green-400">Contact</h1>
      <p className="text-zinc-600 text-xs tracking-widest uppercase mb-10">Have a question or want to work together?</p>

      {error && (
        <p className="text-xs text-red-400 tracking-wide mb-4">{error}</p>
      )}

      {submitted ? (
        <div className="bg-[#0a0a1a] border border-green-500/30 text-green-400 rounded p-8 text-center border-glow-green">
          <p className="text-sm font-semibold tracking-widest uppercase mb-1">// Transmission received</p>
          <p className="text-xs text-zinc-500 tracking-wide">I&apos;ll get back to you as soon as possible.</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-[#0a0a1a] rounded border border-green-500/20 p-8 border-glow-green flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-xs font-medium text-green-400/80 tracking-widest uppercase">
              // Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="bg-[#05050f] border border-zinc-700 rounded px-4 py-2 text-sm text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-green-500/60 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs font-medium text-green-400/80 tracking-widest uppercase">
              // Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="bg-[#05050f] border border-zinc-700 rounded px-4 py-2 text-sm text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-green-500/60 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-xs font-medium text-green-400/80 tracking-widest uppercase">
              // Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              className="bg-[#05050f] border border-zinc-700 rounded px-4 py-2 text-sm text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-green-500/60 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="self-start px-6 py-2.5 border border-green-500 text-green-400 text-xs font-medium tracking-widest uppercase rounded hover:bg-green-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Transmitting..." : "Transmit //"}
          </button>
        </form>
      )}
    </div>
  );
}
