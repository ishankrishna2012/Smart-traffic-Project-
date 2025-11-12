import React, { useState, useEffect } from 'react';
import { Zap, Clock } from 'lucide-react';

interface TrafficSignalTimerProps {
  schoolLocation: { lat: number; lng: number; name: string };
}

const TrafficSignalTimer: React.FC<TrafficSignalTimerProps> = ({ schoolLocation }) => {
  const [signals, setSignals] = useState([
    {
      id: 1,
      name: 'Main Gate (North)',
      greenTime: 45,
      redTime: 35,
      nextChange: 12,
      status: 'GREEN',
    },
    {
      id: 2,
      name: 'Side Entrance (East)',
      greenTime: 40,
      redTime: 40,
      nextChange: 28,
      status: 'RED',
    },
    {
      id: 3,
      name: 'Back Exit (South)',
      greenTime: 38,
      redTime: 42,
      nextChange: 5,
      status: 'YELLOW',
    },
  ]);

  const [countdown, setCountdown] = useState<{ [key: number]: number }>({
    1: 12,
    2: 28,
    3: 5,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((key) => {
          updated[parseInt(key)] = updated[parseInt(key)] > 0 ? updated[parseInt(key)] - 1 : 80;
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getSignalColor = (status: string) => {
    switch (status) {
      case 'GREEN':
        return 'bg-green-500';
      case 'RED':
        return 'bg-red-500';
      case 'YELLOW':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getSignalTextColor = (status: string) => {
    switch (status) {
      case 'GREEN':
        return 'text-green-700 bg-green-50';
      case 'RED':
        return 'text-red-700 bg-red-50';
      case 'YELLOW':
        return 'text-yellow-700 bg-yellow-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="grid gap-4">
        {signals.map((signal) => (
          <div
            key={signal.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4 mb-3">
              {/* Signal Light */}
              <div className={`w-16 h-16 ${getSignalColor(signal.status)} rounded-full flex items-center justify-center shadow-lg`}>
                <span className="text-white text-sm font-bold text-center">
                  <div>{signal.status[0]}</div>
                  <div className="text-xs">{countdown[signal.id]}s</div>
                </span>
              </div>

              {/* Signal Info */}
              <div className="flex-1">
                <h4 className="font-bold text-gray-800">{signal.name}</h4>
                <p className={`text-sm py-1 px-2 rounded mt-1 ${getSignalTextColor(signal.status)}`}>
                  {signal.status}
                </p>
              </div>

              {/* Timing */}
              <div className="text-right">
                <div className="text-3xl font-bold text-indigo-600">{countdown[signal.id]}</div>
                <p className="text-xs text-gray-500">seconds</p>
              </div>
            </div>

            {/* Cycle Info */}
            <div className="flex gap-2 text-xs">
              <div className="bg-green-100 px-2 py-1 rounded flex items-center gap-1">
                <span className="text-green-700">🟢 {signal.greenTime}s</span>
              </div>
              <div className="bg-red-100 px-2 py-1 rounded flex items-center gap-1">
                <span className="text-red-700">🔴 {signal.redTime}s</span>
              </div>
              <div className="bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                <span className="text-gray-700">Total: {signal.greenTime + signal.redTime}s</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ministry Data Info */}
      <div className="mt-6 p-4 bg-indigo-50 border border-indigo-300 rounded-lg">
        <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
          <Zap size={18} />
          Ministry of Dubai Integration
        </h4>
        <ul className="text-sm text-indigo-800 space-y-1">
          <li>✓ Real-time signal synchronization</li>
          <li>✓ Historical data (3 years) for prediction</li>
          <li>✓ AI optimizes timings every 15 minutes</li>
          <li>✓ Peak hour adjustment (2:30 - 3:30 PM)</li>
        </ul>
      </div>

      {/* How It Works */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-bold text-blue-900 mb-2">How It Works</h4>
        <p className="text-sm text-blue-800">
          Our AI-powered system uses real-time traffic sensors and Ministry data to automatically adjust
          signal timings. This reduces congestion and ensures smooth traffic flow during peak school hours.
          The countdown timers help drivers and pedestrians plan their movements safely.
        </p>
      </div>
    </div>
  );
};

export default TrafficSignalTimer;
