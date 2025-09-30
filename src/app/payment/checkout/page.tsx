'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TEST_CARD_DATA } from '@/lib/areeba-config';
import { validatePaymentData, formatCardNumber, formatExpiryDate } from '@/lib/payment-validation';

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // الحصول على البيانات من URL parameters
  const amount = searchParams.get('amount') || '50000';
  const description = searchParams.get('description') || 'دفع رسوم التأشيرة';
  const customerEmail = searchParams.get('email') || '';
  const customerName = searchParams.get('name') || '';

  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // تنسيق رقم البطاقة
    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    }
    // تنسيق تاريخ الانتهاء
    else if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    }
    // تحديد طول رمز الأمان
    else if (name === 'cvv' && value.length > 4) {
      formattedValue = value.substring(0, 4);
    }
    
    setCardData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // التحقق من صحة البيانات
      const validationResult = validatePaymentData({
        cardNumber: cardData.cardNumber,
        expiryDate: cardData.expiryDate,
        cvv: cardData.cvv,
        cardholderName: cardData.cardholderName,
        email: customerEmail,
        amount: parseInt(amount)
      });

      if (!validationResult.isValid) {
        setError(validationResult.errors.join('\n'));
        return;
      }

      // إرسال طلب بدء الدفع
      const response = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseInt(amount),
          description,
          customerEmail,
          customerName
        })
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'حدث خطأ في معالجة الدفع');
        return;
      }

      // توجيه المستخدم لبوابة الدفع
      if (result.paymentUrl) {
        // توجيه مباشر لبوابة أريبا
        window.location.href = result.paymentUrl;
        
        // إظهار رسالة تحذيرية إذا كان هناك تحذير
        if (result.warning) {
          alert(result.warning);
        }
      } else {
        setError('لم يتم إنشاء رابط الدفع');
      }

    } catch {
      setError('حدث خطأ في الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  const fillTestData = () => {
    setCardData(TEST_CARD_DATA);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <div className="text-white font-bold text-xl tracking-wider">COSMO</div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">دفع آمن</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">أدخل بيانات بطاقتك الائتمانية</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* معلومات الطلب */}
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">تفاصيل الطلب</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">الوصف:</span>
              <span className="font-medium">{description}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">المبلغ:</span>
              <span className="font-bold text-lg text-purple-600">{parseInt(amount).toLocaleString()} دينار عراقي</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">العميل:</span>
              <span className="font-medium">{customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">البريد الإلكتروني:</span>
              <span className="font-medium">{customerEmail}</span>
            </div>
          </div>
        </div>

        {/* نموذج الدفع */}
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">بيانات البطاقة الائتمانية</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* رقم البطاقة */}
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                رقم البطاقة
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={cardData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* تاريخ الانتهاء */}
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                  تاريخ الانتهاء
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={cardData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  maxLength={5}
                />
              </div>

              {/* رمز الأمان */}
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                  رمز الأمان (CVV)
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={cardData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  maxLength={4}
                />
              </div>
            </div>

            {/* اسم حامل البطاقة */}
            <div>
              <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-2">
                اسم حامل البطاقة
              </label>
              <input
                type="text"
                id="cardholderName"
                name="cardholderName"
                value={cardData.cardholderName}
                onChange={handleInputChange}
                placeholder="اسم حامل البطاقة كما هو مكتوب على البطاقة"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* زر البيانات التجريبية */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={fillTestData}
                className="text-sm text-purple-600 hover:text-purple-800 underline"
              >
                استخدام البيانات التجريبية للاختبار
              </button>
            </div>

            {/* رسالة الخطأ */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* أزرار التحكم */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>جاري المعالجة...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span>دفع الآن</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* معلومات الأمان */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className="text-sm text-blue-800">
              معاملاتك محمية بتشفير SSL. لن يتم حفظ بيانات بطاقتك الائتمانية على خوادمنا.
            </p>
          </div>
        </div>

        {/* تنبيه بوابة الدفع */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-blue-800">
              <strong>بوابة الدفع:</strong> سيتم توجيهك لبوابة أريبا الرسمية لإكمال عملية الدفع بأمان.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
