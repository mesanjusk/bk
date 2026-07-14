import { Playfair_Display, Inter } from 'next/font/google';
import { AuthProvider } from '../context/AuthContext.jsx';
import Layout from '../components/layout/Layout.jsx';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Badhte Kadam',
  description:
    'Badhte Kadam supports scholars and communities through education, healthcare and livelihood programs.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <AuthProvider>
          <Layout>{children}</Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
