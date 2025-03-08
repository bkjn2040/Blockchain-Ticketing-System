import { useState, useEffect } from 'react';
import { verifyDID } from '../hedera/auth';
import PurchaseList from '../components/PurchaseList';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Purchase } from '../components/types';

export default function AdminPanel() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    if (localStorage.getItem('adminAuthenticated') !== 'true') {
      window.location.href = '/';
      alert('请先登录管理员账号');
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
      {/* 左侧部分 */}
      <div className="w-[38.2%] pr-2">
        <div className="space-y-4 h-full">
          {/* 图片占位 */}
          <div className="h-64 w-full bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">活动图片</span>
          </div>

          {/* 管理员信息区块 */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-xl">管理员信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200" /> {/* 头像占位 */}
                <div>
                  <p className="font-medium">Admin Name</p>
                  <p className="text-gray-600">管理员</p>
                </div>
              </div>
              
              {/* 统计信息 */}
              <div className="pt-4">
                <p className="font-medium mb-2">活动统计</p>
                <div className="space-y-2">
                  <p>总购票数: {purchases.length}</p>
                  <p>已确认: {purchases.filter(p => p.status === 'confirmed').length}</p>
                  <p>待处理: {purchases.filter(p => p.status === 'pending').length}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-4">
              <Button variant="outline">刷新数据</Button>
              <Button variant="ghost" className="text-red-500">导出数据</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* 右侧部分 */}
      <div className="w-[61.8%] pl-2">
        <div className="space-y-4 h-full">
          {/* 购票管理标题区块 */}
          <Card>
            <CardHeader>
              <h1 className="text-3xl font-bold">购票管理</h1>
              <div className="space-y-2 mt-4">
                <p className="text-xl">当前活动: Hedera x BSA Hackathon - Workshop #3</p>
                <p className="text-xl">管理权限: 管理员</p>
              </div>
            </CardHeader>
          </Card>

          {/* 购票列表区块 */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-xl">购票列表</CardTitle>
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