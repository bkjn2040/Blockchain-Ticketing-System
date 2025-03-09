import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Link } from 'react-router-dom';
import React, { useState } from "react";
import { authenticateAdmin } from "../hedera/adminAuth";
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';

export default function HomePage() {
  const navigate = useNavigate();
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);

  const handleButtonClick = async () => {
    if (localStorage.getItem('adminAuthenticated') === 'true') {
      navigate('/admin'); 
    } else {
      const isAuthenticated = await authenticateAdmin(setAdminAuthenticated);
      if (isAuthenticated) {
        localStorage.setItem('adminAuthenticated', 'true');
        navigate('/admin'); 
      }
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center p-4">
  <Card className="w-full max-w-md mx-auto shadow-xl rounded-2xl border-0">
    <CardHeader className="text-center space-y-2 pb-4">
      <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl mb-4">
        🔐
      </div>
      <CardTitle className="text-3xl font-bold text-gray-900">DID Ticketing</CardTitle>
      <CardDescription className="text-gray-500">
        Secure decentralized ticketing system
      </CardDescription>
    </CardHeader>
    
    <CardContent className="space-y-4">
      <Button 
        onClick={handleButtonClick}
        className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all"
      >
        🔒 Management Panel
      </Button>
      
      <div className="space-y-3">
        <Link to="/user">
          <Button variant="outline" className="w-full h-12 rounded-xl">
            👤 User Dashboard
          </Button>
        </Link>
        <Link to="/scanner">
          <Button variant="outline" className="w-full h-12 rounded-xl">
            📷 QR Scanner
          </Button>
        </Link>
      </div>

      {/* <Input
        type="password"
        placeholder="🔑 Enter private key"
        className="rounded-xl h-12 focus-visible:ring-blue-200 border-gray-200"
      /> */}
    </CardContent>
  </Card>
</div>
  );
}