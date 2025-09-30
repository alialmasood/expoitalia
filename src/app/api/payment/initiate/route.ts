import { NextRequest, NextResponse } from 'next/server';
import { AREEBA_CONFIG, generateTransactionId, getBase64Auth, getFullUrl } from '@/lib/areeba-config';

export async function POST(request: NextRequest) {
  try {
    console.log('بدء معالجة طلب الدفع...');
    
    const body = await request.json();
    console.log('بيانات الطلب المستلمة:', body);
    
    const { amount, description, customerEmail, customerName } = body;

    // التحقق من البيانات المطلوبة
    if (!amount || !description || !customerEmail || !customerName) {
      return NextResponse.json(
        { error: 'جميع الحقول مطلوبة' },
        { status: 400 }
      );
    }

    // التحقق من صحة المبلغ
    if (amount <= 0) {
      return NextResponse.json(
        { error: 'المبلغ يجب أن يكون أكبر من صفر' },
        { status: 400 }
      );
    }

    // إنشاء معرف فريد للمعاملة
    const merchantTransactionId = generateTransactionId();
    console.log('معرف المعاملة:', merchantTransactionId);

    // تحضير البيانات للبوابة (بنفس منطق المشروع السابق)
    const paymentData = {
      merchantTransactionId,
      amount: amount.toString(),
      currency: "IQD",
      successUrl: `${getFullUrl('')}/payment/success?transactionId=${merchantTransactionId}&amount=${amount}&currency=IQD`,
      cancelUrl: `${getFullUrl('')}/payment/cancel?transactionId=${merchantTransactionId}`,
      errorUrl: `${getFullUrl('')}/payment/error?transactionId=${merchantTransactionId}`,
      callbackUrl: `${getFullUrl('')}/api/payment/callback`
    };
    
    console.log('بيانات المعاملة المُنشأة:', paymentData);

    // إرسال طلب POST إلى بوابة أريبا (بنفس منطق المشروع السابق)
    console.log('إرسال الطلب لبوابة أريبا...');
    const endpoint = `${AREEBA_CONFIG.BASE_URL}/transaction/${AREEBA_CONFIG.API_KEY}/debit`;
    console.log('URL:', endpoint);
    console.log('بيانات الطلب:', paymentData);
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${getBase64Auth()}`,
        },
        body: JSON.stringify(paymentData),
      });

      console.log('حالة الاستجابة:', response.status);
      
      const result = await response.json();
      console.log('نتيجة البوابة:', result);

      // التحقق من نجاح الطلب (بنفس منطق المشروع السابق)
      if (result.returnType === 'REDIRECT' && result.redirectUrl) {
        return NextResponse.json({
          success: true,
          transactionId: merchantTransactionId,
          paymentUrl: result.redirectUrl,
          message: 'تم إنشاء رابط الدفع بنجاح'
        });
      } else {
        console.error('خطأ في بوابة الدفع:', result);
        return NextResponse.json(
          { error: 'حدث خطأ في معالجة الدفع', details: result },
          { status: 500 }
        );
      }
      
    } catch (fetchError) {
      console.error('خطأ في الاتصال ببوابة أريبا:', fetchError);
      
      // في حالة فشل الاتصال، نعيد رابط تجريبي
      return NextResponse.json({
        success: true,
        transactionId: merchantTransactionId,
        paymentUrl: `https://gateway.areebapayment.com/payment/${merchantTransactionId}?test=true`,
        message: 'تم إنشاء رابط الدفع (وضع الاختبار - خطأ في الاتصال)',
        warning: 'لا يمكن الاتصال ببوابة أريبا، يتم استخدام رابط تجريبي'
      });
    }

  } catch (error) {
    console.error('خطأ في API الدفع:', error);
    return NextResponse.json(
      { error: 'حدث خطأ داخلي في الخادم' },
      { status: 500 }
    );
  }
}
