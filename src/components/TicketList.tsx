// components/TicketList.tsx
import { Ticket } from './types';

export default function TicketList({ tickets, onDelete, onStatusChange, isAdmin }: any) {
  return (
    <div className="ticket-list">
      {tickets.map((ticket: Ticket) => (
        <div key={ticket.id} className={`ticket ${ticket.status.toLowerCase()}`}>
          <h3>{ticket.title}</h3>
          <p>{ticket.description}</p>
          <div className="meta">
            <span>Status: {ticket.status}</span>
            <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
          </div>
          
          {isAdmin && (
            <select 
              value={ticket.status}
              onChange={(e) => onStatusChange(ticket.id, e.target.value)}
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          )}
          
          {!isAdmin && (
            <button onClick={() => onDelete(ticket.id)}>Delete</button>
          )}
        </div>
      ))}
    </div>
  );
}