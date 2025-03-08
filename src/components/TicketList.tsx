import { Ticket } from './types';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function TicketList({ tickets, onDelete, onStatusChange, isAdmin }: any) {
  return (
    <CardContent className="space-y-4">
      {tickets.map((ticket: Ticket) => (
        <Card key={ticket.id}>
          <CardHeader>
            <CardTitle>{ticket.title}</CardTitle>
            <p>{ticket.description}</p>
            <div className="flex items-center justify-between">
              <span>Status: {ticket.status}</span>
              <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
            </div>
          </CardHeader>
          {isAdmin && (
            <Select
              value={ticket.status}
              onValueChange={(value) => onStatusChange(ticket.id, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          )}
          {!isAdmin && (
            <Button variant="destructive" onClick={() => onDelete(ticket.id)}>
              Delete
            </Button>
          )}
        </Card>
      ))}
    </CardContent>
  );
}