'use client';

import dynamic from 'next/dynamic';

const CreatePosterView = dynamic(() => import('../../components/create/CreatePosterView.jsx'), {
  ssr: false,
  loading: () => <div className="py-24 text-center text-sage-500">Loading…</div>,
});

export default function CreatePosterPage() {
  return <CreatePosterView />;
}
