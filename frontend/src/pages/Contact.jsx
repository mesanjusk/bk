import { useState } from 'react';
import Section from '../components/ui/Section.jsx';
import Button from '../components/ui/Button.jsx';
import { submitContactMessage } from '../api/client.js';
import { contactInfo } from '../data/siteContent.js';

const initialForm = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      await submitContactMessage(form);
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  }

  return (
    <Section>
      <h1 className="text-center text-4xl font-semibold text-sage-900">Get Involved</h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-sage-600">
        Have a question, want to volunteer, or interested in supporting a scholar? Send us a message.
      </p>

      <div className="mx-auto mt-12 grid max-w-4xl gap-10 sm:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-5 rounded-xl2 bg-white p-8 shadow-soft">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-sage-700">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-sage-200 px-4 py-2 text-sm focus:border-sage-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-sage-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-sage-200 px-4 py-2 text-sm focus:border-sage-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium text-sage-700">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              value={form.message}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-sage-200 px-4 py-2 text-sm focus:border-sage-500 focus:outline-none"
            />
          </div>

          <Button type="submit" className="w-full" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Send Message'}
          </Button>

          {status === 'success' && (
            <p className="text-sm text-sage-600">Thank you — we'll be in touch soon.</p>
          )}
          {status === 'error' && <p className="text-sm text-red-600">{error}</p>}
        </form>

        <div className="rounded-xl2 bg-sand p-8">
          <h3 className="text-lg font-semibold text-sage-800">Contact Info</h3>
          <ul className="mt-4 space-y-3 text-sm text-sage-600">
            <li>{contactInfo.email}</li>
            <li>{contactInfo.phone}</li>
            <li>{contactInfo.address}</li>
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-sage-600">
            Prefer to volunteer your time or skills instead? Mention it in your message and we'll
            reach out with current opportunities.
          </p>
        </div>
      </div>
    </Section>
  );
}
