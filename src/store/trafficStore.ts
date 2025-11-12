import { create } from 'zustand';

interface Bus {
  id: number;
  number: string;
  driver: string;
  location: { lat: number; lng: number };
  status: 'on-route' | 'at-school' | 'scheduled';
  passengers: number;
  capacity: number;
}

interface TrafficData {
  timestamp: Date;
  congestion: 'low' | 'moderate' | 'high';
  vehicles: number;
  avgSpeed: number;
}

interface TrafficStore {
  buses: Bus[];
  trafficData: TrafficData[];
  userLocation: { lat: number; lng: number } | null;
  setBuses: (buses: Bus[]) => void;
  setTrafficData: (data: TrafficData[]) => void;
  setUserLocation: (location: { lat: number; lng: number }) => void;
}

export const useTrafficStore = create<TrafficStore>((set) => ({
  buses: [],
  trafficData: [],
  userLocation: null,
  setBuses: (buses) => set({ buses }),
  setTrafficData: (trafficData) => set({ trafficData }),
  setUserLocation: (userLocation) => set({ userLocation }),
}));
