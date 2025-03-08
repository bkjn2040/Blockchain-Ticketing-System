import { useState, useEffect } from 'react';
import { verifyDID } from '../hedera/auth';
import PurchaseList from '../components/PurchaseList';
import { Card, CardHeader, CardTitle } from '../components/ui/card';
import { Purchase } from '../components/types';

export default function AdminPanel() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    const did = localStorage.getItem('userDID');
    if (!did || !verifyDID(did)) {
      alert('请先登录管理员账号');
      window.location.href = '/';
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
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Purchase Management</CardTitle>
        </CardHeader>
        <PurchaseList 
          purchases={purchases} 
          onStatusChange={updatePurchaseStatus} 
          isAdmin={true} 
        />
      </Card>
    </div>
  );
}