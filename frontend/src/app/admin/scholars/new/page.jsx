'use client';

import { useRouter } from 'next/navigation';
import Section from '../../../../components/ui/Section.jsx';
import QuickAddScholarForm from '../../../../components/admin/QuickAddScholarForm.jsx';
import RequireAuth from '../../../../components/admin/RequireAuth.jsx';

function AdminScholarNew() {
  const router = useRouter();

  return (
    <Section maxWidth="max-w-2xl">
      <h1 className="text-3xl font-semibold text-sage-900">Add Scholar</h1>
      <div className="mt-10">
        <QuickAddScholarForm onDone={() => router.push('/admin')} />
      </div>
    </Section>
  );
}

export default function AdminScholarNewPage() {
  return (
    <RequireAuth>
      <AdminScholarNew />
    </RequireAuth>
  );
}
