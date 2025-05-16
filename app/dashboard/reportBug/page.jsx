"use client";

import React, { useState } from "react";

function ReportBug() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send form data via mailto (or use backend if needed)
    const mailtoLink = `mailto:bhargavsarma173@gmail.com?subject=Bug Report from ${form.name}&body=Name: ${form.name}%0AEmail: ${form.email}%0A%0A${form.message}`;
    window.location.href = mailtoLink;

    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h3 className="text-3xl font-bold text-primary mb-6 text-center">Report a Bug</h3>

      {submitted ? (
        <p className="text-green-600 text-center text-lg font-semibold">Thank you! Your report has been prepared for sending.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
          />
          <textarea
            name="message"
            placeholder="Describe the bug..."
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
          ></textarea>
          <button
            type="submit"
            className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary/80 transition"
          >
            Submit Bug Report
          </button>
        </form>
      )}
    </div>
  );
}

export default ReportBug;
