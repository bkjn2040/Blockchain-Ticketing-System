import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
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
      createdAt: new Date().toISOString(),
    });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Submit Ticket
      </Button>
    </form>
  );
}