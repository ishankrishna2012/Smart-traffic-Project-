import React, { useState, useEffect } from 'react';
import { MapPin, AlertCircle, Navigation, Zap } from 'lucide-react';
import { useTrafficStore } from '../store/trafficStore';
import RealTimeMap from '../components/RealTimeMap';
import TrafficSignalTimer from '../components/TrafficSignalTimer';
import LiveCongestionStatus from '../components/LiveCongestionStatus';

const LiveMap: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const schoolLocation = {
    lat: 25.0396,
    lng: 55.1219,
    name: 'DPS Dubai (Meadows Campus)',
  };

  useEffect(() => {
    // Get user's live location
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        (err) => {
          console.error('Geolocation error:', err);
          setError('Unable to access your location. Please enable location services.');
          setLoading(false);
          // Default to school area if location fails
          setUserLocation(schoolLocation);
        }
      );
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Real-time Map Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center gap-2">
          <MapPin className="text-indigo-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Live Traffic Map</h2>
        </div>
        
        {userLocation && (
          <RealTimeMap
            userLocation={userLocation}
            schoolLocation={schoolLocation}
          />
        )}
      </div>

      {/* Traffic Signal Timer */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center gap-2">
          <Zap className="text-yellow-500" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Signal Timings</h2>
        </div>
        <TrafficSignalTimer schoolLocation={schoolLocation} />
      </div>

      {/* Live Congestion Status */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center gap-2">
          <Navigation className="text-blue-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Real-time Congestion</h2>
        </div>
        <LiveCongestionStatus schoolLocation={schoolLocation} />
      </div>

      {/* School Information Card */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg shadow-md p-6 text-white">
        <h3 className="text-lg font-bold mb-3">DPS Dubai School Location</h3>
        <div className="space-y-2 text-sm">
          <p><strong>Coordinates:</strong> 25°02'22.5"N 55°07'19.0"E</p>
          <p><strong>Campus:</strong> Meadows</p>
          <p><strong>Status:</strong> Active Pick-up Coordination</p>
          <p className="mt-4 text-indigo-100">
            ℹ️ Our system uses Ministry of Dubai traffic data to optimize signal timings and reduce wait times during peak school hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;
