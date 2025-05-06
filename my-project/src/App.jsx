import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import Login  from './pages/Login';
import  Register  from './pages/Register';
import Dashboard  from './pages/Admin/Dashboard';
import {HomePage } from './pages/User/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import NotAuthorizedPage from './pages/NotAuthorizedPage';
import DashboardLayout from './components/Admin/DashboardLayout';

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/booknest" element={<HomePage />} />

      <Route element={<DashboardLayout />}>
        <Route path="/booknest" element={<HomePage />} />
       
      </Route>

      {/* Not Found 404 */}
      <Route path="*" element={<NotFoundPage />} />
      {/* Not Authorized 401 */}
      <Route path="/not-authorized" element={<NotAuthorizedPage />} />

    </Routes>
  </Router>
  )
}

export default App
