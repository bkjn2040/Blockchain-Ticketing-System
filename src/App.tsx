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
      <nav className="flex justify-between items-center p-4 border-b">
        <div className="flex gap-4">
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link to="/admin">
            <Button variant="ghost">Admin Panel</Button>
          </Link>
          <Link to="/user">
            <Button variant="ghost">My Purchases</Button>
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