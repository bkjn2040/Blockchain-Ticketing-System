// pages/HomePage.tsx
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="home-container">
      <h1>DID Ticketing System</h1>
      <div className="button-group">
        <Link to="/admin" className="nav-button">
          Management Panel
        </Link>
        <Link to="/user" className="nav-button">
          User Panel
        </Link>
      </div>
    </div>
  );
}