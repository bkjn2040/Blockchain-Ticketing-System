import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Event Ticket System</CardTitle>
          <CardDescription className="text-center">
            Purchase and manage event tickets with decentralized identity
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Link to="/admin">
            <Button className="w-full">Management Panel</Button>
          </Link>
          <Link to="/user">
            <Button className="w-full" variant="outline">
              Purchase Tickets
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}