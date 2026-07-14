'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const BookshelfScene = dynamic(() => import('../three/BookshelfScene.jsx'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] items-center justify-center text-sage-400">Opening the archive…</div>
  ),
});

export default function BookShelf({ years }) {
  const router = useRouter();

  if (!years.length) {
    return <p className="text-center text-sage-500">No volumes have been added to the archive yet.</p>;
  }

  return (
    <div className="rounded-2xl bg-gradient-to-b from-sand/50 to-transparent p-4 sm:p-6">
      <div className="h-[420px] overflow-hidden rounded-xl2 shadow-book sm:h-[480px]">
        <BookshelfScene years={years} onOpen={(year) => router.push(`/scholars/${year}`)} />
      </div>

      <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs font-medium uppercase tracking-[0.2em] text-sage-500">
        {years.map((year) => (
          <li key={year}>
            <Link href={`/scholars/${year}`} className="hover:text-sage-800">
              {year}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
