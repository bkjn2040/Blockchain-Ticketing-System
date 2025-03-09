import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button } from './components/ui/button';
import './App.css';
import HomePage from './pages/HomePage';
import AdminPanel from './pages/AdminPanel';
import UserPanel from './pages/UserPanel';
import VerifyTicket from './pages/VerifyTicket';

function App() {
  return (
    <Router>
      <nav className="flex justify-center items-center p-4 border-b w-full bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="flex gap-2 w-full max-w-screen-2xl">
          <Link to="/">
            <Button 
              variant="ghost" 
              className="w-32 text-center rounded-lg hover:bg-gray-100 transition-all duration-200 text-gray-600 hover:text-gray-900"
            >
              🏠 Home
            </Button>
          </Link>
          <Link to="/user">
            <Button 
              variant="ghost"
              className="w-40 text-center rounded-lg hover:bg-gray-100 transition-all duration-200 text-gray-600 hover:text-gray-900"
            >
              🎫 My Tickets
            </Button>
          </Link>
          <Button 
            variant="destructive" 
            onClick={() => {
              localStorage.removeItem('adminAuthenticated');
              window.location.href = '/';
            }}
          >
            Log out
          </Button>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/user" element={<UserPanel />} />
        <Route path="/scanner" element={<VerifyTicket />} />
        <Route path="/admin" element={
          localStorage.getItem('adminAuthenticated') === 'true' 
            ? <AdminPanel /> 
            : <div className="p-4 text-red-500 text-center">
                <h2 className="text-2xl font-bold">Insufficient permissions</h2>
                <p className="mt-2">Please login as an administrator first</p>
                <Link to="/" className="text-blue-500 mt-4 inline-block">Home</Link>
              </div>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;