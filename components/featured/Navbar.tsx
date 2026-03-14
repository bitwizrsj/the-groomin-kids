import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
      {/* Logo — matches the illustrated school icon in Image 1 */}
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 relative">
          {/* Simple SVG school building to match design 1 */}
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="48" height="48" rx="8" fill="#F59E0B"/>
            <rect x="8" y="20" width="32" height="20" fill="#EF4444"/>
            <rect x="14" y="26" width="8" height="8" fill="#FCD34D"/>
            <rect x="26" y="26" width="8" height="8" fill="#FCD34D"/>
            <polygon points="4,22 24,8 44,22" fill="#DC2626"/>
            <rect x="20" y="14" width="8" height="6" fill="#93C5FD"/>
            <rect x="20" y="38" width="8" height="6" fill="#7C3AED"/>
            <circle cx="24" cy="18" r="2" fill="#FCD34D"/>
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 leading-none">Grooming Kids</h1>
          <p className="text-sm text-slate-600">Preschool</p>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-6">
        {['Home', 'About Us', 'Programs', 'Admissions', 'Gallery', 'Contact Us'].map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase().replace(' ', '-')}`}
            className="text-slate-700 hover:text-slate-900 font-medium transition-colors text-sm"
          >
            {item}
          </Link>
        ))}
        <Link href="/admin">
          <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6 py-2 shadow-md font-semibold">
            Enroll Now ›
          </Button>
        </Link>
      </div>
    </nav>
  );
}