import React, { useState, useEffect } from 'react';
import { Activity, AlertCircle, Users, TrendingUp, Clock, MapPin } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard: React.FC = () => {
  const [stats] = useState({
    activePickups: 3,
    totalVehicles: 8,
    onTimeRate: 92,
    avgWaitTime: 8,
  });

  const trafficData = [
    { time: '14:00', vehicles: 450 },
    { time: '14:15', vehicles: 520 },
    { time: '14:30', vehicles: 890 },
    { time: '14:45', vehicles: 950 },
    { time: '15:00', vehicles: 870 },
    { time: '15:15', vehicles: 620 },
  ];

  const busData = [
    { name: 'Bus 1', passengers: 12 },
    { name: 'Bus 2', passengers: 18 },
    { name: 'Bus 3', passengers: 8 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg shadow-md p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to Smart Traffic Control</h1>
        <p className="text-indigo-100">
          Real-time monitoring and coordination for DPS Dubai school traffic management
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
          <Activity className="text-blue-600 mx-auto mb-2" size={32} />
          <p className="text-gray-600 text-sm">Active Pickups</p>
          <p className="text-3xl font-bold text-gray-800">{stats.activePickups}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
          <Users className="text-green-600 mx-auto mb-2" size={32} />
          <p className="text-gray-600 text-sm">School Buses</p>
          <p className="text-3xl font-bold text-gray-800">{stats.totalVehicles}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
          <TrendingUp className="text-purple-600 mx-auto mb-2" size={32} />
          <p className="text-gray-600 text-sm">On-Time Rate</p>
          <p className="text-3xl font-bold text-gray-800">{stats.onTimeRate}%</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
          <Clock className="text-orange-600 mx-auto mb-2" size={32} />
          <p className="text-gray-600 text-sm">Avg Wait Time</p>
          <p className="text-3xl font-bold text-gray-800">{stats.avgWaitTime}m</p>
        </div>
      </div>

      {/* Alert */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-semibold text-yellow-900">Peak Hours Alert</p>
            <p className="text-sm text-yellow-800 mt-1">
              School hours traffic is currently HIGH. Expected delays of 8-12 minutes on main routes.
            </p>
          </div>
        </div>
      </div>

      {/* Traffic Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp size={24} className="text-indigo-600" />
          Traffic Volume (Last Hour)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trafficData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="vehicles" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bus Occupancy */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Bus Occupancy Status</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={busData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="passengers" fill="#4f46e5" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Active Routes */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <MapPin size={24} className="text-blue-600" />
          Active Routes
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div>
              <p className="font-semibold text-blue-900">School Bus 1 - Main Route</p>
              <p className="text-sm text-blue-700">Current: 2.5 km away • ETA: 14:45</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-bold">
              On Track
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
            <div>
              <p className="font-semibold text-green-900">School Bus 2 - Gardens Route</p>
              <p className="text-sm text-green-700">Current: 4.2 km away • ETA: 14:55</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-bold">
              On Track
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div>
              <p className="font-semibold text-yellow-900">School Bus 3 - East Route</p>
              <p className="text-sm text-yellow-700">Current: 6.8 km away • ETA: 15:10</p>
            </div>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold">
              Scheduled
            </span>
          </div>
        </div>
      </div>

      {/* School Information */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
        <h3 className="font-bold text-indigo-900 mb-3">📍 DPS Dubai Location</h3>
        <p className="text-indigo-800 mb-2">
          <strong>Coordinates:</strong> 25°02'22.5"N 55°07'19.0"E
        </p>
        <p className="text-indigo-800">
          <strong>Campus:</strong> Meadows • <strong>Status:</strong> Active Traffic Management
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
