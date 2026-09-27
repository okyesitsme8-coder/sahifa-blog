import React from 'react';
import { X, DollarSign, Check, ToggleLeft, ToggleRight, Info, Code2 } from 'lucide-react';
import { AdSettings } from '../types/blog';

interface AdSettingsModalProps {
  settings: AdSettings;
  onUpdateSettings: (newSettings: AdSettings) => void;
  onClose: () => void;
}

export const AdSettingsModal: React.FC<AdSettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl max-w-xl w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                Ad Spaces &amp; Monetization Studio
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Manage your advertising inventory, AdSense tags, and sponsor slots
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-6 space-y-5 text-xs text-stone-700 dark:text-stone-300">
          {/* Master Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-stone-50 dark:bg-stone-800/60 rounded-lg border border-stone-200 dark:border-stone-700/60">
            <div>
              <div className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                Enable Ad Placements
              </div>
              <p className="text-stone-500 dark:text-stone-400 text-xs mt-0.5">
                Displays designated advertising areas across the feed, sidebar, and inside articles.
              </p>
            </div>
            <button
              onClick={() => onUpdateSettings({ ...settings, enabled: !settings.enabled })}
              className="text-2xl text-stone-900 dark:text-stone-100 cursor-pointer"
            >
              {settings.enabled ? (
                <ToggleRight className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-stone-400" />
              )}
            </button>
          </div>

          {/* Mode Switcher: Graphic Sponsor vs Clean Wireframe */}
          <div>
            <label className="block uppercase tracking-wider font-semibold text-stone-500 mb-2">
              Ad Slot Display Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onUpdateSettings({ ...settings, mode: 'graphic' })}
                className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                  settings.mode === 'graphic'
                    ? 'border-amber-600 bg-amber-50/50 dark:bg-amber-950/30 text-amber-950 dark:text-amber-200'
                    : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800'
                }`}
              >
                <div className="font-semibold text-xs flex items-center justify-between">
                  <span>Graphic Brand Sponsor</span>
                  {settings.mode === 'graphic' && <Check className="w-3.5 h-3.5" />}
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                  Displays styled sponsor banners with logos, copy, and CTAs.
                </p>
              </button>

              <button
                type="button"
                onClick={() => onUpdateSettings({ ...settings, mode: 'wireframe' })}
                className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                  settings.mode === 'wireframe'
                    ? 'border-amber-600 bg-amber-50/50 dark:bg-amber-950/30 text-amber-950 dark:text-amber-200'
                    : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800'
                }`}
              >
                <div className="font-semibold text-xs flex items-center justify-between">
                  <span>AdSense Blueprint</span>
                  {settings.mode === 'wireframe' && <Check className="w-3.5 h-3.5" />}
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                  Shows slot dimensions (728×90, 300×250) and ready code snippets.
                </p>
              </button>
            </div>
          </div>

          {/* Inventory Breakdown */}
          <div className="border-t border-stone-200 dark:border-stone-800 pt-4">
            <span className="block uppercase tracking-wider font-semibold text-stone-500 mb-2">
              Slot Placements Included:
            </span>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between p-2 rounded bg-stone-50 dark:bg-stone-800/40">
                <span className="font-medium text-stone-800 dark:text-stone-200">
                  1. Top Leaderboard Banner (728×90 / Responsive)
                </span>
                <span className="font-mono text-stone-500">Above post feed</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded bg-stone-50 dark:bg-stone-800/40">
                <span className="font-medium text-stone-800 dark:text-stone-200">
                  2. Sidebar Sticky Rectangle (300×250)
                </span>
                <span className="font-mono text-stone-500">Beside articles</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded bg-stone-50 dark:bg-stone-800/40">
                <span className="font-medium text-stone-800 dark:text-stone-200">
                  3. In-Feed Sponsored Card
                </span>
                <span className="font-mono text-stone-500">Native stream</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded bg-stone-50 dark:bg-stone-800/40">
                <span className="font-medium text-stone-800 dark:text-stone-200">
                  4. In-Article Mid-Break
                </span>
                <span className="font-mono text-stone-500">Inside reader view</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-stone-200 dark:border-stone-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-lg hover:opacity-90 cursor-pointer"
          >
            Apply &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
