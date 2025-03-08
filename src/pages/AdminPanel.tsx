// pages/AdminPanel.tsx
import { useState, useEffect } from 'react';
import { verifyDID } from '../hedera/auth';
import TicketList from '../components/TicketList';
import { Ticket } from '../components/types';

export default function AdminPanel() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    // DID验证
    const did = localStorage.getItem('userDID');
    if (!did || !verifyDID(did)) {
      alert('请先登录管理员账号');
      window.location.href = '/';
    }
    
    // 加载tickets逻辑
    const savedTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    setTickets(savedTickets);
  }, []);

  const updateTicketStatus = (id: string, status: string) => {
    const updated = tickets.map(t => 
      t.id === id ? { ...t, status } : t
    );
    setTickets(updated);
    localStorage.setItem('tickets', JSON.stringify(updated));
  };

  return (
    <div className="panel">
      <h2>Management Panel</h2>
      <TicketList 
        tickets={tickets}
        onStatusChange={updateTicketStatus}
        isAdmin={true}
      />
    </div>
  );
}