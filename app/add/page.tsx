'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AddRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/add');
  }, [router]);

  return null;
}
