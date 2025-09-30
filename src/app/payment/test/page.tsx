'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function PaymentTestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // محاكاة تحميل صفحة الدفع
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      // محاكاة نتيجة الدفع (نجاح عشوائي)
      const isSuccess = Math.random() > 0.3; // 70% نسبة نجاح
      
      const transactionId = searchParams.get('transactionId') || 'TXN' + Date.now();
      const amount = searchParams.get('amount') || '50000';
      
      if (isSuccess) {
        router.push(`/payment/success?transactionId=${transactionId}&amount=${amount}&paymentId=PAY${Date.now()}`);
      } else {
        router.push(`/payment/error?transactionId=${transactionId}&error=تم رفض المعاملة من قبل البنك&code=DECLINED`);
      }
    }
  }, [loading, countdown, router, searchParams]);

  const handleCancel = () => {
    router.push('/payment/cancel');
  };

  const handleSuccess = () => {
    const transactionId = searchParams.get('transactionId') || 'TXN' + Date.now();
    const amount = searchParams.get('amount') || '50000';
    router.push(`/payment/success?transactionId=${transactionId}&amount=${amount}&paymentId=PAY${Date.now()}`);
  };

  const handleError = () => {
    const transactionId = searchParams.get('transactionId') || 'TXN' + Date.now();
    router.push(`/payment/error?transactionId=${transactionId}&error=خطأ في البطاقة الائتمانية&code=CARD_ERROR`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">جاري التحميل...</h2>
          <p className="text-gray-600">يتم الآن تحضير صفحة الدفع</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 text-center">
          {/* شعار بوابة أريبا */}
          <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">A</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">بوابة الدفع - أريبا</h1>
          <p className="text-lg text-gray-600 mb-8">
            صفحة الدفع التجريبية (وضع الاختبار)
          </p>

          {/* تفاصيل المعاملة */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">تفاصيل المعاملة</h3>
            <div className="space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">رقم المعاملة:</span>
                <span className="font-mono text-sm">{searchParams.get('transactionId') || 'TXN' + Date.now()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">المبلغ:</span>
                <span className="font-bold text-purple-600">{parseInt(searchParams.get('amount') || '50000').toLocaleString()} دينار عراقي</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">العملة:</span>
                <span className="font-medium">IQD</span>
              </div>
            </div>
          </div>

          {/* البيانات التجريبية */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">البيانات التجريبية</h3>
            <div className="text-left text-blue-700 space-y-2">
              <p><strong>رقم البطاقة:</strong> 5123 4500 0000 0008</p>
              <p><strong>تاريخ الانتهاء:</strong> 01/39</p>
              <p><strong>رمز الأمان:</strong> 123</p>
              <p><strong>اسم حامل البطاقة:</strong> test</p>
            </div>
          </div>

          {/* العد التنازلي */}
          {countdown > 0 && (
            <div className="mb-8">
              <p className="text-gray-600 mb-4">
                سيتم معالجة الدفع تلقائياً خلال:
              </p>
              <div className="text-4xl font-bold text-purple-600 mb-4">{countdown}</div>
            </div>
          )}

          {/* أزرار التحكم */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={handleCancel}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>إلغاء</span>
            </button>
            
            <button
              onClick={handleSuccess}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>نجاح</span>
            </button>
            
            <button
              onClick={handleError}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span>خطأ</span>
            </button>
          </div>

          {/* رسالة تحذيرية */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>تنبيه:</strong> هذه صفحة تجريبية للاختبار. في الإنتاج الحقيقي، 
              ستكون هذه صفحة الدفع الفعلية من بوابة أريبا.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
