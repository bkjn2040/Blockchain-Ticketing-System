// components/TicketForm.tsx
import { useState } from 'react';
import { Ticket } from './types';

export default function TicketForm({ onSubmit }: { onSubmit: (ticket: Ticket) => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: Date.now().toString(),
      title,
      description,
      status: 'Open',
      createdBy: localStorage.getItem('userDID')!,
      createdAt: new Date().toISOString()
    });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Submit Ticket</button>
    </form>
  );
}