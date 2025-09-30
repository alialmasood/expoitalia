import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantTransactionId, status, amount, currency } = body;

    console.log('استلام callback من بوابة الدفع:', {
      merchantTransactionId,
      status,
      amount,
      currency
    });

    // التحقق من صحة البيانات
    if (!merchantTransactionId || !status) {
      return NextResponse.json(
        { error: 'بيانات غير صحيحة' },
        { status: 400 }
      );
    }

    // معالجة الحالات المختلفة (بنفس منطق المشروع السابق)
    if (status === 'SUCCESS') {
      console.log('معاملة ناجحة:', merchantTransactionId);
      // هنا يمكنك:
      // - تحديث قاعدة البيانات
      // - إرسال إيميل تأكيد
      // - تحديث حالة الطلب
      // - إرسال إشعار للمستخدم
    } else if (status === 'FAILED') {
      console.log('معاملة فشلت:', merchantTransactionId);
      // معالجة الفشل
      // - تحديث حالة الطلب
      // - إرسال إشعار للمستخدم
    } else if (status === 'CANCELLED') {
      console.log('معاملة ملغية:', merchantTransactionId);
      // معالجة الإلغاء
    }

    // الرد بـ 200 OK (مطلوب من بوابة أريبا)
    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('خطأ في معالجة callback:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في معالجة الإشعار' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantTransactionId = searchParams.get('merchantTransactionId');
    const status = searchParams.get('status');
    const amount = searchParams.get('amount');

    console.log('استلام GET callback:', { merchantTransactionId, status, amount });

    if (!merchantTransactionId || !status) {
      return NextResponse.json(
        { error: 'بيانات غير صحيحة' },
        { status: 400 }
      );
    }

    // معالجة البيانات بنفس الطريقة
    const result = await POST(request);
    return result;

  } catch (error) {
    console.error('خطأ في معالجة GET callback:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في معالجة الإشعار' },
      { status: 500 }
    );
  }
}
