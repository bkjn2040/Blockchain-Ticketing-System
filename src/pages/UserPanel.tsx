// pages/UserPanel.tsx
import { useState, useEffect } from 'react';
import TicketForm from '../components/TicketForm';
import TicketList from '../components/TicketList';
import { Ticket } from '../components/types';

export default function UserPanel() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const userDID = localStorage.getItem('userDID');

  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    setTickets(savedTickets.filter((t: Ticket) => t.createdBy === userDID));
  }, []);

  const handleSubmit = (ticket: Ticket) => {
    const newTickets = [...tickets, ticket];
    setTickets(newTickets);
    localStorage.setItem('tickets', JSON.stringify(newTickets));
  };

  return (
    <div className="panel">
      <h2>User Panel</h2>
      <TicketForm onSubmit={handleSubmit} />
      <TicketList 
        tickets={tickets}
        onDelete={(id: string) => setTickets(tickets.filter(t => t.id !== id))}
      />
    </div>
  );
}