import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Link } from 'react-router-dom';
import React, { useState } from "react";
import { authenticateAdmin } from "../hedera/adminAuth";
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);

  const handleButtonClick = async () => {
    if (localStorage.getItem('adminAuthenticated') === 'true') {
      navigate('/admin'); // 认证成功后导航
    } else {
      const isAuthenticated = await authenticateAdmin(setAdminAuthenticated);
      if (isAuthenticated) {
        localStorage.setItem('adminAuthenticated', 'true');
        navigate('/admin'); // 认证成功后导航
      }
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">DID Ticketing System</CardTitle>
          <CardDescription className="text-center">
            Manage and submit tickets with decentralized identity verification
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* <Link to="/admin"> */}
            <Button className="w-full" onClick={handleButtonClick}>Management Panel</Button>
          {/* </Link> */}
          <Link to="/user">
            <Button className="w-full" variant="outline">
              User Panel
            </Button>
          </Link>
          <input
            type="password"
            id="privateKeyInput"
            placeholder="Enter your private key"
          />
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button 
            variant="destructive" 
            onClick={() => {
              localStorage.removeItem('adminAuthenticated');
              window.location.href = '/';
            }}
          >
            Log out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}