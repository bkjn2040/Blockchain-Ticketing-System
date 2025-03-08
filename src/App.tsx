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
          {/* <Link to="/admin">
            <Button variant="ghost" className="w-32 text-center">Admin Panel</Button>
          </Link> */}
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
        <Route path="/admin" element={
          localStorage.getItem('adminAuthenticated') === 'true' 
            ? <AdminPanel /> 
            : <div className="p-4 text-red-500 text-center">
                <h2 className="text-2xl font-bold">权限不足</h2>
                <p className="mt-2">请先以管理员身份登录</p>
                <Link to="/" className="text-blue-500 mt-4 inline-block">返回首页</Link>
              </div>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;