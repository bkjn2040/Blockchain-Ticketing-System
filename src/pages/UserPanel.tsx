import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import PurchaseForm from '../components/PurchaseForm';
import PurchaseList from '../components/PurchaseList';
import { Purchase } from '../components/types';
import QRCode from 'qrcode';

export default function UserPanel() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [qrCodeSvg, setQrCodeSvg] = useState<string | null>(null); // State to store the QR code SVG
  const userDID = localStorage.getItem('userDID');

  useEffect(() => {
    const savedPurchases = JSON.parse(localStorage.getItem('purchases') || '[]');
    setPurchases(savedPurchases.filter((p: Purchase) => p.purchasedBy === userDID));
  }, []);

  // Function to generate DID in the browser using the Web Crypto API
  const generateTicketDID = async (): Promise<{ did: string, qrCodeSvg: string }> => {
    // Generate an Ed25519 key pair
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: "ECDSA",
        namedCurve: "P-384",  // Ed25519 is not directly supported in the browser WebCrypto API, but we use P-384 as an alternative
      },
      true,
      ["sign", "verify"]
    );

    // Export the public key
    const publicKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
    const publicKeyHex = Array.from(new Uint8Array(publicKey))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');

    // Construct the DID using the public key hex
    const did = `did:hedera:${publicKeyHex}`;

    // Generate a QR code (SVG format) from the DID using the node-qrcode library.
    const qrCodeSvg = await QRCode.toString(did, { type: 'svg' });

    return { did, qrCodeSvg };
  };

  const handlePurchase = async (newPurchase: Purchase) => {
    // Generate a new DID when a purchase is made
    const { did, qrCodeSvg } = await generateTicketDID();

    // Log the generated DID to the console
    console.log("Generated DID for the ticket:", did);

    // Update the state with the generated QR code SVG
    setQrCodeSvg(qrCodeSvg);

    const newPurchases = [...purchases, newPurchase];
    setPurchases(newPurchases);
    localStorage.setItem('purchases', JSON.stringify(newPurchases));
  };

  return (
    <div className="flex h-screen w-full p-4 flex-col">
      {/* 页面主内容 */}
      <div className="flex flex-1">
        {/* 左侧部分 */}
        <div className="w-[38.2%] pr-2">
          <div className="space-y-4 h-full">
            {/* 图片占位 */}
            <div className="h-64 w-full bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">活动图片</span>
            </div>

            {/* 主办方信息区块 */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl">主办人</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200" /> {/* 头像占位 */}
                  <div>
                    <p className="font-medium">Jakub Kliment</p>
                    <p className="text-gray-600">26 人事部</p>
                  </div>
                </div>

                {/* 成员列表 */}
                <div className="pt-4">
                  <p className="font-medium mb-2">参与成员 (26人)</p>
                  <div className="grid grid-cols-3 gap-4">
                    {Array.from({ length: 26 }).map((_, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200" />
                        <span>成员 {index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-4">
                <Button variant="outline">联系主办人</Button>
                <Button variant="ghost" className="text-red-500">举报活动</Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* 右侧部分 */}
        <div className="w-[61.8%] pl-2">
          <div className="space-y-4 h-full">
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
            <Card>
              <CardContent className="py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-lg">欢迎！要参加活动，请在下方注册</p>
                    <p className="text-sm text-gray-500">此活动将于5天后开始</p>
                  </div>
                  <Button size="lg" onClick={() => handlePurchase({
                    id: Date.now().toString(),
                    purchasedBy: userDID || 'unknown',
                    eventName: 'Hedera x BSA Hackathon - Workshop #3',
                    quantity: 0,
                    price: 0,
                    purchaseDate: '',
                    status: 'confirmed'
                  })}>
                    立即报名
                  </Button>
                </div>
              </CardContent>
              {/* Event Tickets Section */}
              <div className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Tickets</CardTitle>
                  </CardHeader>
                  <PurchaseForm onSubmit={handlePurchase} />
                  <PurchaseList 
                    purchases={purchases} 
                    onCancel={(id: string) => setPurchases(purchases.filter(p => p.id !== id))} 
                  />
                </Card>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Render the QR Code if available */}
      {qrCodeSvg && (
        <div className="mt-4 p-4 border rounded-lg">
          <h3 className="font-semibold text-xl">Your Ticket QR Code</h3>
          <div dangerouslySetInnerHTML={{ __html: qrCodeSvg }} />
        </div>
      )}
    </div>
  );
}
