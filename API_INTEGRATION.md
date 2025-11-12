# 🔌 API Integration Guide

## Overview

This guide shows how to integrate real APIs with the Smart Traffic application.

---

## 1. Google Maps API

### Setup

1. **Create Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create new project "Smart Traffic"
   - Enable Maps JavaScript API
   - Enable Directions API
   - Create API Key (Restrict to web)

2. **Add Environment Variable**
   ```bash
   # .env
   VITE_GOOGLE_MAPS_KEY=AIzaSyD...
   ```

3. **Update RealTimeMap Component**
   ```typescript
   import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
   
   const RealTimeMap: React.FC<RealTimeMapProps> = ({ userLocation, schoolLocation }) => {
     const { isLoaded } = useJsApiLoader({
       id: 'google-map-script',
       googleMapsApiId: import.meta.env.VITE_GOOGLE_MAPS_KEY,
     });
   
     if (!isLoaded) return <div>Loading map...</div>;
   
     return (
       <GoogleMap
         mapContainerStyle={{ width: '100%', height: '400px' }}
         center={userLocation}
         zoom={15}
       >
         <Marker position={userLocation} title="Your Location" />
         <Marker position={schoolLocation} title="School" />
       </GoogleMap>
     );
   };
   ```

---

## 2. Ministry of Dubai Traffic API

### Setup

1. **Register for API Access**
   - Contact: Ministry of Infrastructure Development
   - Request traffic data access
   - Get API credentials

2. **Create API Service**
   ```typescript
   // src/services/ministryApi.ts
   
   const MINISTRY_API_URL = 'https://api.dubai.gov.ae/traffic/v1';
   const MINISTRY_API_KEY = import.meta.env.VITE_MINISTRY_API_KEY;
   
   export interface TrafficSignal {
     id: string;
     location: { lat: number; lng: number };
     greenTime: number;
     redTime: number;
     yellowTime: number;
     nextChange: number;
   }
   
   export async function getSignalTimings(
     lat: number,
     lng: number,
     radius: number = 1000
   ): Promise<TrafficSignal[]> {
     try {
       const response = await axios.get(`${MINISTRY_API_URL}/signals`, {
         params: { lat, lng, radius },
         headers: { Authorization: `Bearer ${MINISTRY_API_KEY}` },
       });
       return response.data;
     } catch (error) {
       console.error('Failed to fetch signal timings:', error);
       return [];
     }
   }
   
   export async function getTrafficFlow(
     lat: number,
     lng: number,
     hours: number = 24
   ): Promise<TrafficData[]> {
     try {
       const response = await axios.get(`${MINISTRY_API_URL}/traffic-flow`, {
         params: { lat, lng, hours },
         headers: { Authorization: `Bearer ${MINISTRY_API_KEY}` },
       });
       return response.data;
     } catch (error) {
       console.error('Failed to fetch traffic flow:', error);
       return [];
     }
   }
   ```

3. **Update TrafficSignalTimer Component**
   ```typescript
   useEffect(() => {
     const fetchSignals = async () => {
       const signals = await getSignalTimings(25.0396, 55.1219);
       setSignals(signals);
     };
     
     fetchSignals();
     const interval = setInterval(fetchSignals, 30000); // Update every 30s
     return () => clearInterval(interval);
   }, []);
   ```

---

## 3. Weather API (OpenWeatherMap)

### Setup

1. **Get API Key**
   - Register at [OpenWeatherMap](https://openweathermap.org/api)
   - Subscribe to Free or Pro plan
   - Get API key

2. **Add Environment Variable**
   ```bash
   # .env
   VITE_WEATHER_API_KEY=abc123...
   ```

3. **Create Weather Service**
   ```typescript
   // src/services/weatherApi.ts
   
   const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
   const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
   
   export interface WeatherData {
     temp: number;
     humidity: number;
     windSpeed: number;
     visibility: number;
     condition: string;
     description: string;
   }
   
   export async function getCurrentWeather(
     lat: number,
     lng: number
   ): Promise<WeatherData> {
     try {
       const response = await axios.get(`${WEATHER_API_URL}/weather`, {
         params: {
           lat,
           lon: lng,
           appid: WEATHER_API_KEY,
           units: 'metric',
         },
       });
       
       const data = response.data;
       return {
         temp: Math.round(data.main.temp),
         humidity: data.main.humidity,
         windSpeed: data.wind.speed,
         visibility: data.visibility / 1000, // Convert to km
         condition: data.weather[0].main,
         description: data.weather[0].description,
       };
     } catch (error) {
       console.error('Failed to fetch weather:', error);
       return {} as WeatherData;
     }
   }
   
   export async function getWeatherForecast(lat: number, lng: number) {
     try {
       const response = await axios.get(`${WEATHER_API_URL}/forecast`, {
         params: {
           lat,
           lon: lng,
           appid: WEATHER_API_KEY,
           units: 'metric',
         },
       });
       return response.data.list;
     } catch (error) {
       console.error('Failed to fetch forecast:', error);
       return [];
     }
   }
   ```

4. **Update TrafficInsights**
   ```typescript
   useEffect(() => {
     const fetchWeather = async () => {
       const weather = await getCurrentWeather(25.0396, 55.1219);
       setWeatherData(weather);
     };
     
     fetchWeather();
     const interval = setInterval(fetchWeather, 600000); // Update every 10min
     return () => clearInterval(interval);
   }, []);
   ```

---

## 4. Firebase Integration

### Setup for Notifications & Backend

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create project "smart-traffic"
   - Enable Realtime Database or Firestore
   - Enable Cloud Messaging

2. **Install Firebase**
   ```bash
   npm install firebase
   ```

3. **Initialize Firebase**
   ```typescript
   // src/services/firebase.ts
   
   import { initializeApp } from 'firebase/app';
   import { getDatabase } from 'firebase/database';
   import { getMessaging, getToken } from 'firebase/messaging';
   
   const firebaseConfig = {
     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
     databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
     appId: import.meta.env.VITE_FIREBASE_APP_ID,
   };
   
   const app = initializeApp(firebaseConfig);
   export const database = getDatabase(app);
   export const messaging = getMessaging(app);
   
   // Request notification permission
   export async function enableNotifications() {
     try {
       const token = await getToken(messaging, {
         vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
       });
       return token;
     } catch (err) {
       console.error('Failed to get notification token:', err);
       return null;
     }
   }
   ```

4. **Add Firebase Config to .env**
   ```bash
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_DATABASE_URL=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   VITE_FIREBASE_VAPID_KEY=...
   ```

---

## 5. Real-Time Data Integration

### Setup Zustand Store for API Data

```typescript
// src/store/trafficStore.ts (Enhanced)

import { create } from 'zustand';
import { subscribeToRealtimeUpdates } from '../services/realtimeApi';

interface TrafficStore {
  // ... existing state
  isLoading: boolean;
  error: string | null;
  syncWithApis: () => Promise<void>;
}

export const useTrafficStore = create<TrafficStore>((set) => ({
  // ... existing
  isLoading: false,
  error: null,
  
  syncWithApis: async () => {
    set({ isLoading: true });
    try {
      // Fetch data from all APIs
      const [signals, weather, traffic] = await Promise.all([
        getSignalTimings(25.0396, 55.1219),
        getCurrentWeather(25.0396, 55.1219),
        getTrafficFlow(25.0396, 55.1219),
      ]);
      
      set({ 
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({ 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  },
}));
```

---

## 6. Environment Variables

### Complete .env Template

```bash
# Google Maps
VITE_GOOGLE_MAPS_KEY=AIzaSy...

# Weather API
VITE_WEATHER_API_KEY=abc123...

# Ministry of Dubai
VITE_MINISTRY_API_KEY=xyz789...
VITE_MINISTRY_API_URL=https://api.dubai.gov.ae/traffic/v1

# Firebase
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_DATABASE_URL=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_VAPID_KEY=...

# App Config
VITE_APP_NAME=Smart Traffic
VITE_APP_URL=http://localhost:3000
```

---

## 7. Error Handling

### Global Error Handler

```typescript
// src/services/errorHandler.ts

import { toast } from 'react-toastify';

export function handleApiError(error: unknown, context: string) {
  console.error(`Error in ${context}:`, error);
  
  const message = error instanceof Error 
    ? error.message 
    : 'An unexpected error occurred';
  
  toast.error(`${context}: ${message}`, {
    position: 'bottom-right',
    autoClose: 5000,
  });
}

// Usage
try {
  const signals = await getSignalTimings(lat, lng);
} catch (error) {
  handleApiError(error, 'Traffic Signals');
}
```

---

## 8. Rate Limiting & Caching

### Setup API Client with Caching

```typescript
// src/services/apiClient.ts

import axios from 'axios';

const apiClient = axios.create({
  timeout: 10000,
});

// Add cache
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 60000; // 1 minute

apiClient.interceptors.response.use(
  (response) => {
    cache.set(response.config.url || '', {
      data: response.data,
      timestamp: Date.now(),
    });
    return response;
  },
  (error) => {
    const url = error.config?.url;
    const cached = cache.get(url);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return Promise.resolve({ data: cached.data });
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## Testing APIs Locally

### Using Thunder Client or Postman

```
GET /api/signals?lat=25.0396&lng=55.1219
Authorization: Bearer YOUR_API_KEY
```

---

## Production Deployment

### Vercel/Netlify Environment Variables

1. Go to project settings
2. Add environment variables
3. Deploy

```bash
vercel env add VITE_GOOGLE_MAPS_KEY
vercel env add VITE_WEATHER_API_KEY
# ... etc
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS errors | Enable CORS on backend/API |
| API key invalid | Check .env file path & value |
| Rate limit exceeded | Implement caching & throttling |
| No data returned | Check coordinates & API quota |
| Slow response | Optimize requests & add caching |

---

**Next**: Start the app with `npm run dev` and test API integrations!
