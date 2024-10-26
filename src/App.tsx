import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { FoodLogging } from './pages/FoodLogging';
import { Volunteer } from './pages/Volunteer';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="food-logging" element={<FoodLogging />} />
          <Route path="volunteer" element={<Volunteer />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;