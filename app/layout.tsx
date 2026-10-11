import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#080A12',
};

export const metadata: Metadata = {
  title: 'Namandeep Tripathi — Senior Frontend Engineer & Creative Technologist',
  description:
    'Portfolio of Namandeep Tripathi. Engineering cinematic digital interfaces, high-throughput systems, and selective 3D WebGL experiences.',
  keywords: [
    'Frontend Architect',
    'Creative Technologist',
    'Three.js',
    'WebGL',
    'Next.js',
    'React',
    'TypeScript',
    'Cinematic UI',
  ],
  authors: [{ name: 'Namandeep Tripathi' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#080A12] text-[#F1F2FA] antialiased selection:bg-[#8065FF] selection:text-white">
        {children}
      </body>
    </html>
  );
}
