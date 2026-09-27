import { BlogPost } from '../types/blog';

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'quiet-renaissance-of-long-form-thought',
    title: 'The Quiet Renaissance of Long-Form Thought in an Accelerated World',
    subtitle: 'Why deliberate writing, tactile typography, and slow reading offer the ultimate counterweight to algorithmic noise.',
    coverImage: '/src/assets/images/hero_editorial_journal_1790520728452.jpg',
    category: 'Essays & Culture',
    tags: ['Mindfulness', 'Writing', 'Digital Wellness', 'Editorial'],
    isFeatured: true,
    status: 'published',
    publishedAt: 'Sept 26, 2026',
    readingTimeMinutes: 6,
    claps: 148,
    views: 1840,
    author: {
      name: 'Zaryab Hassan',
      role: 'Editor-in-Chief & Essayist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: 'Writing on the intersections of typography, philosophical inquiry, and modern digital spaces.',
    },
    content: `In an era defined by fleeting headlines and infinite scrolling feeds, something profound is quietly shifting. Readers and writers alike are reclaiming the sanctity of the open page.

We live in an attention economy that rewards brevity at the cost of nuance. Yet, human intellect and deep contemplation have never thrived on fragmented summaries. When we sit down with a long-form essay, we are not merely consuming information; we are walking alongside a mind in the act of thinking.

### The Architecture of the Printed Spirit

When Gutenberg cast movable metal types in 15th-century Mainz, he did not just invent a machine—he codified a rhythm of cognition. The spatial cadence of margins, the deliberate weight of serifs, and the breath between paragraphs form an unspoken contract between author and reader.

> "To read slowly is to resist the commodification of our inner attention. It is an act of sovereign deliberation."

Modern screen design often forgets this. Endless notifications and garish visual widgets splinter our capacity for sustained thought. A truly great publication does the opposite: it provides a serene sanctuary. Generous whitespaces, crisp typographical hierarchy, and unhurried prose create a calm room in which an idea can unfold at its natural tempo.

### Why We Write

Why do we write essays instead of tweets? Because some truths cannot survive compression. They demand context, counter-argument, historical resonance, and melodic phrasing. 

When you publish on this platform, you are not chasing vanity metrics; you are contributing to a lasting archive of human discourse. Here, every sentence is given the breathing room it deserves.

### A Ritual for the Modern Scribe

If you find yourself overwhelmed by the noise of modern web applications, return to the simple disciplines:
- Write in quiet intervals without split attention.
- Read pieces that challenge your immediate assumptions.
- Respect the craftsmanship of words, sentences, and typographic form.

The future of digital publishing does not belong to ever-faster feeds. It belongs to deliberate spaces built for depth, beauty, and resonance.`,
    comments: [
      {
        id: 'c1',
        authorName: 'Amina Tariq',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        createdAt: 'Yesterday at 4:15 PM',
        content: 'This resonated deeply. We need more publications that treat the reader’s attention with dignity instead of a monetization target.',
        likes: 14,
      },
      {
        id: 'c2',
        authorName: 'Dr. Daniyal Mir',
        createdAt: 'Today at 9:30 AM',
        content: 'The quote on reading slowly as an act of resistance is magnificent. Brilliant aesthetic and layout!',
        likes: 8,
      },
    ],
  },
  {
    id: 'post-2',
    slug: 'architecting-transparent-ai-systems',
    title: 'Beyond the Black Box: Architecting Transparent AI for Creative Minds',
    subtitle: 'Examining how modern generative tooling must transition from opaque automation to collaborative, human-centric craft.',
    coverImage: '/src/assets/images/tech_future_minimal_1790520740251.jpg',
    category: 'Technology & AI',
    tags: ['Artificial Intelligence', 'Software Craft', 'Future Tech', 'UX'],
    isFeatured: false,
    status: 'published',
    publishedAt: 'Sept 24, 2026',
    readingTimeMinutes: 5,
    claps: 92,
    views: 1210,
    author: {
      name: 'Farhan Siddiqui',
      role: 'Principal Systems Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      bio: 'Building explainable algorithmic systems and exploring computational aesthetics.',
    },
    content: `For decades, the promise of computing was deterministic: given input X and program P, you receive reproducible output Y. With machine learning models, that mental model collapsed into probabilistic landscapes.

While neural networks can generate astonishing prose and visuals, an essential tension remains: artists and engineers do not want an opaque black box that replaces creative discretion. They need instruments of precision.

### The Need for Latent Visibility

When a craftsperson works with wood or clay, the physical resistance of the material provides immediate, tactile feedback. The grain of the oak dictates where the chisel bites.

In contrast, current machine interfaces offer crude prompt-response slots. We must demand more nuanced control surfaces:
1. **Parameter inspectability**: Understanding confidence distributions and token branching.
2. **Latent provenance**: Knowing what lineage or sources informed a synthesis.
3. **Reversible workflows**: Non-destructive branching trees for creative ideation.

> "A tool should never obscure the user's intent. True intelligence in software amplifies the creator's agency rather than supplanting it."

As developers and thinkers, our duty is to design systems where the human remains the curatorial conductor. The machine may generate variations, but the discernment, taste, and soul will always remain human.`,
    comments: [
      {
        id: 'c3',
        authorName: 'Bilal Khan',
        createdAt: '2 days ago',
        content: 'The comparison with wood carving and material resistance is spot on. Prompt boxes feel like vending machines compared to real creative instruments.',
        likes: 6,
      },
    ],
  },
  {
    id: 'post-3',
    slug: 'travertine-and-shadow-brutalist-sanctuary',
    title: 'Travertine and Shadow: The Enduring Poetry of Brutalist Sanctuaries',
    subtitle: 'How honest materials, geometric unadornment, and natural illumination compose timeless architectural contemplation.',
    coverImage: '/src/assets/images/art_architecture_editorial_1790520752810.jpg',
    category: 'Design & Architecture',
    tags: ['Architecture', 'Brutalism', 'Spatial Design', 'Aesthetics'],
    isFeatured: false,
    status: 'published',
    publishedAt: 'Sept 21, 2026',
    readingTimeMinutes: 4,
    claps: 77,
    views: 940,
    author: {
      name: 'Soraya Vance',
      role: 'Spatial Designer & Curator',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      bio: 'Investigating architectural acoustics, raw masonry, and meditative public spaces.',
    },
    content: `Step into a stone cloister carved from rough-hewn travertine, and the world outside immediately drops its volume. There is an unmistakable gravity to mineral authenticity.

In contemporary digital and physical design, we are constantly bombarded by glossy veneers, disposable laminates, and artificial gradients. Brutalism and raw masonry remind us of what endures.

### The Eloquence of Unfinished Surface

When Louis Kahn famously asked a brick what it wanted to be, the brick replied, "I like an arch." Kahn understood that material honesty carries an ethical dimension. A concrete wall should not disguise itself as marble; it should proudly bear the wood grain of the formwork that cast it.

- **Weight**: Mass gives a room emotional anchor.
- **Shadow**: Light only possesses meaning when framed by deep, deliberate shadow.
- **Silence**: Thick walls absorb ambient hysteria, granting the inhabitant rare stillness.

When we translate these principles to digital design, we strip away gaudy pill badges and superfluous drop shadows. We let strong editorial typography, clear proportions, and confident negative space speak for themselves.`,
    comments: [],
  },
  {
    id: 'post-4',
    slug: 'urdu-adab-tanhaee-aur-takhleeq',
    title: 'قلم، کاغذ اور خود کلامی: اردو ادب میں تنہائی اور تخلیق کا سفر',
    subtitle: 'میر و غالب سے فیض تک—کیسے تنہائی نے اردو ادب کے شاہکاروں کو جنم دیا اور عصر حاضر میں لکھنے کی اہمیت۔',
    coverImage: '/src/assets/images/quill_book_workspace_1790520764260.jpg',
    category: 'Urdu Adab & Poetry',
    tags: ['اردو ادب', 'شاعری', 'ادبیات', 'فلسفہ'],
    isFeatured: false,
    status: 'published',
    publishedAt: 'Sept 19, 2026',
    readingTimeMinutes: 5,
    claps: 215,
    views: 2450,
    isRtl: true,
    author: {
      name: 'میر شمس الحق',
      role: 'محقق و نقاد ادب',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      bio: 'کلاسیکی اردو شاعری اور معاصر نثری اسالیب پر مقالہ نگار۔',
    },
    content: `تنہائی تخلیق کا سب سے پہلا اور مقدس ترین گہوارہ ہے۔ جب تک انسان بیرونی شور و غل سے کنارہ کش ہو کر اپنے باطن کے نہاں خانوں میں نہیں اترتا، تب تک حرف کو وہ تاثیر نصیب نہیں ہوتی جو دلوں کو گرما دے۔

اردو شاعری کی تاریخ دراصل اسی خود کلامی کا ایک تابناک تسلسل ہے۔ میر تقی میر کی دھیمی اداسی ہو یا غالب کا فلسفیانہ تجسس، ہر مصرع اس گہرے سکوت کا ثمر ہے جو صرف ایک مخلص قلم کار کو میسر آتا ہے۔

### کاغذ اور قلم کا سحر

آج جب کہ کمپیوٹر اور موبائل کے کی بورڈز نے ہمارے ہاتھوں سے روشنائی کی خوشبو چھین لی ہے، کاغذ پر لفظ کا ابھرنا ایک مراقبے سے کم نہیں۔

> "دل ہی تو ہے نہ سنگ و خشت، درد سے بھر نہ آئے کیوں
> روئیں گے ہم ہزار بار، کوئی ہمیں ستائے کیوں"

جب انسان اپنے احساسات کو صفحہ قرطاس پر منتقل کرتا ہے تو وہ درحقیقت اپنی روح کا عکس ترتیب دے رہا ہوتا ہے۔ موجودہ ڈیجیٹل دنیا میں بلاگ لکھنا بھی اسی روایت کی ایک جدید کڑی ہے، جہاں ہم اپنے خیالات کو آنے والے زمانوں کے لیے محفوظ کرتے ہیں۔

اگر آپ لکھنا چاہتے ہیں تو آغاز کیجیے۔ اس پلیٹ فارم پر آپ کو اپنے خیالات کے اظہار کی مکمل آزادی ہے، چاہے وہ نظم ہو، نثر ہو، یا دل کی کوئی واردات۔`,
    comments: [
      {
        id: 'c4',
        authorName: 'سیدہ تحریم',
        createdAt: '3 days ago',
        content: 'بہت خوبصورت تحریر! اردو بلاگنگ کے لیے ایسا باوقار پلیٹ فارم دیکھ کر دلی مسرت ہوئی۔ قلم سلامت رہے۔',
        likes: 19,
      },
    ],
  },
];

export const CATEGORIES = [
  'All Stories',
  'Essays & Culture',
  'Technology & AI',
  'Design & Architecture',
  'Urdu Adab & Poetry',
  'Science & Future',
  'Business & Craft',
];
