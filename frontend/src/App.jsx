import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import RequireAuth from './components/admin/RequireAuth.jsx';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import Scholars from './pages/Scholars.jsx';
import ScholarYearDetail from './pages/ScholarYearDetail.jsx';
import ScholarDetail from './pages/ScholarDetail.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminScholarNew from './pages/admin/AdminScholarNew.jsx';
import AdminScholarEdit from './pages/admin/AdminScholarEdit.jsx';

export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scholars" element={<Scholars />} />
          <Route path="/scholars/:year" element={<ScholarYearDetail />} />
          <Route path="/scholars/:year/:id" element={<ScholarDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/scholars/new"
            element={
              <RequireAuth>
                <AdminScholarNew />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/scholars/:id/edit"
            element={
              <RequireAuth>
                <AdminScholarEdit />
              </RequireAuth>
            }
          />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}
