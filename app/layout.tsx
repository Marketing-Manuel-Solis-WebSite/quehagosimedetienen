// app/layout.tsx (ROOT LAYOUT)
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Como Puedo Arreglar',
  description: 'Oficinas Legales de Manuel Solis',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}