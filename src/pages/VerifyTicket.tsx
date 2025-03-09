import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button'; 
import { Input } from '../components/ui/input';
import jsQR from 'jsqr';  // QR Code decoding library
import { validateDIDOnHedera } from '../hedera/adminAuth';  // Import the validateDIDOnHedera function

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
    <div className="flex flex-col items-center p-4">
      {/* QR Code Scanner */}
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleScanQRCode}
          className="border p-2"
        />
        <p className="text-sm text-gray-500 mt-2">Upload an image containing a QR code</p>
      </div>

      {/* QR Code Data Display */}
      {qrCodeData && (
        <div>
          <p className="text-xl font-medium mb-2">Decoded DID:</p>
          <p className="text-lg font-semibold">{qrCodeData}</p>
        </div>
      )}

      {/* Verify DID Button */}
      <Button onClick={handleVerifyDID} className="mt-4">
        Verify DID
      </Button>

      {/* Display Verification Result */}
      {scanResult && (
        <div className="mt-4">
          <p className="text-lg font-semibold">{scanResult}</p>
        </div>
      )}
    </div>
  );
}
