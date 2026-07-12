import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import RequireAuth from './components/admin/RequireAuth.jsx';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import Scholars from './pages/Scholars.jsx';
import ScholarYearDetail from './pages/ScholarYearDetail.jsx';
import ScholarDetail from './pages/ScholarDetail.jsx';
import Census from './pages/Census.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';

// Pulls in Konva, which is heavy — keep it out of the main bundle.
const CreatePoster = lazy(() => import('./pages/CreatePoster.jsx'));
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminScholarNew from './pages/admin/AdminScholarNew.jsx';
import AdminScholarEdit from './pages/admin/AdminScholarEdit.jsx';
import AdminSettings from './pages/admin/AdminSettings.jsx';
import AdminStoriesDashboard from './pages/admin/AdminStoriesDashboard.jsx';
import AdminStoryNew from './pages/admin/AdminStoryNew.jsx';
import AdminStoryEdit from './pages/admin/AdminStoryEdit.jsx';

export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scholars" element={<Scholars />} />
          <Route path="/scholars/:year" element={<ScholarYearDetail />} />
          <Route path="/scholars/:year/:id" element={<ScholarDetail />} />
          <Route path="/census" element={<Census />} />
          <Route
            path="/create"
            element={
              <Suspense fallback={<div className="py-24 text-center text-sage-500">Loading…</div>}>
                <CreatePoster />
              </Suspense>
            }
          />
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
          <Route
            path="/admin/settings"
            element={
              <RequireAuth>
                <AdminSettings />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/stories"
            element={
              <RequireAuth>
                <AdminStoriesDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/stories/new"
            element={
              <RequireAuth>
                <AdminStoryNew />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/stories/:id/edit"
            element={
              <RequireAuth>
                <AdminStoryEdit />
              </RequireAuth>
            }
          />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}
