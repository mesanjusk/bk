'use client';

import { useRouter } from 'next/navigation';
import AdminPageHeader from '../../../../components/admin/ui/AdminPageHeader.jsx';
import QuickAddScholarForm from '../../../../components/admin/QuickAddScholarForm.jsx';

export default function AdminScholarNewPage() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-2xl">
      <AdminPageHeader title="Add Scholar" backTo="/admin" backLabel="All Scholars" />
      <QuickAddScholarForm onDone={() => router.push('/admin')} />
    </div>
  );
}
