import React from 'react';
import { PenSquare, Moon, Sun, Bookmark, DollarSign } from 'lucide-react';
import { ViewMode } from '../types/blog';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  savedCount: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAdManager: () => void;
  onOpenNewStory: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  selectedCategory,
  onSelectCategory,
  savedCount,
  darkMode,
  onToggleDarkMode,
  onOpenAdManager,
  onOpenNewStory,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 dark:bg-[#121110]/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element Brand wordmark */}
        <button
          onClick={() => {
            onSelectCategory('All Stories');
            onNavigate('feed');
          }}
          className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-100 hover:opacity-85 transition-opacity cursor-pointer text-left"
        >
          Sahifa Journal
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-sans font-medium text-stone-600 dark:text-stone-300">
          <button
            onClick={() => {
              onSelectCategory('All Stories');
              onNavigate('feed');
            }}
            className={`hover:text-stone-950 dark:hover:text-stone-100 transition-colors cursor-pointer py-1 relative ${
              currentView === 'feed' && selectedCategory === 'All Stories'
                ? 'text-stone-950 dark:text-stone-100 border-b-2 border-stone-900 dark:border-stone-100'
                : ''
            }`}
          >
            All Stories
          </button>
          <button
            onClick={() => {
              onSelectCategory('Technology & AI');
              onNavigate('feed');
            }}
            className={`hover:text-stone-950 dark:hover:text-stone-100 transition-colors cursor-pointer py-1 relative ${
              selectedCategory === 'Technology & AI'
                ? 'text-stone-950 dark:text-stone-100 border-b-2 border-stone-900 dark:border-stone-100'
                : ''
            }`}
          >
            Technology
          </button>
          <button
            onClick={() => {
              onSelectCategory('Design & Architecture');
              onNavigate('feed');
            }}
            className={`hover:text-stone-950 dark:hover:text-stone-100 transition-colors cursor-pointer py-1 relative ${
              selectedCategory === 'Design & Architecture'
                ? 'text-stone-950 dark:text-stone-100 border-b-2 border-stone-900 dark:border-stone-100'
                : ''
            }`}
          >
            Design
          </button>
          <button
            onClick={() => {
              onSelectCategory('Urdu Adab & Poetry');
              onNavigate('feed');
            }}
            className={`hover:text-stone-950 dark:hover:text-stone-100 transition-colors cursor-pointer py-1 relative font-serif ${
              selectedCategory === 'Urdu Adab & Poetry'
                ? 'text-stone-950 dark:text-stone-100 border-b-2 border-stone-900 dark:border-stone-100'
                : ''
            }`}
          >
            اردو ادب
          </button>
          <button
            onClick={() => onNavigate('bookmarks')}
            className={`hover:text-stone-950 dark:hover:text-stone-100 transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
              currentView === 'bookmarks'
                ? 'text-stone-950 dark:text-stone-100 border-b-2 border-stone-900 dark:border-stone-100'
                : ''
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Reading List</span>
            {savedCount > 0 && (
              <span className="text-xs font-mono font-normal opacity-70">({savedCount})</span>
            )}
          </button>
          <button
            onClick={onOpenAdManager}
            className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors cursor-pointer py-1 flex items-center gap-1 text-stone-500 dark:text-stone-400"
            title="Configure Ad Slots and Monetization"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Ad Slots</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onToggleDarkMode}
            aria-label="Toggle visual theme"
            className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            title={darkMode ? 'Switch to warm archival paper' : 'Switch to dark obsidian'}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenNewStory}
            className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-sans font-medium text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-lg hover:bg-stone-800 dark:hover:bg-stone-200 transition-all shadow-xs cursor-pointer whitespace-nowrap shrink-0"
          >
            <PenSquare className="w-4 h-4" />
            <span>Write Story</span>
          </button>
        </div>
      </div>
    </header>
  );
};
