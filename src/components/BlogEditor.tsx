import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Quote,
  List,
  ListOrdered,
  Code,
  Minus,
  Eye,
  Edit3,
  Columns,
  Sparkles,
  Upload,
  Check,
  Globe,
  Tag,
  BookOpen,
} from 'lucide-react';
import { BlogPost, Author } from '../types/blog';
import { CATEGORIES } from '../data/initialPosts';

interface BlogEditorProps {
  initialPost?: BlogPost | null;
  onSave: (post: BlogPost) => void;
  onClose: () => void;
}

const PRESET_COVERS = [
  { label: 'Journal Studio', url: '/src/assets/images/hero_editorial_journal_1790520728452.jpg' },
  { label: 'Future Tech & Optics', url: '/src/assets/images/tech_future_minimal_1790520740251.jpg' },
  { label: 'Travertine Architecture', url: '/src/assets/images/art_architecture_editorial_1790520752810.jpg' },
  { label: 'Quill & Antique Paper', url: '/src/assets/images/quill_book_workspace_1790520764260.jpg' },
  { label: 'Minimalist Workspace', url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Classic Bookshelf', url: 'https://images.unsplash.com/photo-1507842229451-7f01be8510d2?w=1200&auto=format&fit=crop&q=80' },
];

export const BlogEditor: React.FC<BlogEditorProps> = ({
  initialPost,
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState(initialPost?.title || '');
  const [slug, setSlug] = useState(initialPost?.slug || '');
  const [subtitle, setSubtitle] = useState(initialPost?.subtitle || '');
  const [content, setContent] = useState(
    initialPost?.content ||
      `Enter your essay narrative here...\n\n### The Opening Reflection\nWrite with clarity and depth. Use headings, blockquotes, and lists to structure your thoughts.\n\n> "Words have the power to illuminate the unseen."`
  );
  const [category, setCategory] = useState(initialPost?.category || 'Essays & Culture');
  const [newCatInput, setNewCatInput] = useState('');
  const [tags, setTags] = useState<string[]>(initialPost?.tags || ['Writing', 'Reflections']);
  const [tagInput, setTagInput] = useState('');
  const [coverImage, setCoverImage] = useState(
    initialPost?.coverImage || '/src/assets/images/hero_editorial_journal_1790520728452.jpg'
  );
  const [customCoverUrl, setCustomCoverUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(initialPost?.isFeatured || false);
  const [status, setStatus] = useState<'published' | 'draft'>(initialPost?.status || 'published');
  const [isRtl, setIsRtl] = useState(initialPost?.isRtl || false);

  // Author details
  const [authorName, setAuthorName] = useState(initialPost?.author.name || 'Your Name');
  const [authorRole, setAuthorRole] = useState(initialPost?.author.role || 'Contributing Essayist');
  const [authorBio, setAuthorBio] = useState(
    initialPost?.author.bio || 'Writer, reader, and independent chronicler.'
  );

  // Editor mode: write | split | preview
  const [viewMode, setViewMode] = useState<'write' | 'split' | 'preview'>('write');
  const [coverModalOpen, setCoverModalOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-generate slug when title changes (if new post)
  useEffect(() => {
    if (!initialPost && title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      setSlug(generatedSlug);
    }
  }, [title, initialPost]);

  // Compute word count and estimated reading time
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200));

  // Quick insertion helpers for Markdown formatting
  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    const replacement = `${prefix}${selectedText || 'text'}${suffix}`;
    const newContent = content.substring(0, start) + replacement + content.substring(end);

    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + (selectedText ? selectedText.length : 4)
      );
    }, 10);
  };

  const handleAddTag = () => {
    const clean = tagInput.trim().replace(/^#/, '');
    if (clean && !tags.includes(clean)) {
      setTags([...tags, clean]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setCoverImage(reader.result);
          setCoverModalOpen(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a title for your blog post.');
      return;
    }
    if (!content.trim()) {
      alert('Please add some content to your blog post.');
      return;
    }

    const postData: BlogPost = {
      id: initialPost?.id || `post-${Date.now()}`,
      slug: slug || `post-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || 'A thoughtful exploration on life, craft, and ideas.',
      content: content.trim(),
      category: category,
      tags: tags.length > 0 ? tags : ['General'],
      coverImage: coverImage,
      author: {
        name: authorName.trim() || 'Anonymous Writer',
        role: authorRole.trim() || 'Writer',
        avatar:
          initialPost?.author.avatar ||
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        bio: authorBio.trim(),
      },
      publishedAt:
        initialPost?.publishedAt ||
        new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }).format(new Date()),
      readingTimeMinutes: estimatedReadTime,
      isFeatured: isFeatured,
      status: status,
      claps: initialPost?.claps || 0,
      views: initialPost?.views || 1,
      comments: initialPost?.comments || [],
      isRtl: isRtl,
    };

    onSave(postData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF8F5] dark:bg-[#121110] overflow-y-auto flex flex-col font-sans transition-colors">
      {/* Editor Top Bar */}
      <header className="sticky top-0 z-20 bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm border-b border-stone-200 dark:border-stone-800 px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            title="Cancel & Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-serif font-semibold text-stone-900 dark:text-stone-100 leading-none">
              {initialPost ? 'Edit Blog Post' : 'New Blog Post'}
            </h2>
            <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 font-mono tabular-nums">
              {wordCount} words · ~{estimatedReadTime} min read
            </p>
          </div>
        </div>

        {/* View mode switcher */}
        <div className="hidden sm:flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setViewMode('write')}
            className={`px-3 py-1.5 rounded font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'write'
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-300'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Write</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`px-3 py-1.5 rounded font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'split'
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-300'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Split</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`px-3 py-1.5 rounded font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'preview'
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-300'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
        </div>

        {/* Save & Publish Actions */}
        <div className="flex items-center gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
            className="text-xs bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 rounded px-2.5 py-1.5 focus:outline-hidden"
          >
            <option value="published">Publish Now</option>
            <option value="draft">Save as Draft</option>
          </select>

          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 text-xs font-medium text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-lg hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors shadow-xs cursor-pointer"
          >
            {status === 'published' ? 'Publish Story' : 'Save Draft'}
          </button>
        </div>
      </header>

      {/* Main Composer Workspace */}
      <div className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Metadata Bar (Category, RTL toggle, Featured) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800">
            {/* Category */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  if (e.target.value === '__new__') {
                    const custom = prompt('Enter new category name:');
                    if (custom) {
                      setCategory(custom.trim());
                    }
                  } else {
                    setCategory(e.target.value);
                  }
                }}
                className="w-full text-xs bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded px-3 py-2 text-stone-900 dark:text-stone-100 focus:outline-hidden"
              >
                {CATEGORIES.filter((c) => c !== 'All Stories').map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
                {!CATEGORIES.includes(category) && (
                  <option value={category}>{category}</option>
                )}
                <option value="__new__">+ Create New Category...</option>
              </select>
            </div>

            {/* Urdu / RTL Direction Toggle */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Language &amp; Script
              </label>
              <button
                type="button"
                onClick={() => setIsRtl(!isRtl)}
                className={`w-full py-2 px-3 text-xs rounded border text-left flex items-center justify-between transition-colors cursor-pointer ${
                  isRtl
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'
                    : 'border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                <span className="font-serif">
                  {isRtl ? 'اردو / RTL (Right-to-Left)' : 'English / LTR (Left-to-Right)'}
                </span>
                <Globe className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Featured Lead Toggle & Slug */}
            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700 dark:text-stone-300 py-2">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded border-stone-300 text-stone-900 focus:ring-0"
                />
                <span className="font-medium">Feature as Homepage Lead Story</span>
              </label>
            </div>
          </div>

          {/* Cover Image Selector */}
          <div className="relative rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300">
                <ImageIcon className="w-4 h-4 text-stone-500" />
                <span>Article Cover Artwork</span>
              </div>
              <button
                type="button"
                onClick={() => setCoverModalOpen(true)}
                className="text-xs text-amber-800 dark:text-amber-400 font-medium hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" /> Change Cover Artwork
              </button>
            </div>

            <div className="relative aspect-21/9 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 group">
              <img
                src={coverImage}
                alt="Article cover"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setCoverModalOpen(true)}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium cursor-pointer"
              >
                Click to switch or upload image
              </button>
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={isRtl ? 'بلاگ کا عنوان درج کریں...' : 'Article Title...'}
              dir={isRtl ? 'rtl' : 'ltr'}
              className={`w-full text-2xl sm:text-4xl font-serif font-bold bg-transparent border-b border-stone-200 dark:border-stone-800 pb-2 text-stone-900 dark:text-stone-50 placeholder-stone-400 focus:outline-hidden focus:border-stone-400 dark:focus:border-stone-600 transition-colors ${
                isRtl ? 'text-right' : 'text-left'
              }`}
            />

            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder={
                isRtl
                  ? 'ذیلی عنوان یا مختصر تعارف...'
                  : 'Subtitle / deck explaining the central thesis of the story...'
              }
              dir={isRtl ? 'rtl' : 'ltr'}
              className={`w-full text-base sm:text-lg font-sans text-stone-600 dark:text-stone-300 bg-transparent border-b border-stone-200 dark:border-stone-800 pb-2 placeholder-stone-400 focus:outline-hidden focus:border-stone-400 dark:focus:border-stone-600 transition-colors ${
                isRtl ? 'text-right font-serif' : 'text-left'
              }`}
            />
          </div>

          {/* Tags Manager */}
          <div className="p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-stone-600 dark:text-stone-300 flex items-center gap-1 font-medium mr-1">
              <Tag className="w-3.5 h-3.5" /> Tags:
            </span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-xs bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-2 py-0.5 rounded"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-rose-500 cursor-pointer"
                >
                  &times;
                </button>
              </span>
            ))}
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="Add tag and press Enter"
                className="text-xs bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded px-2 py-1 text-stone-800 dark:text-stone-200 placeholder-stone-400 focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="text-xs bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 px-2.5 py-1 rounded cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          {/* Author Byline Config */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-700 dark:text-stone-300 font-semibold mb-1">
                Author Name
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full text-xs bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded px-3 py-1.5 text-stone-900 dark:text-stone-100 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-700 dark:text-stone-300 font-semibold mb-1">
                Author Title / Role
              </label>
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                className="w-full text-xs bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded px-3 py-1.5 text-stone-900 dark:text-stone-100 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-700 dark:text-stone-300 font-semibold mb-1">
                Short Bio
              </label>
              <input
                type="text"
                value={authorBio}
                onChange={(e) => setAuthorBio(e.target.value)}
                className="w-full text-xs bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded px-3 py-1.5 text-stone-900 dark:text-stone-100 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Formatting Toolbar */}
          <div className="sticky top-16 z-10 bg-white/95 dark:bg-stone-900/95 backdrop-blur-xs p-2 border border-stone-200 dark:border-stone-800 rounded-lg flex flex-wrap items-center gap-1 shadow-xs">
            <button
              type="button"
              onClick={() => insertFormatting('\n# ', '\n')}
              className="p-1.5 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded cursor-pointer"
              title="Heading 1"
            >
              <Heading1 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('\n## ', '\n')}
              className="p-1.5 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded cursor-pointer"
              title="Heading 2"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('\n### ', '\n')}
              className="p-1.5 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded cursor-pointer"
              title="Heading 3"
            >
              <Heading3 className="w-4 h-4" />
            </button>
            <div className="w-px h-5 bg-stone-200 dark:bg-stone-700 mx-1"></div>
            <button
              type="button"
              onClick={() => insertFormatting('**', '**')}
              className="p-1.5 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded cursor-pointer"
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('*', '*')}
              className="p-1.5 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded cursor-pointer"
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('\n> "', '"\n')}
              className="p-1.5 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded cursor-pointer"
              title="Pullquote / Blockquote"
            >
              <Quote className="w-4 h-4" />
            </button>
            <div className="w-px h-5 bg-stone-200 dark:bg-stone-700 mx-1"></div>
            <button
              type="button"
              onClick={() => insertFormatting('\n- ', '\n')}
              className="p-1.5 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded cursor-pointer"
              title="Bullet list"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('\n1. ', '\n')}
              className="p-1.5 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded cursor-pointer"
              title="Numbered list"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('`', '`')}
              className="p-1.5 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded cursor-pointer"
              title="Code"
            >
              <Code className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('\n---\n')}
              className="p-1.5 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded cursor-pointer"
              title="Divider rule"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>

          {/* Content Editor Area: Write / Split / Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Editor Textarea */}
            {(viewMode === 'write' || viewMode === 'split') && (
              <div className={viewMode === 'split' ? 'lg:col-span-6' : 'lg:col-span-12'}>
                <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-4">
                  <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    dir={isRtl ? 'rtl' : 'ltr'}
                    rows={18}
                    placeholder="Compose your essay here. Markdown formatting supported..."
                    className={`w-full bg-transparent text-stone-900 dark:text-stone-100 focus:outline-hidden font-sans text-base leading-relaxed resize-y ${
                      isRtl ? 'font-serif text-right text-lg' : ''
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Live Reader Preview */}
            {(viewMode === 'preview' || viewMode === 'split') && (
              <div className={viewMode === 'split' ? 'lg:col-span-6' : 'lg:col-span-12'}>
                <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-6 sm:p-8 max-h-[600px] overflow-y-auto">
                  <div className="text-[11px] uppercase tracking-wider text-amber-800 dark:text-amber-400 font-sans mb-3">
                    Live Reader Preview · {category}
                  </div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                    {title || 'Untitled Post'}
                  </h1>
                  <p className="text-stone-600 dark:text-stone-400 italic font-serif text-sm mb-6 pb-4 border-b border-stone-200 dark:border-stone-800">
                    {subtitle}
                  </p>
                  <div
                    className={`prose prose-stone dark:prose-invert max-w-none text-sm leading-relaxed space-y-4 ${
                      isRtl ? 'text-right font-serif text-base' : ''
                    }`}
                    dir={isRtl ? 'rtl' : 'ltr'}
                  >
                    {content.split('\n\n').map((paragraph, idx) => {
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h3
                            key={idx}
                            className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-100 pt-3"
                          >
                            {paragraph.replace('### ', '')}
                          </h3>
                        );
                      }
                      if (paragraph.startsWith('## ')) {
                        return (
                          <h2
                            key={idx}
                            className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 pt-4"
                          >
                            {paragraph.replace('## ', '')}
                          </h2>
                        );
                      }
                      if (paragraph.startsWith('> ')) {
                        return (
                          <blockquote
                            key={idx}
                            className="border-l-2 border-stone-400 dark:border-stone-600 pl-4 italic font-serif text-stone-700 dark:text-stone-300 my-4"
                          >
                            {paragraph.replace('> ', '')}
                          </blockquote>
                        );
                      }
                      return (
                        <p
                          key={idx}
                          className={idx === 0 && !isRtl ? 'drop-cap' : 'text-stone-700 dark:text-stone-300'}
                        >
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Artwork Cover Modal */}
      {coverModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl max-w-xl w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                Select Cover Artwork
              </h3>
              <button
                onClick={() => setCoverModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-4 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300 mb-2">
                  Curated Editorial Presets
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {PRESET_COVERS.map((preset) => (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() => {
                        setCoverImage(preset.url);
                        setCoverModalOpen(false);
                      }}
                      className={`relative aspect-16/10 rounded overflow-hidden border-2 transition-all cursor-pointer ${
                        coverImage === preset.url
                          ? 'border-amber-600 ring-2 ring-amber-500/20'
                          : 'border-transparent hover:opacity-90'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[10px] text-white text-center py-0.5 truncate px-1">
                        {preset.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Upload Image from Device
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 border border-dashed border-stone-300 dark:border-stone-700 rounded-lg text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Choose file from your computer</span>
                </button>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Or Paste External Image URL
                </p>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customCoverUrl}
                    onChange={(e) => setCustomCoverUrl(e.target.value)}
                    placeholder="https://example.com/cover.jpg"
                    className="flex-1 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded px-3 py-1.5 text-stone-900 dark:text-stone-100 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customCoverUrl.trim()) {
                        setCoverImage(customCoverUrl.trim());
                        setCoverModalOpen(false);
                      }
                    }}
                    className="px-3 py-1.5 text-xs bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded font-medium cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
