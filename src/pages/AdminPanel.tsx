import { useState, useEffect } from 'react';
import { verifyDID } from '../hedera/auth';
import TicketList from '../components/TicketList';
import { Card, CardHeader, CardTitle } from '../components/ui/card';
import { Ticket } from '../components/types';

export default function AdminPanel() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const did = localStorage.getItem('userDID');
    if (!did || !verifyDID(did)) {
      alert('请先登录管理员账号');
      window.location.href = '/';
    }

    const savedTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    setTickets(savedTickets);
  }, []);

  const updateTicketStatus = (id: string, status: string) => {
    const updated = tickets.map((t) => (t.id === id ? { ...t, status } : t));
    setTickets(updated);
    localStorage.setItem('tickets', JSON.stringify(updated));
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Management Panel</CardTitle>
        </CardHeader>
        <TicketList tickets={tickets} onStatusChange={updateTicketStatus} isAdmin={true} />
      </Card>
    </div>
  );
}