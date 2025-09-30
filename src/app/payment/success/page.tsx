'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [transactionData, setTransactionData] = useState<any>(null);

  useEffect(() => {
    const transactionId = searchParams.get('transactionId');
    const amount = searchParams.get('amount');
    const paymentId = searchParams.get('paymentId');
    
    if (transactionId) {
      setTransactionData({
        transactionId,
        amount,
        paymentId
      });
    }
  }, [searchParams]);

  const handleContinue = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-green-900 dark:to-gray-800">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 text-center">
          {/* أيقونة النجاح */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* رسالة النجاح */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">تم الدفع بنجاح!</h1>
          <p className="text-lg text-gray-600 mb-8">
            شكراً لك! تمت معالجة طلبك بنجاح وسيتم إرسال رسالة تأكيد إلى بريدك الإلكتروني.
          </p>

          {/* تفاصيل المعاملة */}
          {transactionData && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">تفاصيل المعاملة</h3>
              <div className="space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">رقم المعاملة:</span>
                  <span className="font-mono text-sm">{transactionData.transactionId}</span>
                </div>
                {transactionData.paymentId && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">رقم الدفع:</span>
                    <span className="font-mono text-sm">{transactionData.paymentId}</span>
                  </div>
                )}
                {transactionData.amount && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">المبلغ:</span>
                    <span className="font-bold text-green-600">{parseInt(transactionData.amount).toLocaleString()} دينار عراقي</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">الحالة:</span>
                  <span className="text-green-600 font-semibold">مكتملة</span>
                </div>
              </div>
            </div>
          )}

          {/* أزرار التحكم */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.print()}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>طباعة الإيصال</span>
            </button>
            <button
              onClick={handleContinue}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center justify-center space-x-2"
            >
              <span>المتابعة للوحة التحكم</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          {/* رسالة إضافية */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>ملاحظة:</strong> قد تستغرق معالجة طلبك مدة تصل إلى 24 ساعة. 
              سيتم إشعارك عبر البريد الإلكتروني عند اكتمال المعالجة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
