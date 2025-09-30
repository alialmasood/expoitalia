'use client';

import { useState } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuthContext();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const result = await signIn(email, password);
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side - Information and Images */}
          <div className="space-y-8">
            {/* Main Title */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Global Beauty Meets in Bologna
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                Cosmoprof Worldwide 2026
              </p>
            </div>

            {/* Information */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The World&apos;s Most Influential Beauty Industry Gathering</h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>• <strong>3,000+</strong> exhibitors from more than <strong>70</strong> countries</p>
                <p>• <strong>250,000+</strong> expected professionals</p>
                <p>• Three main sectors: Fragrances, Beauty Salons, Packaging</p>
                <p>• Latest innovations in personal care and skincare</p>
              </div>
            </div>

                         {/* Images */}
             <div className="grid grid-cols-3 gap-4">
               <div className="relative h-32 rounded-lg overflow-hidden shadow-lg">
                 <Image
                   src="/images/fragrances.jpg"
                   alt="Fragrances"
                   fill
                   className="object-cover"
                 />
                 <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                   <span className="text-white font-semibold text-sm">Fragrances</span>
                 </div>
               </div>
               <div className="relative h-32 rounded-lg overflow-hidden shadow-lg">
                 <Image
                   src="/images/beauty.jpg"
                   alt="Beauty"
                   fill
                   className="object-cover"
                 />
                 <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                   <span className="text-white font-semibold text-sm">Beauty</span>
                 </div>
               </div>
               <div className="relative h-32 rounded-lg overflow-hidden shadow-lg">
                 <Image
                   src="/images/care.jpg"
                   alt="Care"
                   fill
                   className="object-cover"
                 />
                 <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                   <span className="text-white font-semibold text-sm">Care</span>
                 </div>
               </div>
               <div className="relative h-32 rounded-lg overflow-hidden shadow-lg">
                 <Image
                   src="/images/spa.jpg"
                   alt="Spa"
                   fill
                   className="object-cover"
                 />
                 <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                   <span className="text-white font-semibold text-sm">Spa</span>
                 </div>
               </div>
               <div className="relative h-32 rounded-lg overflow-hidden shadow-lg">
                 <Image
                   src="/images/nails.jpg"
                   alt="Nails"
                   fill
                   className="object-cover"
                 />
                 <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                   <span className="text-white font-semibold text-sm">Nails</span>
                 </div>
               </div>
               <div className="relative h-32 rounded-lg overflow-hidden shadow-lg">
                 <Image
                   src="/images/products.jpg"
                   alt="Products"
                   fill
                   className="object-cover"
                 />
                 <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                   <span className="text-white font-semibold text-sm">Products</span>
                 </div>
               </div>
             </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 dark:text-purple-400 text-sm">🎯</span>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Live Shows</p>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
                <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-pink-600 dark:text-pink-400 text-sm">🎓</span>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Educational Seminars</p>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 dark:text-blue-400 text-sm">🤝</span>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Networking</p>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 dark:text-green-400 text-sm">🌱</span>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Organic Products</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-400 text-lg">📞</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Phone</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">+48-666202049</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 text-lg">💬</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">WhatsApp</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">+48-666202049</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 text-lg">✉️</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Email</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">enquiry@expostandservice.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                    <span className="text-red-600 dark:text-red-400 text-lg">📹</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Skype</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Exhibition Stand</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-full max-w-md">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                {/* Login Title */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Exhibition Login
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Enter your credentials to access your Cosmoprof account
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-200"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label 
                      htmlFor="password" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-200"
                      placeholder="Enter your password"
                    />
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-purple-400 disabled:to-pink-400 text-white font-medium py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Logging in...
                      </div>
                    ) : (
                      'Login to Exhibition'
                    )}
                  </button>
                </form>

                {/* Additional Information */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    Bologna Fiere Exhibition Center • Halls 14, 21, 26, 36
                  </p>
                  
                  {/* Contact Information Mini */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Contact Us</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-gray-500 dark:text-gray-400">📞</span>
                        <span className="text-gray-700 dark:text-gray-300">+48-666202049</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-gray-500 dark:text-gray-400">💬</span>
                        <span className="text-gray-700 dark:text-gray-300">+48-666202049</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-gray-500 dark:text-gray-400">✉️</span>
                        <span className="text-gray-700 dark:text-gray-300">enquiry@expostandservice.com</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-gray-500 dark:text-gray-400">📹</span>
                        <span className="text-gray-700 dark:text-gray-300">Exhibition Stand</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
