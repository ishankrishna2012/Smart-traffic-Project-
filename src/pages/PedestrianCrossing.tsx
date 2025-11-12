import React, { useState } from 'react';
import { AlertTriangle, Zap, Timer, Navigation2 } from 'lucide-react';

interface Signal {
  id: number;
  name: string;
  status: 'green' | 'red' | 'yellow';
  greenTime: number;
  redTime: number;
  totalCycle: number;
  nextChange: number;
}

const PedestrianCrossing: React.FC = () => {
  const [signals, setSignals] = useState<Signal[]>([
    {
      id: 1,
      name: 'Main Entrance (North)',
      status: 'green',
      greenTime: 45,
      redTime: 35,
      totalCycle: 80,
      nextChange: 12,
    },
    {
      id: 2,
      name: 'Gardens Area (South)',
      status: 'red',
      greenTime: 40,
      redTime: 40,
      totalCycle: 80,
      nextChange: 28,
    },
    {
      id: 3,
      name: 'Emergency Exit (East)',
      status: 'yellow',
      greenTime: 38,
      redTime: 42,
      totalCycle: 80,
      nextChange: 5,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'green':
        return 'bg-green-500';
      case 'red':
        return 'bg-red-500';
      case 'yellow':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'green':
        return '✓ GO';
      case 'red':
        return '✕ STOP';
      case 'yellow':
        return '⚠ CAUTION';
      default:
        return 'UNKNOWN';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-lg shadow-md p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">🚦 Smart Pedestrian Crossings</h2>
        <p className="text-red-100">
          AI-powered signal management with real-time countdown timers for enhanced safety
        </p>
      </div>

      {/* Safety Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertTriangle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-semibold text-blue-900">Safety First</p>
            <p className="text-sm text-blue-800 mt-1">
              Countdown timers help pedestrians safely cross by showing remaining time before signals change.
              AI adjusts timings based on real-time traffic flow.
            </p>
          </div>
        </div>
      </div>

      {/* Signals */}
      <div className="space-y-4">
        {signals.map((signal) => (
          <div key={signal.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Signal Header */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 border-b">
              <div
                className={`${getStatusColor(
                  signal.status
                )} w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}
              >
                <span className="text-center">
                  <div className="text-2xl">
                    {signal.status === 'green' ? '✓' : signal.status === 'red' ? '✕' : '⚠'}
                  </div>
                  <div className="text-xs">{signal.status.toUpperCase()}</div>
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">{signal.name}</h3>
                <p className="text-sm text-gray-600">Signal ID: {signal.id}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-indigo-600">{signal.nextChange}s</div>
                <p className="text-xs text-gray-600">until change</p>
              </div>
            </div>

            {/* Signal Details */}
            <div className="p-4 space-y-4">
              {/* Countdown Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Cycle Progress</span>
                  <span className="text-sm text-gray-600">
                    {Math.round(((signal.totalCycle - signal.nextChange) / signal.totalCycle) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 transition-all ${getStatusColor(signal.status)}`}
                    style={{
                      width: `${((signal.totalCycle - signal.nextChange) / signal.totalCycle) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Timing Details */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap size={16} className="text-green-600" />
                    <span className="text-xs text-gray-600">Green</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">{signal.greenTime}s</p>
                </div>
                <div className="bg-red-50 p-3 rounded border border-red-200">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle size={16} className="text-red-600" />
                    <span className="text-xs text-gray-600">Red</span>
                  </div>
                  <p className="text-2xl font-bold text-red-600">{signal.redTime}s</p>
                </div>
                <div className="bg-indigo-50 p-3 rounded border border-indigo-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Timer size={16} className="text-indigo-600" />
                    <span className="text-xs text-gray-600">Cycle</span>
                  </div>
                  <p className="text-2xl font-bold text-indigo-600">{signal.totalCycle}s</p>
                </div>
              </div>

              {/* Status Message */}
              <div
                className={`p-3 rounded text-sm font-semibold ${
                  signal.status === 'green'
                    ? 'bg-green-100 text-green-800'
                    : signal.status === 'red'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {signal.status === 'green' && '✓ Safe to cross - Walking time: ' + signal.greenTime + 's'}
                {signal.status === 'red' && '✕ Do not cross - Wait for next cycle'}
                {signal.status === 'yellow' &&
                  '⚠ Traffic changing - Prepare to stop or hurry safely across'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Optimization Info */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h3 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
          <Navigation2 size={20} />
          AI-Powered Optimization
        </h3>
        <ul className="space-y-2 text-sm text-purple-800">
          <li>
            <strong>Real-Time Adjustment:</strong> Signals adapt to current traffic flow to minimize
            wait times
          </li>
          <li>
            <strong>Pedestrian Safety:</strong> Countdown timers prevent unsafe rushing across streets
          </li>
          <li>
            <strong>Ministry Integration:</strong> Uses 3-year traffic data for predictive timing
          </li>
          <li>
            <strong>Peak Hour Management:</strong> Special algorithms for school hours (2:30-3:30 PM)
          </li>
        </ul>
      </div>

      {/* Safety Tips */}
      <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-lg p-4">
        <h4 className="font-bold text-indigo-900 mb-2">Safety Tips for Pedestrians</h4>
        <ul className="space-y-1 text-sm text-indigo-800">
          <li>• Always wait for the green signal before crossing</li>
          <li>• Use the countdown timer to plan your crossing</li>
          <li>• Look both ways even when signal shows green</li>
          <li>• Do not cross during yellow - wait for the next cycle</li>
          <li>• Help young students understand signal meanings</li>
        </ul>
      </div>
    </div>
  );
};

export default PedestrianCrossing;
