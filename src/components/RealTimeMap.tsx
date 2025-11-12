import React, { useEffect, useState } from 'react';

interface RealTimeMapProps {
  userLocation: { lat: number; lng: number };
  schoolLocation: { lat: number; lng: number; name: string };
}

const RealTimeMap: React.FC<RealTimeMapProps> = ({ userLocation, schoolLocation }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate Google Maps loading
    setMapLoaded(true);
  }, []);

  const calculateDistance = () => {
    const lat1 = userLocation.lat;
    const lon1 = userLocation.lng;
    const lat2 = schoolLocation.lat;
    const lon2 = schoolLocation.lng;

    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(1);
  };

  if (!mapLoaded) {
    return <div className="h-96 bg-gray-200 animate-pulse rounded-lg"></div>;
  }

  const distance = calculateDistance();

  return (
    <div className="p-4">
      {/* Placeholder for Google Maps */}
      <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex flex-col items-center justify-center border-2 border-indigo-300">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-indigo-600 mb-4">📍 Live Traffic Map</h3>
          <div className="bg-white p-6 rounded-lg shadow-md mb-4">
            <p className="text-gray-600 mb-2">
              <strong>Your Location:</strong> {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>School:</strong> {schoolLocation.name}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Distance:</strong> {distance} km away
            </p>
            <p className="text-sm text-indigo-600">
              🔵 Your Location | 🏫 School | 🚗 Live Traffic
            </p>
          </div>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
            Open Full Map
          </button>
        </div>
      </div>

      {/* Route Information */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-600">📍 Your Location</p>
          <p className="font-bold text-blue-900 mt-1">Live Position</p>
          <p className="text-xs text-blue-700 mt-1">Updated: Just now</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <p className="text-sm text-gray-600">🏫 School Campus</p>
          <p className="font-bold text-green-900 mt-1">DPS Dubai Meadows</p>
          <p className="text-xs text-green-700 mt-1">{distance} km away</p>
        </div>
      </div>

      {/* Traffic Layers */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-3">Traffic Conditions</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm text-gray-700">Show Traffic Flow</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm text-gray-700">Show School Bus Routes</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm text-gray-700">Show Signal Status</span>
          </label>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
        <h4 className="font-semibold text-indigo-900 mb-2">Map Legend</h4>
        <div className="text-xs text-indigo-800 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Light Traffic</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Moderate Traffic</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Heavy Traffic</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMap;
