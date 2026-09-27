import React, { useState } from 'react';
import { ExternalLink, Info, Code2, Sparkles, X } from 'lucide-react';
import { AdSettings } from '../types/blog';

interface AdSlotProps {
  type: 'leaderboard' | 'sidebar' | 'in-feed' | 'in-article';
  settings?: AdSettings;
  onOpenAdManager?: () => void;
}

export const AdSlot: React.FC<AdSlotProps> = ({ type, settings, onOpenAdManager }) => {
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // If ads are globally disabled or this specific slot is dismissed
  if (settings && !settings.enabled) return null;
  if (dismissed) return null;

  const isWireframe = settings?.mode === 'wireframe';

  // Specific dimensions & styling according to Ad standard placements
  if (type === 'leaderboard') {
    return (
      <div className="w-full my-6 max-w-5xl mx-auto px-4">
        <div className="relative border border-dashed border-stone-300 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-900/60 p-2 sm:p-3 rounded-lg overflow-hidden group">
          {/* Subtle unboxed metadata label */}
          <div className="flex items-center justify-between pb-1.5 px-2 text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-300 font-sans">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500/70"></span>
              Advertisement · 728×90 Leaderboard Slot
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCodeModal(true)}
                className="hover:text-stone-700 dark:hover:text-stone-300 flex items-center gap-1 cursor-pointer transition-colors"
                title="View AdSense Code Snippet"
              >
                <Code2 className="w-3 h-3" />
                <span>AdSense Snippet</span>
              </button>
              <button
                onClick={() => setDismissed(true)}
                className="hover:text-stone-700 dark:hover:text-stone-300 cursor-pointer"
                title="Hide preview"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Ad content: wireframe vs graphic sponsor */}
          {isWireframe ? (
            <div className="h-20 sm:h-24 w-full flex flex-col items-center justify-center bg-stone-100 dark:bg-stone-800/80 rounded border border-stone-200 dark:border-stone-700/60 text-center px-4">
              <p className="text-xs font-mono text-stone-500 dark:text-stone-400">
                &lt;!-- Google AdSense Responsive Leaderboard Unit [Slot ID: 9812401] --&gt;
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                Prime top-of-feed placement for Google AdSense or Direct Display Campaigns.
              </p>
            </div>
          ) : (
            <a
              href="#sponsor"
              onClick={(e) => {
                e.preventDefault();
                onOpenAdManager?.();
              }}
              className="h-20 sm:h-24 w-full flex items-center justify-between bg-gradient-to-r from-stone-900 to-stone-800 dark:from-stone-950 dark:to-stone-900 text-stone-100 rounded px-4 sm:px-6 hover:opacity-95 transition-opacity"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-medium tracking-wide text-white">
                    Vellum Letterpress &amp; Type Foundry
                  </h4>
                  <p className="text-xs text-stone-300 line-clamp-1">
                    Authentic editorial serifs and archival bookbinding supplies for discerning publishers.
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-sans text-amber-200 hover:text-amber-100 border border-amber-400/40 px-3 py-1.5 rounded transition-colors whitespace-nowrap">
                Explore Sponsor <ExternalLink className="w-3 h-3" />
              </span>
            </a>
          )}
        </div>

        {showCodeModal && (
          <AdCodeModal type="728x90 Leaderboard" onClose={() => setShowCodeModal(false)} />
        )}
      </div>
    );
  }

  if (type === 'sidebar') {
    return (
      <div className="w-full my-4">
        <div className="border border-dashed border-stone-300 dark:border-stone-700 bg-stone-50/60 dark:bg-stone-900/60 p-3 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between pb-2 text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-300 font-sans">
            <span className="flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70"></span>
              Sponsored · 300×250 Slot
            </span>
            <button
              onClick={() => setShowCodeModal(true)}
              className="hover:text-stone-700 dark:hover:text-stone-300 cursor-pointer"
              title="AdSense Code"
            >
              <Code2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {isWireframe ? (
            <div className="h-60 w-full flex flex-col items-center justify-center bg-stone-100 dark:bg-stone-800/80 rounded border border-stone-200 dark:border-stone-700 text-center p-4">
              <div className="text-xs font-mono text-stone-500 dark:text-stone-400 mb-2">
                300×250 Medium Rectangle
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Reserved sticky sidebar slot. Insert your Google AdSense or affiliate banner here.
              </p>
            </div>
          ) : (
            <div className="p-4 bg-stone-100 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
              <div className="text-[10px] uppercase tracking-widest text-amber-700 dark:text-amber-400 font-medium mb-1">
                Featured Partner
              </div>
              <h5 className="font-serif text-base font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                The Scribe Guild — Masterclass in Literary Non-Fiction
              </h5>
              <p className="text-xs text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
                Join 12,000+ authors mastering narrative structure, archival research, and editorial pitching.
              </p>
              <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-700 flex items-center justify-between">
                <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">30-Day Fellowship</span>
                <button
                  onClick={onOpenAdManager}
                  className="text-xs font-medium text-stone-900 dark:text-stone-100 hover:underline flex items-center gap-1"
                >
                  Learn More &rarr;
                </button>
              </div>
            </div>
          )}
        </div>

        {showCodeModal && (
          <AdCodeModal type="300x250 Medium Rectangle" onClose={() => setShowCodeModal(false)} />
        )}
      </div>
    );
  }

  if (type === 'in-feed') {
    return (
      <div className="w-full col-span-full my-4">
        <div className="border border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-900/60 p-5 rounded-lg">
          <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-300 mb-2 font-sans">
            <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Sponsored Editorial Feature · Brand Partnership
            </span>
            <button
              onClick={() => setShowCodeModal(true)}
              className="hover:text-stone-700 dark:hover:text-stone-300 flex items-center gap-1 text-[11px]"
            >
              <Code2 className="w-3 h-3" /> Slot Spec
            </button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="max-w-2xl">
              <h4 className="text-lg font-serif font-semibold text-stone-900 dark:text-stone-100">
                Crafting Enduring Publications in the Digital Era
              </h4>
              <p className="text-sm text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                Learn how premier independent publishers combine custom typography, subscriber loyalty, and ethical ad placements.
              </p>
            </div>
            <button
              onClick={onOpenAdManager}
              className="self-start md:self-center px-4 py-2 text-xs font-medium text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 rounded hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              View Sponsorship Details
            </button>
          </div>
        </div>

        {showCodeModal && (
          <AdCodeModal type="In-Feed Native Ad" onClose={() => setShowCodeModal(false)} />
        )}
      </div>
    );
  }

  // in-article ad slot
  return (
    <div className="w-full my-8 max-w-prose mx-auto">
      <div className="border border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-900/60 p-4 rounded-lg">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
          <span>Advertisement · In-Article Break</span>
          <button
            onClick={() => setShowCodeModal(true)}
            className="hover:text-stone-700 dark:hover:text-stone-300 flex items-center gap-1"
          >
            <Code2 className="w-3 h-3" /> AdSense Tag
          </button>
        </div>
        <div className="py-4 text-center">
          <p className="text-sm font-serif italic text-stone-700 dark:text-stone-300">
            "Fine stationery and writing instruments for the modern essayist."
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Official Partner of Sahifa Journal
          </p>
        </div>
      </div>

      {showCodeModal && (
        <AdCodeModal type="In-Article Content Ad" onClose={() => setShowCodeModal(false)} />
      )}
    </div>
  );
};

interface AdCodeModalProps {
  type: string;
  onClose: () => void;
}

const AdCodeModal: React.FC<AdCodeModalProps> = ({ type, onClose }) => {
  const [copied, setCopied] = useState(false);

  const snippet = `<!-- Google AdSense / Monetization Tag: ${type} -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="1234567890"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg max-w-lg w-full p-6 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h3 className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-100">
              AdSense Slot Integration
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {type} · Google AdSense &amp; Header Bidding Ready
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-4">
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-3">
            To place your real Google AdSense or Sponsor Banner here in production, paste your publisher ID and slot snippet into this container:
          </p>
          <div className="relative">
            <pre className="p-3 bg-stone-900 text-stone-100 rounded text-xs font-mono overflow-x-auto">
              {snippet}
            </pre>
            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 px-2.5 py-1 text-xs bg-stone-700 hover:bg-stone-600 text-white rounded transition-colors cursor-pointer"
            >
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded hover:opacity-90 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
