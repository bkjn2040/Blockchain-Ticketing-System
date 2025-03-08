import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Purchase } from './types';
import { Button } from './ui/button';

export default function PurchaseList({
  purchases,
  onStatusChange,
  onCancel,
  isAdmin = false
}: {
  purchases: Purchase[];
  onStatusChange?: (id: string, status: 'confirmed' | 'cancelled') => void;
  onCancel?: (id: string) => void;
  isAdmin?: boolean;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Event</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purchases.map((purchase) => (
          <TableRow key={purchase.id}>
            <TableCell>{purchase.eventName}</TableCell>
            <TableCell>{purchase.quantity}</TableCell>
            <TableCell>${purchase.price}</TableCell>
            <TableCell>{new Date(purchase.purchaseDate).toLocaleDateString()}</TableCell>
            <TableCell>{purchase.status}</TableCell>
            <TableCell>
              {isAdmin ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => onStatusChange?.(purchase.id, 'confirmed')}
                  >
                    Confirm
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="ml-2"
                    onClick={() => onStatusChange?.(purchase.id, 'cancelled')}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                purchase.status === 'pending' && (
                  <Button 
                    variant="destructive"
                    onClick={() => onCancel?.(purchase.id)}
                  >
                    Cancel
                  </Button>
                )
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}