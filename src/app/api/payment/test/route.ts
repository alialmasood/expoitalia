import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'API يعمل بشكل صحيح',
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    return NextResponse.json({
      success: true,
      message: 'تم استلام البيانات بنجاح',
      receivedData: body,
      transactionId: `TXN${Date.now()}`,
      paymentUrl: `/payment/test?transactionId=TXN${Date.now()}&amount=${body.amount || 50000}`
    });
  } catch (error) {
    console.error('خطأ في API الاختبار:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في معالجة الطلب' },
      { status: 500 }
    );
  }
}
