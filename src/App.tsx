import React, { useState, useEffect } from 'react';
import { BlogPost, BlogComment, ViewMode, AdSettings } from './types/blog';
import { INITIAL_POSTS, CATEGORIES } from './data/initialPosts';
import { Header } from './components/Header';
import { HeroGazette } from './components/HeroGazette';
import { BlogCard } from './components/BlogCard';
import { ArticleReader } from './components/ArticleReader';
import { BlogEditor } from './components/BlogEditor';
import { BookmarksView } from './components/BookmarksView';
import { AdSlot } from './components/AdSlot';
import { AdSettingsModal } from './components/AdSettingsModal';
import { Footer } from './components/Footer';
import { Filter, SlidersHorizontal, BookOpen, PenSquare, Sparkles, TrendingUp } from 'lucide-react';

export default function App() {
  // 1. Posts state with localStorage persistence
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('sahifa_blog_posts');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved posts:', e);
    }
    return INITIAL_POSTS;
  });

  // 2. Bookmarks state
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sahifa_bookmarked_ids');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse bookmarks:', e);
    }
    return ['post-1'];
  });

  // 3. Navigation & Views
  const [currentView, setCurrentView] = useState<ViewMode>('feed');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);

  // 4. Filters & Search
  const [selectedCategory, setSelectedCategory] = useState<string>('All Stories');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'claps' | 'readTime'>('newest');

  // 5. Dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('sahifa_theme') === 'dark' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches
      );
    }
    return false;
  });

  // 6. Ad monetization settings
  const [adSettings, setAdSettings] = useState<AdSettings>(() => {
    try {
      const saved = localStorage.getItem('sahifa_ad_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse ad settings:', e);
    }
    return {
      enabled: true,
      mode: 'graphic',
      showLeaderboard: true,
      showSidebar: true,
      showInFeed: true,
      showInArticle: true,
    };
  });
  const [adManagerOpen, setAdManagerOpen] = useState(false);

  // 7. Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Sync dark mode class on document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('sahifa_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('sahifa_theme', 'light');
    }
  }, [darkMode]);

  // Sync posts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sahifa_blog_posts', JSON.stringify(posts));
    } catch (e) {
      console.error('Failed to save posts to localStorage:', e);
    }
  }, [posts]);

  // Sync bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sahifa_bookmarked_ids', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error('Failed to save bookmarks:', e);
    }
  }, [bookmarkedIds]);

  // Sync ad settings
  useEffect(() => {
    try {
      localStorage.setItem('sahifa_ad_settings', JSON.stringify(adSettings));
    } catch (e) {
      console.error('Failed to save ad settings:', e);
    }
  }, [adSettings]);

  // Post Actions
  const handleSavePost = (savedPost: BlogPost) => {
    const existingIndex = posts.findIndex((p) => p.id === savedPost.id);
    let updated: BlogPost[];
    if (existingIndex >= 0) {
      updated = [...posts];
      updated[existingIndex] = savedPost;
      showToast('Article successfully updated!');
    } else {
      updated = [savedPost, ...posts];
      showToast('New article published to journal!');
    }
    setPosts(updated);
    setEditorOpen(false);
    setEditingPost(null);

    // If published, read it right away
    if (savedPost.status === 'published') {
      setActivePost(savedPost);
      setCurrentView('read');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const updated = posts.filter((p) => p.id !== id);
      setPosts(updated);
      showToast('Article deleted.');
    }
  };

  const handleClap = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, claps: p.claps + 1 } : p))
    );
    if (activePost && activePost.id === id) {
      setActivePost((prev) => (prev ? { ...prev, claps: prev.claps + 1 } : null));
    }
  };

  const handleToggleBookmark = (id: string) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
      showToast('Removed from reading list');
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
      showToast('Saved to reading list!');
    }
  };

  const handleAddComment = (postId: string, comment: BlogComment) => {
    const updated = posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [comment, ...p.comments],
        };
      }
      return p;
    });
    setPosts(updated);
    if (activePost && activePost.id === postId) {
      setActivePost((prev) =>
        prev ? { ...prev, comments: [comment, ...prev.comments] } : null
      );
    }
    showToast('Your comment was posted!');
  };

  const handleReadPost = (post: BlogPost) => {
    // Increment view count
    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? { ...p, views: p.views + 1 } : p))
    );
    setActivePost({ ...post, views: post.views + 1 });
    setCurrentView('read');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setEditorOpen(true);
  };

  // Filter & sort logic
  const filteredPosts = posts
    .filter((post) => {
      // Category filter
      if (selectedCategory !== 'All Stories' && post.category !== selectedCategory) {
        return false;
      }
      // Status filter
      if (statusFilter === 'published' && post.status !== 'published') return false;
      if (statusFilter === 'draft' && post.status !== 'draft') return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesSubtitle = post.subtitle.toLowerCase().includes(query);
        const matchesContent = post.content.toLowerCase().includes(query);
        const matchesAuthor = post.author.name.toLowerCase().includes(query);
        const matchesTag = post.tags.some((t) => t.toLowerCase().includes(query));
        return matchesTitle || matchesSubtitle || matchesContent || matchesAuthor || matchesTag;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'claps') return b.claps - a.claps;
      if (sortBy === 'readTime') return a.readingTimeMinutes - b.readingTimeMinutes;
      // newest by default (using id or index)
      return posts.indexOf(a) - posts.indexOf(b);
    });

  // Featured lead post
  const leadPost = posts.find((p) => p.isFeatured && p.status === 'published') || posts[0];

  // Bookmarked posts list
  const bookmarkedPosts = posts.filter((p) => bookmarkedIds.includes(p.id));

  // Category counts
  const categoryCounts = CATEGORIES.reduce((acc, cat) => {
    if (cat === 'All Stories') {
      acc[cat] = posts.filter((p) => p.status === 'published').length;
    } else {
      acc[cat] = posts.filter((p) => p.category === cat && p.status === 'published').length;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#121110] text-stone-900 dark:text-stone-100 transition-colors">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-4 py-2.5 rounded-lg shadow-xl text-xs font-sans font-medium flex items-center gap-2 animate-fade-in border border-stone-800 dark:border-stone-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Contract Compliant Header */}
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentView('feed');
        }}
        savedCount={bookmarkedIds.length}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenAdManager={() => setAdManagerOpen(true)}
        onOpenNewStory={() => {
          setEditingPost(null);
          setEditorOpen(true);
        }}
      />

      {/* VIEW: Reader Mode */}
      {currentView === 'read' && activePost ? (
        <ArticleReader
          post={activePost}
          onBack={() => {
            setCurrentView('feed');
            setActivePost(null);
          }}
          onClap={handleClap}
          isBookmarked={bookmarkedIds.includes(activePost.id)}
          onToggleBookmark={handleToggleBookmark}
          onAddComment={handleAddComment}
          relatedPosts={posts.filter((p) => p.id !== activePost.id && p.status === 'published')}
          onSelectPost={handleReadPost}
          adSettings={adSettings}
          onOpenAdManager={() => setAdManagerOpen(true)}
        />
      ) : null}

      {/* VIEW: Bookmarks List */}
      {currentView === 'bookmarks' ? (
        <BookmarksView
          posts={bookmarkedPosts}
          onRead={handleReadPost}
          onRemoveBookmark={handleToggleBookmark}
          onBack={() => setCurrentView('feed')}
        />
      ) : null}

      {/* VIEW: Feed / Homepage */}
      {currentView === 'feed' ? (
        <main className="flex-1">
          {/* Top Leaderboard Ad Slot (Monetization space requested by user) */}
          <AdSlot
            type="leaderboard"
            settings={adSettings}
            onOpenAdManager={() => setAdManagerOpen(true)}
          />

          {/* Hero Section with Editorial Marquee & Search */}
          <HeroGazette
            leadPost={leadPost}
            onReadPost={handleReadPost}
            onWritePost={() => {
              setEditingPost(null);
              setEditorOpen(true);
            }}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            postCount={posts.filter((p) => p.status === 'published').length}
          />

          {/* Content Catalog Section with 2-Column Editorial Grid */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            {/* Filter Controls Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
              {/* Category buttons (Interactive filter controls) */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full scrollbar-none">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-sans font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                        : 'text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-stone-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Status & Sort Dropdowns */}
              <div className="flex items-center gap-2 self-start md:self-auto text-xs">
                {/* Draft / Published filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 rounded px-2.5 py-1.5 focus:outline-hidden"
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published Only</option>
                  <option value="draft">My Drafts ({posts.filter((p) => p.status === 'draft').length})</option>
                </select>

                {/* Sort selector */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 rounded px-2.5 py-1.5 focus:outline-hidden"
                >
                  <option value="newest">Sort: Newest</option>
                  <option value="claps">Sort: Most Applauded</option>
                  <option value="readTime">Sort: Shortest Read</option>
                </select>
              </div>
            </div>

            {/* Main Editorial Layout: Articles Grid + Sidebar with Ad slot */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Articles List (8 cols) */}
              <div className="lg:col-span-8">
                {filteredPosts.length === 0 ? (
                  <div className="py-16 text-center border border-dashed border-stone-200 dark:border-stone-800 rounded-xl p-6">
                    <BookOpen className="w-10 h-10 text-stone-400 mx-auto mb-2" />
                    <h3 className="font-serif text-lg font-semibold text-stone-800 dark:text-stone-200">
                      No stories match your criteria
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Try clearing your search or switching categories.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategory('All Stories');
                        setSearchQuery('');
                        setStatusFilter('all');
                      }}
                      className="mt-4 px-4 py-2 text-xs font-medium bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {filteredPosts.map((post, index) => (
                      <React.Fragment key={post.id}>
                        <BlogCard
                          post={post}
                          onRead={handleReadPost}
                          onEdit={handleEditPost}
                          onDelete={handleDeletePost}
                          isBookmarked={bookmarkedIds.includes(post.id)}
                          onToggleBookmark={handleToggleBookmark}
                          onClap={handleClap}
                        />

                        {/* In-Feed Native Ad Slot placed after the 2nd article */}
                        {index === 1 && (
                          <AdSlot
                            type="in-feed"
                            settings={adSettings}
                            onOpenAdManager={() => setAdManagerOpen(true)}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Editorial Sidebar (4 cols) */}
              <aside className="lg:col-span-4 space-y-6">
                {/* Desk Intro Card */}
                <div className="p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl">
                  <div className="text-[11px] uppercase tracking-wider text-amber-800 dark:text-amber-400 font-sans font-semibold mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>The Publisher's Desk</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                    A Platform for Scribes &amp; Thinkers
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mt-2 font-sans">
                    Sahifa Journal provides a distraction-free home for long-form essays, bilingual reflections in Urdu &amp; English, and curated thought.
                  </p>
                  <button
                    onClick={() => {
                      setEditingPost(null);
                      setEditorOpen(true);
                    }}
                    className="mt-4 w-full py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <PenSquare className="w-3.5 h-3.5" />
                    <span>Post a New Article</span>
                  </button>
                </div>

                {/* Sidebar Sticky Ad Slot (300×250 / Monetization space) */}
                <div className="sticky top-20">
                  <AdSlot
                    type="sidebar"
                    settings={adSettings}
                    onOpenAdManager={() => setAdManagerOpen(true)}
                  />

                  {/* Trending Topics / Desks */}
                  <div className="p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl mt-6">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Curated Desks</span>
                    </div>
                    <div className="space-y-2 text-xs font-sans">
                      {CATEGORIES.filter((c) => c !== 'All Stories').map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className="w-full flex items-center justify-between py-1.5 px-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded text-left transition-colors cursor-pointer"
                        >
                          <span className="text-stone-800 dark:text-stone-200">
                            {cat}
                          </span>
                          <span className="font-mono text-stone-500 tabular-nums">
                            {categoryCounts[cat] || 0}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </main>
      ) : null}

      {/* Blog Editor Modal / Fullscreen Scribe Studio */}
      {editorOpen && (
        <BlogEditor
          initialPost={editingPost}
          onSave={handleSavePost}
          onClose={() => {
            setEditorOpen(false);
            setEditingPost(null);
          }}
        />
      )}

      {/* Ad Settings Modal */}
      {adManagerOpen && (
        <AdSettingsModal
          settings={adSettings}
          onUpdateSettings={setAdSettings}
          onClose={() => setAdManagerOpen(false)}
        />
      )}

      {/* Editorial Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentView('feed');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdManager={() => setAdManagerOpen(true)}
      />
    </div>
  );
}
