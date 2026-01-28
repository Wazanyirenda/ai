'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const COOKIE_NAME = 'fastcuts_ref';

export function AffiliateTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('ref');
    if (!code) return;

    const expires = new Date();
    expires.setDate(expires.getDate() + 30);
    document.cookie = `${COOKIE_NAME}=${code}; path=/; expires=${expires.toUTCString()}`;

    void fetch('/api/affiliate/track-click', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code })
    });
  }, [searchParams]);

  return null;
}
