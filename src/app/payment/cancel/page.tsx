'use client';

import { useRouter } from 'next/navigation';

export default function PaymentCancelPage() {
  const router = useRouter();

  const handleRetryPayment = () => {
    router.push('/application-review');
  };

  const handleGoHome = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-yellow-900 dark:to-gray-800">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 text-center">
          {/* أيقونة الإلغاء */}
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>

          {/* رسالة الإلغاء */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">تم إلغاء عملية الدفع</h1>
          <p className="text-lg text-gray-600 mb-8">
            لم تكتمل عملية الدفع. لم يتم خصم أي مبلغ من حسابك.
          </p>

          {/* معلومات إضافية */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">لماذا تم إلغاء الدفع؟</h3>
            <ul className="text-left text-yellow-700 space-y-2">
              <li>• تم الضغط على زر &quot;إلغاء&quot; أثناء عملية الدفع</li>
              <li>• تم إغلاق نافذة الدفع قبل إكمال العملية</li>
              <li>• انتهت مهلة انتظار عملية الدفع</li>
            </ul>
          </div>

          {/* أزرار التحكم */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoHome}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>العودة للوحة التحكم</span>
            </button>
            <button
              onClick={handleRetryPayment}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>إعادة المحاولة</span>
            </button>
          </div>

          {/* رسالة مساعدة */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>تحتاج مساعدة؟</strong> إذا كنت تواجه مشاكل في الدفع، 
              يرجى التواصل معنا على البريد الإلكتروني: support@cosmo.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
