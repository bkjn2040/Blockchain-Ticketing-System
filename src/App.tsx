import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button } from './components/ui/button';
import './App.css';
import HomePage from './pages/HomePage';
import AdminPanel from './pages/AdminPanel';
import UserPanel from './pages/UserPanel';
import DIDManager from './components/DIDManager';

function App() {
  return (
    <Router>
      <nav className="flex justify-center items-center p-4 border-b w-full">
        <div className="flex gap-4 w-full max-w-screen-2xl">
          <Link to="/">
            <Button variant="ghost" className="w-64 text-center">Home</Button>
          </Link>
          <Link to="/admin">
            <Button variant="ghost" className="w-32 text-center">Admin Panel</Button>
          </Link>
          <Link to="/user">
            <Button variant="ghost" className="w-32 text-center">My Purchases</Button>
          </Link>
        </div>
        {/* <DIDManager /> */}
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/user" element={<UserPanel />} />
      </Routes>
    </Router>
  );
}

export default App;