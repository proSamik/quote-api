'use client';

import { useEffect, useState } from 'react';

interface Quote {
  quote: string;
  author: string;
  work: string;
  categories: string[];
}

export default function Home() {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    fetchRandomQuote();
    const interval = setInterval(() => {
      fetchRandomQuote();
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchRandomQuote = async () => {
    try {
      setIsAnimating(true);
      const response = await fetch('/api/quote/day');
      const data = await response.json();

      setTimeout(() => {
        setCurrentQuote(data[0]);
        setIsAnimating(false);
      }, 300);
    } catch (error) {
      console.error('Failed to fetch quote:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl text-center">
          {/* Title */}
          <div className="mb-12 animate-fade-in">
            <h1 className="mb-4 text-6xl font-bold text-white md:text-7xl lg:text-8xl">
              Alex Hormozi
            </h1>
            <h2 className="text-3xl font-semibold text-purple-300 md:text-4xl lg:text-5xl">
              Quotes
            </h2>
            <p className="mt-6 text-xl text-slate-300">
              Daily wisdom from the master of business growth
            </p>
          </div>

          {/* Quote Display */}
          <div
            className={`mb-16 min-h-[300px] rounded-2xl border border-purple-500/30 bg-black/30 p-8 backdrop-blur-sm transition-all duration-300 md:p-12 ${
              isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
            }`}
          >
            {currentQuote && (
              <div className="space-y-6">
                <div className="text-4xl text-purple-400">&ldquo;</div>
                <p className="text-2xl font-medium leading-relaxed text-white md:text-3xl">
                  {currentQuote.quote}
                </p>
                <div className="pt-4">
                  <p className="text-lg font-semibold text-purple-300">
                    — {currentQuote.author}
                  </p>
                  <p className="text-sm text-slate-400">{currentQuote.work}</p>
                </div>
              </div>
            )}
          </div>

          {/* CTA Button */}
          <div className="flex flex-col items-center gap-6">
            <button
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-12 py-5 text-xl font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50"
              onClick={() => alert('App download coming soon!')}
            >
              <span className="relative z-10">Download App</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>

            <p className="text-sm text-slate-400">
              Get daily motivational quotes on your device
            </p>
          </div>

          {/* Feature Pills */}
          <div className="mt-16 flex flex-wrap justify-center gap-4">
            <div className="rounded-full border border-purple-500/30 bg-black/20 px-6 py-2 text-sm text-slate-300 backdrop-blur-sm">
              📱 iOS Widget
            </div>
            <div className="rounded-full border border-purple-500/30 bg-black/20 px-6 py-2 text-sm text-slate-300 backdrop-blur-sm">
              ⚡ Daily Updates
            </div>
            <div className="rounded-full border border-purple-500/30 bg-black/20 px-6 py-2 text-sm text-slate-300 backdrop-blur-sm">
              💎 Premium Quotes
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
