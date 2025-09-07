import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nitish.fun'),
  title: {
    default: "Nitish Kumar - Full Stack Developer, Tech Innovator & Hobbiest",
    template: "%s | Nitish's Portfolio"
  },
  description:
    "Full Stack Developer specializing in modern web technologies. Explore my projects, technical blogs, and insights into React, Next.js, Node.js, and cutting-edge development practices.",
  keywords: [
    "Nitish Kumar",
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Web Development",
    "Software Engineer",
    "Portfolio",
    "Tech Blog",
    "Programming",
    "Frontend Developer",
    "Backend Developer",
    "UI/UX",
    "Modern Web Development",
    "API Development",
    "Database Design",
    "Cloud Computing"
  ],
  authors: [{ 
    name: "Nitish Kumar",
    url: "https://www.nitish.fun"
  }],
  creator: "Nitish Kumar",
  publisher: "Nitish Kumar",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.nitish.fun',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.nitish.fun',
    siteName: "Nitish's Portfolio",
    title: "Nitish Kumar - Full Stack Developer & Tech Innovator",
    description:
      "Full Stack Developer specializing in modern web technologies. Explore my projects, technical blogs, and insights into React, Next.js, Node.js, and cutting-edge development practices.",
    images: [
      {
        url: 'https://www.nitish.fun/favicon.png',
        width: 1200,
        height: 630,
        alt: "Nitish Kumar's Portfolio Logo",
        type: 'image/png',
      },
      {
        url: 'https://www.nitish.fun/favicon.png',
        width: 800,
        height: 600,
        alt: "Nitish Kumar's Portfolio",
        type: 'image/png',
      }
    ],
  },
  category: 'technology',
  classification: 'Portfolio Website',
  other: {
    "linkedin:owner": "nk2552003",
    "revisit-after": "7 days",
    "distribution": "global",
    "rating": "general",
    "language": "en",
    "geo.region": "IN-DL",
    "geo.placename": "Delhi",
    "geo.position": "28.7041;77.1025",
    "ICBM": "28.7041, 77.1025",
  },
};


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Nitish Kumar",
  "url": "https://www.nitish.fun",
  "image": "https://www.nitish.fun/favicon.png",
  "sameAs": [
    "https://github.com/nk2552003",
    "https://linkedin.com/in/nk2552003",
    "https://dev.to/nk2552003",
    "https://codepen.io/rlaqxvbr-the-bashful",
    "https://www.instagram.com/natur_hacks/",
    "https://www.instagram.com/nitish.2432/",
    "https://www.deviantart.com/sidkr222003",
    "https://youpic.com/nitish"
  ],
  "jobTitle": "Full Stack Developer Student",
  "worksFor": {
    "@type": "Organization",
    "name": "Freelancer"
  },
  "alumniOf": {
    "@type": "Organization",
    "name": "Veer Madho Singh Bhandari Uttarakhand Technical University"
  },
  "knowsAbout": [
    "Web Development",
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Full Stack Development"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Delhi",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.png" type="image/png" sizes="any" />
        <link rel="icon" href="/favicon.png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Additional meta tags for better SEO */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Nitish's Portfolio" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body className={inter.className}>
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#031412] focus:text-white focus:rounded"
        >
          Skip to main content
        </a>
        
        {/* Main content wrapper */}
        <div id="main-content">
          {children}
        </div>
        
        {/* No-script fallback */}
        <noscript>
          <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#031412',color:"#ffffff" }}>
            <p>This website works best with JavaScript enabled.</p>
          </div>
        </noscript>
      </body>
    </html>
  );
}
