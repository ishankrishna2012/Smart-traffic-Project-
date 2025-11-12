import React, { useState, useEffect } from 'react';
import { Bus, Clock, AlertCircle, MapPin, TrendingUp } from 'lucide-react';

const StudentPickup: React.FC = () => {
  const [pickups, setPickups] = useState([
    {
      id: 1,
      busNumber: 'School Bus 1',
      driver: 'Ahmed Hassan',
      arrivalTime: '14:45',
      currentLocation: '2.5 km away',
      status: 'On Route',
      passengers: 12,
      capacity: 45,
      color: 'bg-blue-100 border-blue-300',
      textColor: 'text-blue-800',
    },
    {
      id: 2,
      busNumber: 'School Bus 2',
      driver: 'Fatima Khan',
      arrivalTime: '14:55',
      currentLocation: '4.2 km away',
      status: 'En Route',
      passengers: 18,
      capacity: 45,
      color: 'bg-green-100 border-green-300',
      textColor: 'text-green-800',
    },
    {
      id: 3,
      busNumber: 'School Bus 3',
      driver: 'Mohammed Ali',
      arrivalTime: '15:10',
      currentLocation: '6.8 km away',
      status: 'Scheduled',
      passengers: 8,
      capacity: 45,
      color: 'bg-yellow-100 border-yellow-300',
      textColor: 'text-yellow-800',
    },
  ]);

  const myBus = pickups[0];

  return (
    <div className="space-y-6">
      {/* My Bus Status */}
      <div className={`${myBus.color} border-l-4 rounded-lg p-6 shadow-md`}>
        <div className="flex items-start justify-between">
          <div>
            <h2 className={`text-2xl font-bold ${myBus.textColor} mb-2`}>
              {myBus.busNumber}
            </h2>
            <p className={`${myBus.textColor} text-sm mb-3`}>
              Driver: {myBus.driver}
            </p>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{myBus.currentLocation}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>Est. {myBus.arrivalTime}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${myBus.textColor} mb-2`}>
              {myBus.passengers}/{myBus.capacity}
            </div>
            <p className="text-xs text-gray-600">Passengers</p>
          </div>
        </div>
        <div className="mt-4 bg-white bg-opacity-50 rounded p-3">
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div
              className={`bg-blue-600 h-2 rounded-full transition-all`}
              style={{ width: `${(myBus.passengers / myBus.capacity) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            {((myBus.passengers / myBus.capacity) * 100).toFixed(0)}% Capacity
          </p>
        </div>
      </div>

      {/* Alert */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="text-orange-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-orange-800">Peak Hours Active</p>
          <p className="text-sm text-orange-700">
            School pickup time: 2:30 PM - 3:30 PM. Expect moderate traffic delays.
          </p>
        </div>
      </div>

      {/* All Buses */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Bus size={24} className="text-indigo-600" />
          All Available Buses
        </h3>
        <div className="space-y-3">
          {pickups.map((bus) => (
            <div
              key={bus.id}
              className={`${bus.color} border rounded-lg p-4 hover:shadow-md transition cursor-pointer`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className={`font-bold ${bus.textColor}`}>{bus.busNumber}</h4>
                <span className="text-xs font-semibold px-3 py-1 bg-white rounded-full">
                  {bus.status}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-2">Driver: {bus.driver}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {bus.currentLocation}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {bus.arrivalTime}
                </span>
                <span className="text-gray-600">
                  {bus.passengers}/{bus.capacity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp size={24} className="text-green-600" />
          Pickup Statistics
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Buses</p>
            <p className="text-3xl font-bold text-blue-600">3</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Active Routes</p>
            <p className="text-3xl font-bold text-green-600">3</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Avg. Waiting Time</p>
            <p className="text-3xl font-bold text-yellow-600">8 min</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">On-Time Rate</p>
            <p className="text-3xl font-bold text-purple-600">92%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPickup;
