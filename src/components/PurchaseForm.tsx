import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Purchase } from './types';

export default function PurchaseForm({ onSubmit }: { 
  onSubmit: (purchase: Purchase) => void 
}) {
  const [eventName, setEventName] = useState('Hedera x BSA Hackathon - Workshop #3');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: Date.now().toString(),
      eventName,
      quantity,
      price,
      purchaseDate: new Date().toISOString(),
      purchasedBy: localStorage.getItem('userDID') || '',
      status: 'pending'
    });
    setEventName('Hedera x BSA Hackathon - Workshop #3');
    setQuantity(1);
    setPrice(10);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <Input
        placeholder="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min="1"
        required
      />
      <Input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        min="10"
        required
      />
      <Button type="submit" className="w-full">
        Purchase Ticket
      </Button>
    </form>
  );
}