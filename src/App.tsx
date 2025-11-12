import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import LiveMap from './pages/LiveMap';
import TrafficInsights from './pages/TrafficInsights';
import StudentPickup from './pages/StudentPickup';
import ParentProfile from './pages/ParentProfile';
import PedestrianCrossing from './pages/PedestrianCrossing';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <main className="pt-16 pb-20 px-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tabs/live-map" element={<LiveMap />} />
            <Route path="/tabs/traffic-insights" element={<TrafficInsights />} />
            <Route path="/tabs/student-pickup" element={<StudentPickup />} />
            <Route path="/tabs/parent-profile" element={<ParentProfile />} />
            <Route path="/tabs/pedestrian-crossing" element={<PedestrianCrossing />} />
          </Routes>
        </main>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
