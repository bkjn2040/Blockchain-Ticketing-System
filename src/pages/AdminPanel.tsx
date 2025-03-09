import { useState, useEffect } from 'react';
import PurchaseList from '../components/PurchaseList';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Purchase } from '../components/types';

export default function AdminPanel() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    if (localStorage.getItem('adminAuthenticated') !== 'true') {
      window.location.href = '/';
      alert('Please log in to the administrator account first');
    }
  
    const savedPurchases = JSON.parse(localStorage.getItem('purchases') || '[]');
    setPurchases(savedPurchases);
  }, []);

  const updatePurchaseStatus = (id: string, status: 'confirmed' | 'cancelled') => {
    const updated = purchases.map(p => 
      p.id === id ? { ...p, status } : p
    );
    setPurchases(updated);
    localStorage.setItem('purchases', JSON.stringify(updated));
  };

  return (
    <div className="flex h-screen w-full p-4">
      {/*  */}
      <div className="w-[38.2%] pr-2">
        <div className="space-y-4 h-full">
          {/* $ */}
          <div className="h-64 w-full bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Event</span>
          </div>

          {/* * */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-xl">Administrator information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200" /> {/* * */}
                <div>
                  <p className="font-medium">Admin Name</p>
                  <p className="text-gray-600">Administrator</p>
                </div>
              </div>
              
              {/* * */}
              <div className="pt-4">
                <p className="font-medium mb-2">Statistics</p>
                <div className="space-y-2">
                  <p>Total tickets purchased: {purchases.length}</p>
                  <p>Confirmed: {purchases.filter(p => p.status === 'confirmed').length}</p>
                  <p>Pending: {purchases.filter(p => p.status === 'pending').length}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-4">
              <Button variant="outline">Refresh</Button>
              <Button variant="ghost" className="text-red-500">Export Data</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/*  */}
      <div className="w-[61.8%] pl-2">
        <div className="space-y-4 h-full">
          {/*  */}
          <Card>
            <CardHeader>
              <h1 className="text-3xl font-bold">Ticket purchase management</h1>
              <div className="space-y-2 mt-4">
                <p className="text-xl">Current Event: Hedera x BSA Hackathon - Workshop #3</p>
                <p className="text-xl">Privileges: Administrator</p>
              </div>
            </CardHeader>
          </Card>

          {/* * */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-xl">Ticket List</CardTitle>
            </CardHeader>
            <CardContent>
              <PurchaseList 
                purchases={purchases} 
                onStatusChange={updatePurchaseStatus} 
                isAdmin={true} 
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}