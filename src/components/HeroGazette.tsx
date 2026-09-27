import React from 'react';
import { ArrowUpRight, Search, BookOpen, PenTool, Sparkles } from 'lucide-react';
import { BlogPost } from '../types/blog';

interface HeroGazetteProps {
  leadPost?: BlogPost;
  onReadPost: (post: BlogPost) => void;
  onWritePost: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  postCount: number;
}

export const HeroGazette: React.FC<HeroGazetteProps> = ({
  leadPost,
  onReadPost,
  onWritePost,
  searchQuery,
  onSearchChange,
  postCount,
}) => {
  // Format current date in human editorial format
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <section className="border-b border-stone-200 dark:border-stone-800 bg-[#FBF9F5] dark:bg-[#151413] transition-colors">
      {/* Editorial Masthead Ribbon */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-4 border-b border-stone-200/80 dark:border-stone-800/80 text-xs text-stone-500 dark:text-stone-400 font-sans flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-serif font-medium text-stone-900 dark:text-stone-200">
            {todayFormatted}
          </span>
          <span aria-hidden="true">·</span>
          <span>Vol. VIII, Ed. 42</span>
          <span aria-hidden="true">·</span>
          <span>Lahore &amp; Global Edition</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="italic font-serif text-stone-600 dark:text-stone-300">
            "قلم کی حرمت اور فکر کی وسعت" — The Sanctuary for Thoughtful Writing
          </span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span className="font-mono tabular-nums hidden sm:inline">{postCount} Stories Published</span>
        </div>
      </div>

      {/* Main Editorial Hero Showcase */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Editorial Headline & Brief */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-sans text-amber-800 dark:text-amber-400 font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lead Editorial Dispatch</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-500 dark:text-stone-400">Curated Read</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold tracking-tight text-stone-900 dark:text-stone-50 leading-[1.15] text-balance">
              {leadPost ? leadPost.title : 'Where Deep Thoughts Find Their Printed Sanctum'}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-stone-600 dark:text-stone-300 font-sans leading-relaxed line-clamp-3">
              {leadPost
                ? leadPost.subtitle
                : 'A timeless publication platform built for writers, essayists, and independent thinkers. Compose essays, share ideas, and engage curious readers.'}
            </p>

            {/* Author byline & metadata (Clean Zero-Pill) */}
            {leadPost && (
              <div className="mt-6 flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400 font-sans">
                <img
                  src={leadPost.author.avatar}
                  alt={leadPost.author.name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover border border-stone-200 dark:border-stone-700"
                />
                <span className="font-medium text-stone-900 dark:text-stone-200">
                  {leadPost.author.name}
                </span>
                <span aria-hidden="true">·</span>
                <span>{leadPost.publishedAt}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{leadPost.readingTimeMinutes} min read</span>
                <span aria-hidden="true">·</span>
                <span>{leadPost.category}</span>
              </div>
            )}

            {/* Hero Interactive Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {leadPost ? (
                <button
                  onClick={() => onReadPost(leadPost)}
                  className="px-5 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-medium rounded-lg hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read Lead Story</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              ) : null}

              <button
                onClick={onWritePost}
                className="px-5 py-2.5 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <PenTool className="w-4 h-4" />
                <span>Publish Your Story</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Cover Visual with resilient fallback */}
          <div className="lg:col-span-5">
            {leadPost ? (
              <div
                onClick={() => onReadPost(leadPost)}
                className="group relative aspect-16/10 sm:aspect-16/10 rounded-xl overflow-hidden shadow-lg border border-stone-200 dark:border-stone-800 cursor-pointer bg-stone-100 dark:bg-stone-900"
              >
                <img
                  src={leadPost.coverImage}
                  alt={leadPost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[11px] uppercase tracking-wider text-amber-200 font-sans">
                    {leadPost.category}
                  </span>
                  <h3 className="font-serif text-lg font-medium leading-snug line-clamp-2 mt-0.5">
                    {leadPost.title}
                  </h3>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Quick Search & Explore Bar */}
        <div className="mt-8 pt-6 border-t border-stone-200/60 dark:border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search essays, tags, authors, or topics..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-700/80 rounded-lg text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-1 focus:ring-stone-400 dark:focus:ring-stone-500 transition-shadow"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400 font-sans self-start sm:self-center">
            <span>Explore tags:</span>
            <button
              onClick={() => onSearchChange('Writing')}
              className="hover:text-stone-900 dark:hover:text-stone-100 underline decoration-stone-300 dark:decoration-stone-700 cursor-pointer"
            >
              #Writing
            </button>
            <button
              onClick={() => onSearchChange('AI')}
              className="hover:text-stone-900 dark:hover:text-stone-100 underline decoration-stone-300 dark:decoration-stone-700 cursor-pointer"
            >
              #AI
            </button>
            <button
              onClick={() => onSearchChange('Architecture')}
              className="hover:text-stone-900 dark:hover:text-stone-100 underline decoration-stone-300 dark:decoration-stone-700 cursor-pointer"
            >
              #Architecture
            </button>
            <button
              onClick={() => onSearchChange('اردو')}
              className="hover:text-stone-900 dark:hover:text-stone-100 underline decoration-stone-300 dark:decoration-stone-700 cursor-pointer font-serif"
            >
              #اردو
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
