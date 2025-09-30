'use client';

import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <div className="text-white font-bold text-xl tracking-wider">COSMO</div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cosmoprof Worldwide</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Cosmoprof Worldwide 2026</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">March 26-29, 2026</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Bologna, Italy</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Global Beauty Meets in Bologna
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Cosmoprof Worldwide 2026 - The World&apos;s Most Influential Beauty Industry Gathering
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">3,000+ Exhibitors</h3>
              <p className="text-gray-600 dark:text-gray-400">from more than 70 countries</p>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">250,000+ Professionals</h3>
              <p className="text-gray-600 dark:text-gray-400">expected to attend</p>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl mb-3">🏛️</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">4 Main Halls</h3>
              <p className="text-gray-600 dark:text-gray-400">14, 21, 26, 36</p>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              href="/login"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-4 px-8 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 text-lg"
            >
              Login to Exhibition
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Access your Cosmoprof Worldwide 2026 account
            </p>
          </div>
        </div>
      </div>

      {/* Exhibition Overview Section */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About Cosmoprof Worldwide 2026
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The world&apos;s most influential beauty industry gathering in the heart of Italy
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                A Complete Beauty Experience
              </h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Cosmoprof Worldwide 2026 in Bologna will be a comprehensive beauty experience, presenting the latest in personal care, skincare, fragrances, and professional salon services. The exhibition will showcase luxury brands, specialized products, and independent labels in Hall 14&apos;s CosmoPrime pavilion.
                </p>
                <p>
                  Skincare and fragrance innovations will be highlighted in Halls 26 and 36, while Hall 21 will feature organic and eco-friendly solutions, including cruelty-free, sustainable, and vegan products.
                </p>
                <p>
                  The exhibition will host live product demonstrations, educational seminars, and the latest developments in hair care, nail art, spa treatments, and more. World-renowned artists will showcase new trends and techniques in exclusive events like &quot;On Hair&quot; and &quot;On Hair Education.&quot;
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Highlights</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">3,000+ exhibitors from 70+ countries</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">250,000+ beauty professionals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">4 specialized exhibition halls</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Live demonstrations and workshops</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Networking opportunities</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏛️</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Venue</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Bologna Fiere Exhibition Center<br />
                Bologna, Italy
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Dates</h4>
              <p className="text-gray-600 dark:text-gray-400">
                March 26-29, 2026<br />
                4 Days of Beauty Innovation
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Focus</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Professional Beauty Industry<br />
                Innovation & Trends
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Why Attend Cosmoprof Worldwide 2026?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Discover Innovation</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Latest products and technologies</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Network</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Connect with industry leaders</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Learn</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Educational seminars and workshops</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Experience</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Live demonstrations and trends</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
