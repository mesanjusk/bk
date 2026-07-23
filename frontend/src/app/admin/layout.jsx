import { Roboto } from 'next/font/google';
import AdminShell from '../../components/admin/AdminShell.jsx';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export default function AdminLayout({ children }) {
  return (
    <div className={roboto.variable}>
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
