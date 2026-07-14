import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import PageTransition from './PageTransition.jsx';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}
