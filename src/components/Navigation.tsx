import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, BarChart3, Bus, User, Zap, Bell } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 px-4 py-4 flex items-center justify-between md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            🚦
          </div>
          <span className="font-bold text-gray-800 hidden sm:inline">Smart Traffic</span>
        </Link>
        <button className="relative text-gray-600 hover:text-indigo-600">
          <Bell size={24} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </nav>

      {/* Bottom Tab Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-50">
        <div className="flex justify-around max-w-screen-xl mx-auto">
          <Link
            to="/"
            className={`flex-1 flex flex-col items-center justify-center py-3 transition ${
              isActive('/') ? 'text-indigo-600 border-t-2 border-indigo-600' : 'text-gray-600'
            }`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
          <Link
            to="/tabs/live-map"
            className={`flex-1 flex flex-col items-center justify-center py-3 transition ${
              isActive('/tabs/live-map') ? 'text-indigo-600 border-t-2 border-indigo-600' : 'text-gray-600'
            }`}
          >
            <Map size={24} />
            <span className="text-xs mt-1">Live Map</span>
          </Link>
          <Link
            to="/tabs/traffic-insights"
            className={`flex-1 flex flex-col items-center justify-center py-3 transition ${
              isActive('/tabs/traffic-insights')
                ? 'text-indigo-600 border-t-2 border-indigo-600'
                : 'text-gray-600'
            }`}
          >
            <BarChart3 size={24} />
            <span className="text-xs mt-1">Insights</span>
          </Link>
          <Link
            to="/tabs/student-pickup"
            className={`flex-1 flex flex-col items-center justify-center py-3 transition ${
              isActive('/tabs/student-pickup')
                ? 'text-indigo-600 border-t-2 border-indigo-600'
                : 'text-gray-600'
            }`}
          >
            <Bus size={24} />
            <span className="text-xs mt-1">Pickup</span>
          </Link>
          <Link
            to="/tabs/pedestrian-crossing"
            className={`flex-1 flex flex-col items-center justify-center py-3 transition ${
              isActive('/tabs/pedestrian-crossing')
                ? 'text-indigo-600 border-t-2 border-indigo-600'
                : 'text-gray-600'
            }`}
          >
            <Zap size={24} />
            <span className="text-xs mt-1">Signals</span>
          </Link>
          <Link
            to="/tabs/parent-profile"
            className={`flex-1 flex flex-col items-center justify-center py-3 transition ${
              isActive('/tabs/parent-profile') ? 'text-indigo-600 border-t-2 border-indigo-600' : 'text-gray-600'
            }`}
          >
            <User size={24} />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
