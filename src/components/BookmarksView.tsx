import React from 'react';
import { Bookmark, ArrowLeft, Trash2, ArrowUpRight } from 'lucide-react';
import { BlogPost } from '../types/blog';

interface BookmarksViewProps {
  posts: BlogPost[];
  onRead: (post: BlogPost) => void;
  onRemoveBookmark: (id: string) => void;
  onBack: () => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  posts,
  onRead,
  onRemoveBookmark,
  onBack,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 min-h-[60vh]">
      <div className="flex items-center justify-between pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Journal</span>
          </button>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2.5">
            <Bookmark className="w-6 h-6 text-amber-600" />
            <span>Your Reading List</span>
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Articles saved for offline reflection and slow reading.
          </p>
        </div>
        <span className="font-mono text-xs text-stone-500 tabular-nums">
          {posts.length} {posts.length === 1 ? 'Story' : 'Stories'} Saved
        </span>
      </div>

      {posts.length === 0 ? (
        <div className="py-20 text-center">
          <Bookmark className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto mb-3" />
          <p className="text-stone-600 dark:text-stone-400 font-serif text-lg">
            Your reading list is currently empty.
          </p>
          <p className="text-xs text-stone-400 dark:text-stone-500 mt-1 max-w-sm mx-auto">
            Click the bookmark icon on any story in the feed to save it for later.
          </p>
          <button
            onClick={onBack}
            className="mt-6 px-4 py-2 text-xs font-medium bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg hover:opacity-90 cursor-pointer"
          >
            Explore Stories
          </button>
        </div>
      ) : (
        <div className="divide-y divide-stone-200 dark:divide-stone-800">
          {posts.map((post) => (
            <div
              key={post.id}
              className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              <div
                onClick={() => onRead(post)}
                className="cursor-pointer flex-1 max-w-xl"
              >
                <div className="text-xs text-stone-500 dark:text-stone-400 font-sans mb-1">
                  {post.category} · {post.readingTimeMinutes} min read
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-200 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 line-clamp-1">
                  {post.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => onRead(post)}
                  className="px-3.5 py-1.5 text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Read</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onRemoveBookmark(post.id)}
                  className="p-1.5 text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 rounded transition-colors cursor-pointer"
                  title="Remove from list"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
