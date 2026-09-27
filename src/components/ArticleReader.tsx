import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Heart,
  Bookmark,
  Share2,
  MessageSquare,
  Eye,
  Type,
  Check,
  Send,
  Sparkles,
} from 'lucide-react';
import { BlogPost, BlogComment, AdSettings } from '../types/blog';
import { AdSlot } from './AdSlot';

interface ArticleReaderProps {
  post: BlogPost;
  onBack: () => void;
  onClap: (id: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onAddComment: (postId: string, comment: BlogComment) => void;
  relatedPosts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  adSettings?: AdSettings;
  onOpenAdManager?: () => void;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  post,
  onBack,
  onClap,
  isBookmarked,
  onToggleBookmark,
  onAddComment,
  relatedPosts,
  onSelectPost,
  adSettings,
  onOpenAdManager,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');
  const [useSerifFont, setUseSerifFont] = useState(true);
  const [copiedShare, setCopiedShare] = useState(false);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);

  // Track reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: BlogComment = {
      id: `comment-${Date.now()}`,
      authorName: commentName.trim() || 'Thoughtful Reader',
      createdAt: 'Just now',
      content: commentText.trim(),
      likes: 0,
    };

    onAddComment(post.id, newComment);
    setCommentText('');
  };

  // Split content paragraphs to inject the In-Article ad slot naturally
  const paragraphs = post.content.split('\n\n');
  const midPoint = Math.max(1, Math.floor(paragraphs.length / 2));

  const fontSizeClass =
    fontSize === 'larger' ? 'text-xl leading-loose' : fontSize === 'large' ? 'text-lg leading-relaxed' : 'text-base leading-relaxed';

  return (
    <article className="min-h-screen bg-[#FAF8F5] dark:bg-[#121110] transition-colors pb-24">
      {/* Scroll Progress Bar at very top */}
      <div
        className="fixed top-0 left-0 h-1 bg-amber-600 dark:bg-amber-500 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Reader Nav & Reading Toolbar */}
      <div className="sticky top-16 z-30 bg-[#FAF8F5]/90 dark:bg-[#121110]/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 px-4 sm:px-6 py-2.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-50 transition-colors cursor-pointer py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Journal</span>
          </button>

          {/* Reading adjustment controls */}
          <div className="flex items-center gap-3">
            {/* Font family toggle */}
            <button
              onClick={() => setUseSerifFont(!useSerifFont)}
              className="p-1.5 text-xs text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 rounded cursor-pointer"
              title="Toggle font style (Serif / Sans)"
            >
              <Type className="w-4 h-4" />
            </button>

            {/* Font size switcher */}
            <div className="flex items-center gap-1 text-xs border border-stone-200 dark:border-stone-700 rounded px-1.5 py-0.5">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-1 font-sans ${fontSize === 'normal' ? 'font-bold text-amber-700 dark:text-amber-400' : 'text-stone-500'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-1 font-sans text-sm ${fontSize === 'large' ? 'font-bold text-amber-700 dark:text-amber-400' : 'text-stone-500'}`}
              >
                A+
              </button>
            </div>

            {/* Claps button */}
            <button
              onClick={() => onClap(post.id)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 rounded-full hover:bg-rose-100 transition-colors cursor-pointer"
              title="Clap / Applaud story"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span className="font-mono tabular-nums">{post.claps}</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(post.id)}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                isBookmarked
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
              title={isBookmarked ? 'Saved in reading list' : 'Save to reading list'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 rounded transition-colors cursor-pointer relative"
              title="Share article"
            >
              {copiedShare ? (
                <span className="text-[11px] font-sans text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                  <Check className="w-3.5 h-3.5" /> Copied!
                </span>
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Article Container (Optimal 65-75ch Measure) */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10">
        {/* Unboxed Metadata (Zero-Pill discipline) */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400 font-sans mb-4">
          <span className="font-semibold text-stone-800 dark:text-stone-200">
            {post.category}
          </span>
          <span aria-hidden="true">·</span>
          <span>{post.publishedAt}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">{post.readingTimeMinutes} min read</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span className="font-mono tabular-nums">{post.views} views</span>
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`font-serif text-3xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-50 leading-[1.18] text-balance ${
            post.isRtl ? 'text-right' : 'text-left'
          }`}
          dir={post.isRtl ? 'rtl' : 'ltr'}
        >
          {post.title}
        </h1>

        {/* Subtitle / Deck */}
        <p
          className={`mt-4 text-lg sm:text-xl font-sans text-stone-600 dark:text-stone-300 leading-relaxed italic ${
            post.isRtl ? 'text-right font-serif' : 'text-left'
          }`}
          dir={post.isRtl ? 'rtl' : 'ltr'}
        >
          {post.subtitle}
        </p>

        {/* Author Byline Strip */}
        <div className="mt-8 py-4 border-y border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-full object-cover border border-stone-200 dark:border-stone-700"
            />
            <div>
              <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                {post.author.name}
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-400">
                {post.author.role}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors cursor-pointer ${
              isFollowing
                ? 'bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200'
                : 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow Author'}
          </button>
        </div>

        {/* Cover Artwork Viewer */}
        <figure className="my-8">
          <div className="aspect-16/10 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-800">
            <img
              src={post.coverImage}
              alt={post.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <figcaption className="text-xs font-serif italic text-stone-500 dark:text-stone-400 text-center mt-2.5">
            Archival Plate — Illustrating "{post.title}"
          </figcaption>
        </figure>

        {/* Body Text with In-Article Ad Placement */}
        <div
          className={`space-y-6 text-stone-800 dark:text-stone-200 ${fontSizeClass} ${
            useSerifFont ? 'font-serif' : 'font-sans'
          } ${post.isRtl ? 'text-right font-serif' : 'text-left'}`}
          dir={post.isRtl ? 'rtl' : 'ltr'}
        >
          {paragraphs.slice(0, midPoint).map((paragraph, idx) => (
            <RenderParagraph
              key={idx}
              paragraph={paragraph}
              isFirst={idx === 0 && !post.isRtl}
              isRtl={post.isRtl}
            />
          ))}

          {/* In-Article Ad Slot right in middle of article */}
          <AdSlot
            type="in-article"
            settings={adSettings}
            onOpenAdManager={onOpenAdManager}
          />

          {paragraphs.slice(midPoint).map((paragraph, idx) => (
            <RenderParagraph
              key={`after-${idx}`}
              paragraph={paragraph}
              isFirst={false}
              isRtl={post.isRtl}
            />
          ))}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-wrap gap-2 text-xs text-stone-600 dark:text-stone-400 font-sans">
          <span className="font-semibold text-stone-700 dark:text-stone-300">Tags:</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="underline decoration-stone-300 dark:decoration-stone-700 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Reader Engagement Bar */}
        <div className="my-8 p-4 bg-stone-100/70 dark:bg-stone-900/60 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onClap(post.id)}
              className="flex items-center gap-2 px-4 py-2 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 text-rose-700 dark:text-rose-400 rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Applaud Story ({post.claps})</span>
            </button>
            <button
              onClick={() => onToggleBookmark(post.id)}
              className="flex items-center gap-2 px-3 py-2 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-stone-800 rounded-lg text-sm transition-colors cursor-pointer"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              <span>{isBookmarked ? 'Saved' : 'Save for Later'}</span>
            </button>
          </div>

          <button
            onClick={handleShare}
            className="text-xs text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Link</span>
          </button>
        </div>

        {/* Author Bio Box */}
        <div className="p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl mb-12 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-full object-cover border-2 border-stone-200 dark:border-stone-700 shrink-0"
          />
          <div>
            <div className="text-xs uppercase tracking-wider text-stone-500 font-sans">
              About the Author
            </div>
            <h4 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
              {post.author.name}
            </h4>
            <p className="text-sm text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
              {post.author.bio}
            </p>
          </div>
        </div>

        {/* Comments Section */}
        <section className="border-t border-stone-200 dark:border-stone-800 pt-10">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-stone-500" />
            <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
              Responses ({post.comments.length})
            </h3>
          </div>

          {/* New Comment Input Form */}
          <form
            onSubmit={handleCommentSubmit}
            className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl mb-8 space-y-3"
          >
            <input
              type="text"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              placeholder="Your Name (optional)"
              className="w-full text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded px-3 py-1.5 text-stone-900 dark:text-stone-100 focus:outline-hidden"
            />
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="What are your thoughts on this essay?"
              rows={3}
              className="w-full text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded p-3 text-stone-900 dark:text-stone-100 focus:outline-hidden resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="px-4 py-1.5 text-xs font-medium text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-lg hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Response</span>
              </button>
            </div>
          </form>

          {/* Existing Comments List */}
          <div className="space-y-4">
            {post.comments.length === 0 ? (
              <p className="text-sm text-stone-500 italic text-center py-6">
                Be the first to leave a response to this piece.
              </p>
            ) : (
              post.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 rounded-lg space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs text-stone-500 font-sans">
                    <span className="font-semibold text-stone-800 dark:text-stone-200">
                      {comment.authorName}
                    </span>
                    <span>{comment.createdAt}</span>
                  </div>
                  <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                    {comment.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Related Stories Grid */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-stone-200 dark:border-stone-800 mt-16 pt-10">
            <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">
              More from Sahifa Journal
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.slice(0, 2).map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    onSelectPost(rel);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group cursor-pointer border border-stone-200 dark:border-stone-800 rounded-lg p-4 bg-white dark:bg-stone-900 hover:border-stone-400 transition-colors"
                >
                  <div className="aspect-16/10 rounded overflow-hidden bg-stone-100 mb-3">
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-[11px] text-stone-500 font-sans uppercase tracking-wider mb-1">
                    {rel.category} · {rel.readingTimeMinutes} min read
                  </div>
                  <h4 className="font-serif text-base font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-200 line-clamp-2">
                    {rel.title}
                  </h4>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};

// Helper for clean editorial paragraph parsing
const RenderParagraph: React.FC<{
  paragraph: string;
  isFirst: boolean;
  isRtl?: boolean;
}> = ({ paragraph, isFirst, isRtl }) => {
  if (paragraph.startsWith('### ')) {
    return (
      <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 pt-4">
        {paragraph.replace('### ', '')}
      </h3>
    );
  }
  if (paragraph.startsWith('## ')) {
    return (
      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 pt-6">
        {paragraph.replace('## ', '')}
      </h2>
    );
  }
  if (paragraph.startsWith('> ')) {
    return (
      <blockquote className="my-6 border-l-2 border-stone-800 dark:border-stone-300 pl-4 sm:pl-6 italic font-serif text-lg sm:text-xl text-stone-800 dark:text-stone-200 leading-snug">
        {paragraph.replace('> ', '')}
      </blockquote>
    );
  }
  if (paragraph.startsWith('- ')) {
    const items = paragraph.split('\n- ').map((s) => s.replace(/^- /, ''));
    return (
      <ul className="list-disc list-inside space-y-1 my-3 text-stone-700 dark:text-stone-300">
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    );
  }

  return (
    <p
      className={
        isFirst && !isRtl
          ? 'drop-cap text-stone-800 dark:text-stone-200'
          : 'text-stone-800 dark:text-stone-200'
      }
    >
      {paragraph}
    </p>
  );
};
