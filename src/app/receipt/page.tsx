'use client';

import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ReceiptPage() {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [receiptData, setReceiptData] = useState<{
    transactionId: string;
    amount: string;
    currency: string;
    paymentMethod: string;
    paymentDate: string;
    customerName: string;
    customerEmail: string;
    service: string;
    status: string;
  } | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // محاكاة بيانات الوصل
    const mockReceiptData = {
      receiptNumber: `REC-${Date.now()}`,
      transactionId: searchParams.get('transactionId') || `TXN${Date.now()}`,
      amount: searchParams.get('amount') || '500.00',
      currency: searchParams.get('currency') || 'IQD',
      paymentMethod: 'Credit Card',
      paymentDate: new Date().toLocaleString('ar-IQ'),
      customerName: user?.displayName || 'SAJJAD RADHI ABDULHUSSSEIN BEETARWEIMI',
      customerEmail: user?.email || 'user@example.com',
      service: 'Entry Receipt Payment - Expo Italia',
      status: 'Completed'
    };
    setReceiptData(mockReceiptData);
  }, [user, searchParams]);

  const handlePrint = () => {
    window.print();
  };

  const handleBackToDashboard = () => {
    router.push('/dashboard');
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-green-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <div className="text-white font-bold text-xl tracking-wider">COSMO</div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">طباعة الوصل</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">إيصال الدفع</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                العودة للوحة التحكم
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* الوصل */}
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-8 print:shadow-none print:border-none">
          {/* Header الوصل */}
          <div className="text-center mb-8 border-b border-gray-200 pb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">إيصال الدفع</h2>
            <p className="text-gray-600">Payment Receipt</p>
            <div className="mt-4 text-sm text-gray-500">
              <p>Expo Italia - COSMO Platform</p>
              <p>www.cosmo.com</p>
            </div>
          </div>

          {/* تفاصيل الوصل */}
          {receiptData && (
            <div className="space-y-6">
              {/* معلومات المعاملة */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">معلومات المعاملة</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">رقم الوصل:</span>
                      <span className="font-mono font-medium">{receiptData.receiptNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">رقم المعاملة:</span>
                      <span className="font-mono font-medium">{receiptData.transactionId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">التاريخ والوقت:</span>
                      <span className="font-medium">{receiptData.paymentDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الحالة:</span>
                      <span className="text-green-600 font-semibold">{receiptData.status}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">تفاصيل الدفع</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">الخدمة:</span>
                      <span className="font-medium">{receiptData.service}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">طريقة الدفع:</span>
                      <span className="font-medium">{receiptData.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">المبلغ:</span>
                      <span className="font-bold text-lg text-green-600">{parseInt(receiptData.amount).toLocaleString()} {receiptData.currency}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* معلومات العميل */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">معلومات العميل</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">الاسم:</span>
                    <p className="font-medium mt-1">{receiptData.customerName}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">البريد الإلكتروني:</span>
                    <p className="font-medium mt-1">{receiptData.customerEmail}</p>
                  </div>
                </div>
              </div>

              {/* ملاحظات */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">ملاحظات مهمة</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• احتفظ بهذا الإيصال كدليل على الدفع</li>
                  <li>• هذا الإيصال صالح للاستخدام الرسمي</li>
                  <li>• في حالة وجود استفسارات، يرجى التواصل مع الدعم</li>
                </ul>
              </div>
            </div>
          )}

          {/* Footer الوصل */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>شكراً لاستخدامك منصة COSMO</p>
            <p className="mt-1">Thank you for using COSMO Platform</p>
            <p className="mt-2 font-medium">© 2024 COSMO. All rights reserved.</p>
          </div>
        </div>

        {/* أزرار التحكم */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 print:hidden">
          <button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>طباعة الوصل</span>
          </button>
          <button
            onClick={handleBackToDashboard}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>العودة للوحة التحكم</span>
          </button>
        </div>
      </div>
    </div>
  );
}
