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
    }, 8000);

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
      }, 500);
    } catch (error) {
      console.error('Failed to fetch quote:', error);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>

      {/* Floating Gradient Orbs - Subtle */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-gray-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-gray-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gray-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-shimmer {
          animation: shimmer 8s infinite;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 1000px 100%;
        }
      `}</style>

      {/* Main Content */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 md:px-6">
        <div className="max-w-6xl w-full">
          {/* Hero Section */}
          <div className="text-center mb-16 space-y-8">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-gray-50 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-600"></span>
              </span>
              <span className="text-sm font-medium text-gray-700">Daily Motivation</span>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900">
                Alex Hormozi
              </h1>
              <h2 className="text-3xl md:text-5xl font-semibold text-gray-700">
                Quotes Widget
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mt-6">
                Carry powerful wisdom in your pocket. Display motivational quotes on your iPhone lock screen and home screen widgets.
              </p>
            </div>
          </div>

          {/* Quote Display Card - Enhanced */}
          <div className="mb-16 mx-auto max-w-4xl">
            <div className={`relative group transition-all duration-700 ease-out ${
              isAnimating ? 'scale-95 opacity-0 blur-sm' : 'scale-100 opacity-100 blur-0'
            }`}>
              {/* Card Content */}
              <div className="relative bg-white backdrop-blur-xl rounded-3xl border-2 border-gray-200 p-8 md:p-12 shadow-lg">
                {/* Top Decoration */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-gray-300"></div>
                
                {currentQuote && (
                  <div className="space-y-8">
                    {/* Quote Icon */}
                    <div className="flex justify-center">
                      <svg className="w-12 h-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    {/* Quote Text */}
                    <p className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed text-gray-900 text-center">
                      {currentQuote.quote}
                    </p>

                    {/* Author Info */}
                    <div className="pt-6 border-t border-gray-200 text-center space-y-2">
                      <p className="text-xl font-semibold text-gray-900">
                        — {currentQuote.author}
                      </p>
                      {currentQuote.work && (
                        <p className="text-sm text-gray-600">{currentQuote.work}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Bottom Decoration */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-32 h-1 bg-gray-300"></div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
            {[
              { icon: '📱', title: 'Lock Screen Widget', desc: 'See quotes every time you check your phone' },
              { icon: '🏠', title: 'Home Screen Widget', desc: 'Beautiful widgets in multiple sizes' },
              { icon: '💾', title: 'Save Favorites', desc: 'Build your personal collection of quotes' },
              { icon: '🔄', title: 'Daily Updates', desc: 'Fresh motivation every single day' },
              { icon: '✨', title: 'Clean Design', desc: 'Minimal, distraction-free interface' },
              { icon: '🚀', title: 'Instant Access', desc: 'No login required, start immediately' }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-gray-400 transition-all duration-300 hover:scale-105 shadow-sm"
              >
                <div className="relative">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-8">
            {/* Main CTA Button */}
            <div className="flex flex-col items-center gap-4">
              <button
                className="group relative inline-flex items-center justify-center px-12 py-5 overflow-hidden font-bold text-white bg-gray-900 hover:bg-gray-800 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => alert('Download link coming soon!')}
              >
                
                {/* Button Content */}
                <span className="relative flex items-center gap-3 text-xl">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                  Download for iOS
                </span>
              </button>

              <p className="text-sm text-gray-600">Free • iOS 16+ • No Ads</p>
            </div>

            {/* App Preview Mock */}
            <div className="mt-16 max-w-sm mx-auto">
              <div className="relative">
                {/* Phone Frame */}
                <div className="bg-gray-900 rounded-[3rem] p-3 border-4 border-gray-800 shadow-2xl">
                  <div className="bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
                    {/* Status Bar */}
                    <div className="bg-white h-8 flex items-center justify-between px-8 text-xs text-gray-900">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-3 border border-white rounded-sm"></div>
                        <div className="w-3 h-3 border border-white rounded-sm"></div>
                      </div>
                    </div>
                    
                    {/* Widget Preview */}
                    <div className="p-4 space-y-4">
                      <div className="bg-gray-900 rounded-3xl p-6 shadow-xl">
                        <p className="text-white text-sm font-medium leading-relaxed">
                          "The only way to do great work is to love what you do."
                        </p>
                        <p className="text-gray-400 text-xs mt-3">— Alex Hormozi</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Subtle Shadow */}
                <div className="absolute inset-0 bg-gray-200/30 blur-3xl -z-10"></div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-24 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>Made with 💜 for entrepreneurs and dreamers</p>
          </div>
        </div>
      </main>
    </div>
  );
}