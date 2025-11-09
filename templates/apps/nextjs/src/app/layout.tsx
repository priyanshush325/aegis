import type { Metadata } from 'next';
import '@{{orgName}}/ui/styles.css';

export const metadata: Metadata = {
  title: '{{appName}}',
  description: 'Built with Aegis monorepo',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.Node;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
