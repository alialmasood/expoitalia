'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PaymentErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorData, setErrorData] = useState<{
    error?: string;
    transactionId?: string | null;
    code?: string | null;
  } | null>(null);

  useEffect(() => {
    const error = searchParams.get('error');
    const transactionId = searchParams.get('transactionId');
    const code = searchParams.get('code');
    
    if (error || transactionId) {
      setErrorData({
        error: error || 'حدث خطأ غير معروف',
        transactionId,
        code
      });
    }
  }, [searchParams]);

  const handleRetryPayment = () => {
    router.push('/application-review');
  };

  const handleContactSupport = () => {
    // يمكن إضافة رابط للتواصل مع الدعم
    window.open('mailto:support@cosmo.com?subject=مشكلة في الدفع', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-red-900 dark:to-gray-800">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 text-center">
          {/* أيقونة الخطأ */}
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          {/* رسالة الخطأ */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">حدث خطأ في عملية الدفع</h1>
          <p className="text-lg text-gray-600 mb-8">
            نعتذر، حدث خطأ أثناء معالجة طلبك. لم يتم خصم أي مبلغ من حسابك.
          </p>

          {/* تفاصيل الخطأ */}
          {errorData && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 text-left">
              <h3 className="text-lg font-semibold text-red-800 mb-3">تفاصيل الخطأ</h3>
              <div className="space-y-2 text-red-700">
                <div>
                  <span className="font-medium">الرسالة:</span>
                  <p className="mt-1">{errorData.error}</p>
                </div>
                {errorData.transactionId && (
                  <div>
                    <span className="font-medium">رقم المعاملة:</span>
                    <span className="font-mono text-sm ml-2">{errorData.transactionId}</span>
                  </div>
                )}
                {errorData.code && (
                  <div>
                    <span className="font-medium">رمز الخطأ:</span>
                    <span className="font-mono text-sm ml-2">{errorData.code}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* أسباب محتملة للخطأ */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">أسباب محتملة للخطأ:</h3>
            <ul className="text-left text-yellow-700 space-y-2">
              <li>• بيانات البطاقة الائتمانية غير صحيحة</li>
              <li>• الرصيد غير كافي في البطاقة</li>
              <li>• انتهت صلاحية البطاقة الائتمانية</li>
              <li>• تم رفض المعاملة من قبل البنك</li>
              <li>• مشكلة مؤقتة في شبكة الدفع</li>
            </ul>
          </div>

          {/* أزرار التحكم */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleContactSupport}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>التواصل مع الدعم</span>
            </button>
            <button
              onClick={handleRetryPayment}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>إعادة المحاولة</span>
            </button>
          </div>

          {/* رسالة إضافية */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>نصيحة:</strong> تأكد من صحة بيانات البطاقة الائتمانية قبل إعادة المحاولة. 
              إذا استمرت المشكلة، يرجى التواصل مع البنك المصدر للبطاقة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
