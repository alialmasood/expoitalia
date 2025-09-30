'use client';

import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

export default function DashboardPage() {
  const { user, loading, logout } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cosmoprof Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back, {user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome Card */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to Cosmoprof Worldwide 2026
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You are now logged in to your exhibition account. Here you can access all the features and information about the Cosmoprof Worldwide 2026 event.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
                    Exhibition Details
                  </h3>
                  <p className="text-purple-700 dark:text-purple-300 text-sm">
                    March 26-29, 2026<br />
                    Bologna Fiere Exhibition Center
                  </p>
                </div>
                
                <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-pink-900 dark:text-pink-100 mb-2">
                    Your Account
                  </h3>
                  <p className="text-pink-700 dark:text-pink-300 text-sm">
                    Email: {user.email}<br />
                    Status: Active
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Information Card */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Personal Information
              </h2>
              
              <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
                {/* Profile Photo */}
                <div className="flex-shrink-0">
                  <div className="w-48 h-64 border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                    <Image 
                      src="/images/photo-placeholder.jpg" 
                      alt="Profile Photo" 
                      width={192} 
                      height={256} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Personal Details */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Full Name
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-lg">
                      SAJJAD RADHI ABDULHUSSSEIN BEETARWEIMI
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Date of Birth
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-lg">
                      September 4, 1996
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Place of Birth
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-lg">
                      Basra, Iraq
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Passport Number
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-lg font-mono">
                      B22547863
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                                 <button 
                   onClick={() => router.push('/visa-application')}
                   className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition duration-200 font-medium"
                 >
                   Application for Schengen Visa
                 </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition duration-200">
                  View Schedule
                </button>
                <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-4 rounded-lg transition duration-200">
                  Browse Exhibitors
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition duration-200">
                  Contact Support
                </button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500">📞</span>
                  <span className="text-gray-700 dark:text-gray-300">+48-666202049</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500">💬</span>
                  <span className="text-gray-700 dark:text-gray-300">+48-666202049</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500">✉️</span>
                  <span className="text-gray-700 dark:text-gray-300">enquiry@expostandservice.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
