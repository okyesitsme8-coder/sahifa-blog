import React from 'react';
import { Mail, Sparkles, Feather } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenAdManager: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenAdManager }) => {
  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 bg-[#F7F4EE] dark:bg-[#0E0D0C] text-stone-700 dark:text-stone-300 font-sans transition-colors pt-14 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-stone-200/80 dark:border-stone-800/80">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                Sahifa Journal
              </span>
              <span className="font-serif text-sm italic text-amber-800 dark:text-amber-400">
                صحيفة
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed max-w-sm">
              An independent sanctuary for long-form essays, creative philosophy, architectural inquiries, and literary art. Published with meticulous typography and unhurried cadence.
            </p>
            <div className="pt-2 text-xs text-stone-500 font-mono">
              Designed for authors · Ad monetization enabled
            </div>
          </div>

          {/* Curated Desks */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <h5 className="font-serif text-sm font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-3">
              Editorial Desks
            </h5>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('Essays & Culture')}
                  className="hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
                >
                  Essays &amp; Culture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Technology & AI')}
                  className="hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
                >
                  Technology &amp; Ethics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Design & Architecture')}
                  className="hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
                >
                  Design &amp; Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Urdu Adab & Poetry')}
                  className="hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer font-serif text-sm"
                >
                  اردو ادب و شاعری
                </button>
              </li>
            </ul>
          </div>

          {/* Reader Dispatch / Newsletter */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <h5 className="font-serif text-sm font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-2">
              The Sunday Gazette
            </h5>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              Curated Sunday morning essays delivered straight to your inbox. No spam, only deliberate writing.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing to Sahifa Journal Sunday Gazette!');
              }}
              className="flex gap-2 pt-1"
            >
              <input
                type="email"
                required
                placeholder="your.email@domain.com"
                className="flex-1 text-xs bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded px-3 py-2 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded font-medium hover:opacity-90 transition-opacity cursor-pointer shrink-0"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Quiet Copyright & Disclosures */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-sans gap-3">
          <p>© {new Date().getFullYear()} Sahifa Journal. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdManager}
              className="hover:text-stone-900 dark:hover:text-stone-200 cursor-pointer underline"
            >
              Ad Spaces &amp; Sponsorship Spec
            </button>
            <span aria-hidden="true">·</span>
            <span>Ethical Typography</span>
            <span aria-hidden="true">·</span>
            <span>RSS Syndication</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
