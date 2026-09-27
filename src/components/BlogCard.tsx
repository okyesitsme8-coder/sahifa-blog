import React from 'react';
import { Bookmark, Heart, MoreHorizontal, Edit3, Trash2 } from 'lucide-react';
import { BlogPost } from '../types/blog';

interface BlogCardProps {
  post: BlogPost;
  onRead: (post: BlogPost) => void;
  onEdit?: (post: BlogPost) => void;
  onDelete?: (id: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onClap: (id: string) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  post,
  onRead,
  onEdit,
  onDelete,
  isBookmarked,
  onToggleBookmark,
  onClap,
}) => {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <article className="group flex flex-col justify-between border-b border-stone-200 dark:border-stone-800 pb-8 transition-colors">
      <div>
        {/* Cover Thumbnail with safe fallback */}
        <div
          onClick={() => onRead(post)}
          className="relative aspect-16/10 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 mb-4 cursor-pointer"
        >
          <img
            src={post.coverImage}
            alt={post.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
          />

          {post.status === 'draft' && (
            <div className="absolute top-2 left-2 bg-stone-900/90 text-amber-200 text-[11px] font-sans px-2 py-0.5 rounded uppercase tracking-wider">
              Draft
            </div>
          )}
        </div>

        {/* Zero-Pill Unboxed Metadata */}
        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 font-sans mb-2">
          <span className="font-medium text-stone-700 dark:text-stone-300">
            {post.category}
          </span>
          <span aria-hidden="true">·</span>
          <span>{post.publishedAt}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">{post.readingTimeMinutes} min read</span>
        </div>

        {/* Title */}
        <h2
          onClick={() => onRead(post)}
          className={`font-serif text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-900 dark:group-hover:text-amber-200 transition-colors cursor-pointer leading-snug line-clamp-2 ${
            post.isRtl ? 'text-right' : 'text-left'
          }`}
          dir={post.isRtl ? 'rtl' : 'ltr'}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        <p
          className={`text-sm text-stone-600 dark:text-stone-400 mt-2 line-clamp-2 font-sans leading-relaxed ${
            post.isRtl ? 'text-right font-serif' : 'text-left'
          }`}
          dir={post.isRtl ? 'rtl' : 'ltr'}
        >
          {post.subtitle}
        </p>
      </div>

      {/* Card Footer: Author + Reader Interactions */}
      <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800/60 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            referrerPolicy="no-referrer"
            className="w-6 h-6 rounded-full object-cover border border-stone-200 dark:border-stone-700"
          />
          <span className="text-xs font-medium text-stone-800 dark:text-stone-200">
            {post.author.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Like / Clap button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClap(post.id);
            }}
            className="flex items-center gap-1 text-xs text-stone-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-1.5 rounded cursor-pointer"
            title="Applaud story"
          >
            <Heart className="w-3.5 h-3.5" />
            <span className="font-mono tabular-nums">{post.claps}</span>
          </button>

          {/* Bookmark button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(post.id);
            }}
            className={`p-1.5 text-xs transition-colors rounded cursor-pointer ${
              isBookmarked
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
            }`}
            title={isBookmarked ? 'Remove from reading list' : 'Save for later'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          {/* Post options menu (edit/delete) */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded cursor-pointer"
              title="Post actions"
            >
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>

            {showMenu && (
              <div
                className="absolute right-0 bottom-full mb-1 w-32 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded shadow-lg py-1 z-20 text-xs font-sans"
                onClick={(e) => e.stopPropagation()}
              >
                {onEdit && (
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onEdit(post);
                    }}
                    className="w-full px-3 py-1.5 text-left text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-2 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit Post</span>
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onDelete(post.id);
                    }}
                    className="w-full px-3 py-1.5 text-left text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
