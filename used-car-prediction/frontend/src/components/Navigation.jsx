import React from 'react';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="navigation">
      <Link href="/">Home</Link>
      <Link href="/predict">Predict</Link>
      <Link href="/analytics">Analytics</Link>
      <Link href="/history">History</Link>
    </nav>
  );
}
