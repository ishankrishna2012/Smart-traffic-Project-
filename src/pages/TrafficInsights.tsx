import React, { useState, useEffect } from 'react';
import { Cloud, Droplets, Wind, Eye, TrendingUp } from 'lucide-react';

interface TrafficData {
  time: string;
  congestion: 'Low' | 'High';
  vehicles: number;
  avgSpeed: number;
}

interface WeatherData {
  temp: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  condition: string;
  icon: string;
}

const TrafficInsights: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temp: 38,
    humidity: 65,
    windSpeed: 12,
    visibility: 8,
    condition: 'Partly Cloudy',
    icon: '⛅',
  });

  const [trafficData] = useState<TrafficData[]>([
    { time: '14:00', congestion: 'Low', vehicles: 450, avgSpeed: 45 },
    { time: '14:15', congestion: 'Low', vehicles: 520, avgSpeed: 42 },
    { time: '14:30', congestion: 'High', vehicles: 890, avgSpeed: 25 },
    { time: '14:45', congestion: 'High', vehicles: 950, avgSpeed: 22 },
    { time: '15:00', congestion: 'High', vehicles: 870, avgSpeed: 28 },
    { time: '15:15', congestion: 'Low', vehicles: 620, avgSpeed: 38 },
  ]);

  const currentTraffic = trafficData[trafficData.length - 1];

  return (
    <div className="space-y-6">
      {/* Current Traffic Status */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg shadow-md p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Real-Time Traffic Status</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-indigo-100 text-sm">Current Congestion</p>
            <p className="text-3xl font-bold">{currentTraffic.congestion}</p>
          </div>
          <div>
            <p className="text-indigo-100 text-sm">Active Vehicles</p>
            <p className="text-3xl font-bold">{currentTraffic.vehicles}</p>
          </div>
          <div>
            <p className="text-indigo-100 text-sm">Average Speed</p>
            <p className="text-3xl font-bold">{currentTraffic.avgSpeed} km/h</p>
          </div>
          <div>
            <p className="text-indigo-100 text-sm">Sensor Status</p>
            <p className="text-xl font-bold text-green-300">✓ Active</p>
          </div>
        </div>
      </div>

      {/* Weather Impact */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Cloud className="text-blue-500" size={24} />
          Weather Insights
        </h3>
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-2">{weatherData.icon}</div>
            <p className="text-2xl font-bold text-gray-800">{weatherData.condition}</p>
            <p className="text-4xl font-bold text-blue-600 mt-2">{weatherData.temp}°C</p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t pt-4">
            <div className="flex items-center gap-3">
              <Droplets className="text-blue-500" size={20} />
              <div>
                <p className="text-xs text-gray-600">Humidity</p>
                <p className="font-bold text-gray-800">{weatherData.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Wind className="text-cyan-500" size={20} />
              <div>
                <p className="text-xs text-gray-600">Wind Speed</p>
                <p className="font-bold text-gray-800">{weatherData.windSpeed} km/h</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Eye className="text-green-500" size={20} />
              <div>
                <p className="text-xs text-gray-600">Visibility</p>
                <p className="font-bold text-gray-800">{weatherData.visibility} km</p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-100 border-l-4 border-blue-500 rounded">
            <p className="text-sm text-blue-800">
              <strong>Traffic Impact:</strong> Clear weather improving traffic flow. Expected delays: 8-12 minutes.
            </p>
          </div>
        </div>
      </div>

      {/* Traffic Timeline */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp size={24} className="text-green-600" />
          Traffic Timeline (Last 1 Hour)
        </h3>
        <div className="space-y-3">
          {trafficData.map((data, index) => (
            <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded">
              <div className="text-sm font-semibold text-gray-600 min-w-12">{data.time}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      data.congestion === 'High'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {data.congestion}
                  </span>
                  <span className="text-sm text-gray-600">{data.vehicles} vehicles</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      data.congestion === 'High' ? 'bg-red-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${(data.vehicles / 1000) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-sm font-semibold text-gray-700 min-w-16 text-right">
                {data.avgSpeed} km/h
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ministry Data Information */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
        <h3 className="font-bold text-indigo-900 mb-3">📊 Ministry of Dubai Data</h3>
        <ul className="space-y-2 text-sm text-indigo-800">
          <li>✓ Real-time traffic signal timings integrated</li>
          <li>✓ 3-year historical data for prediction algorithms</li>
          <li>✓ Signal timing accuracy: 98%</li>
          <li>✓ Next update in: 2 minutes</li>
        </ul>
      </div>

      {/* Peak Hours Alert */}
      <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-4">
        <p className="font-semibold text-orange-900">🚨 Peak Hours (2:30 PM - 3:30 PM)</p>
        <p className="text-sm text-orange-800 mt-2">
          Expected congestion: HIGH | Recommended: Avoid main entrance between 14:45-15:15
        </p>
      </div>
    </div>
  );
};

export default TrafficInsights;
