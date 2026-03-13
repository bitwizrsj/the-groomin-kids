import Link from 'next/link';
import { School } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-2 rounded-lg">
                <School className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Sunshine</h3>
                <p className="text-sm text-slate-300">Preschool</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              A happy place for little learners to grow, play, and explore!
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#programs" className="hover:text-white transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Programs</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>Play Group</li>
              <li>Nursery</li>
              <li>Kindergarten</li>
              <li>Prep</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>123 Sunshine Street</li>
              <li>Happy Town, HT 12345</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@sunshinepreschool.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; 2024 Sunshine Preschool. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

