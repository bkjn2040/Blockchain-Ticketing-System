import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button'; 
import { Input } from '../components/ui/input';
import jsQR from 'jsqr';  // QR Code decoding library
import { validateDIDOnHedera } from '../hedera/adminAuth';  // Import the validateDIDOnHedera function
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { UploadIcon } from 'lucide-react';

export default function VerifyTicket() {
  const [qrCodeData, setQrCodeData] = useState<string | null>(null); // Store decoded DID
  const [scanResult, setScanResult] = useState<string>(''); // Show result of DID verification
  const [scannerEnabled, setScannerEnabled] = useState<boolean>(false); // Whether to enable QR scanner

  // Function to scan QR code from an image
  const handleScanQRCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const image = new Image();
          image.src = reader.result as string;

          image.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (context) {
              canvas.width = image.width;
              canvas.height = image.height;
              context.drawImage(image, 0, 0, image.width, image.height);
              const imageData = context.getImageData(0, 0, image.width, image.height);
              const decoded = jsQR(imageData.data, image.width, image.height);

              if (decoded) {
                setQrCodeData(decoded.data); // Set the decoded DID from the QR code
              } else {
                setScanResult('QR code not recognized.');
              }
            }
          };
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Function to verify DID on Hedera
  const verifyDID = async (did: string) => {
    try {
      // Validate DID on Hedera using the provided private key
      const isValid = await validateDIDOnHedera(did, localStorage.getItem('userPrivateKey') || '');
      
      if (isValid) {
        setScanResult(`DID verification successful: ${did}`);
      } else {
        setScanResult(`DID verification failed: ${did}`);
      }
    } catch (error) {
      console.error(error);
      setScanResult('Error during DID verification.');
    }
  };

  // Function to handle DID verification after scanning
  const handleVerifyDID = () => {
    if (qrCodeData) {
      verifyDID(qrCodeData);
    } else {
      setScanResult('Please scan a QR code first.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
  <Card className="w-full max-w-lg shadow-xl rounded-2xl border-0">
    <CardHeader className="text-center pb-4">
      <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-2xl mb-4">
        📷
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Verify Ticket</h1>
    </CardHeader>

    <CardContent className="space-y-6">
      <div className="space-y-4">
        <label className="block">
          <span className="sr-only">Upload QR Code</span>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-blue-500 transition-colors bg-white">
              <UploadIcon className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-gray-600">Click to upload QR image</p>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleScanQRCode}
                className="hidden"
              />
            </label>
          </div>
        </label>

        {qrCodeData && (
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm font-medium text-gray-600">Scanned DID:</p>
            <p className="font-mono text-blue-600 break-all">{qrCodeData}</p>
          </div>
        )}

        <Button 
          onClick={handleVerifyDID}
          className="w-full h-12 rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition-all"
        >
          Verify Authenticity
        </Button>

        {scanResult && (
          <div className={`p-4 rounded-xl ${
            scanResult.includes('successful') 
              ? 'bg-green-50 text-green-700' 
              : 'bg-red-50 text-red-700'
          }`}>
            {scanResult}
          </div>
        )}
      </div>
    </CardContent>
  </Card>
</div>
  );
}
