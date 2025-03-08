import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function UserPanel() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* 活动标题区块 */}
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold">Hedera x BSA Hackathon - Workshop #3</h1>
          <div className="space-y-2 mt-4">
            <p className="text-xl">🗓 3月3日星期一 18:00 - 20:00</p>
            <p className="text-xl">📍 BC Building (building of the IC faculty)</p>
          </div>
        </CardHeader>
      </Card>

      {/* 主办方信息区块 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">主办人</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200" /> {/* 头像占位 */}
            <div>
              <p className="font-medium">Jakub Kliment</p>
              <p className="text-gray-600">26 人事部</p>
            </div>
          </div>
          <p className="pt-4">Yelizaveta, Jeanne bassier 和其他 24 人</p>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button variant="outline">联系主办人</Button>
          <Button variant="ghost" className="text-red-500">举报活动</Button>
        </CardFooter>
      </Card>

      {/* 活动详情区块 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">活动详情</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Join us on March 3rd, 2025, from 6 PM to 8 PM at EPEI, BC329, for our third workshop, where we dive into Decentralized Identity (DID) on Hedera!</p>
          
          <div className="space-y-2">
            <p className="font-medium">In this hands-on session, we'll explore:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>What is Decentralized Identity (DID) and why it matters?</li>
              <li>How Hedera's DID framework works and how to use it</li>
              <li>Building a project that leverages DID for secure authentication</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* 注册区块 */}
      <Card className="sticky bottom-0 bg-white shadow-lg">
        <CardContent className="py-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-lg">欢迎！要参加活动，请在下方注册</p>
              <p className="text-sm text-gray-500">此活动将于5天后开始</p>
            </div>
            <Button size="lg">立即报名</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}