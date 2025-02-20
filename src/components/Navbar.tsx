import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, Users, Building2, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Dome Builds Manager</span>
          </Link>
          
          <div className="flex space-x-4">
            <NavLink to="/" icon={<LayoutDashboard />} text="Dashboard" active={isActive('/')} />
            <NavLink to="/map" icon={<Map />} text="Project Map" active={isActive('/map')} />
            <NavLink to="/builders" icon={<Users />} text="Builders" active={isActive('/builders')} />
            <NavLink to="/structures" icon={<Building2 />} text="Structures" active={isActive('/structures')} />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, text, active }: { to: string; icon: React.ReactNode; text: string; active: boolean }) => (
  <Link
    to={to}
    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
      active
        ? 'bg-blue-100 text-blue-700'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default Navbar;