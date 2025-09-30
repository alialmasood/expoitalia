# تعليمات الانتقال للإنتاج

## للانتقال من وضع الاختبار إلى الإنتاج الحقيقي:

### 1. تحديث API Route
في ملف `src/app/api/payment/initiate/route.ts`:

```typescript
// قم بإلغاء التعليق عن هذا الكود:
const response = await fetch(`${AREBA_CONFIG.BASE_URL}/payment/initiate`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${createBasicAuth()}`,
    'X-API-Key': AREBA_CONFIG.API_KEY
  },
  body: JSON.stringify(areebaPayload)
});

const result = await response.json();

if (!response.ok) {
  console.error('خطأ في بوابة الدفع:', result);
  return NextResponse.json(
    { error: 'حدث خطأ في معالجة الدفع', details: result },
    { status: 500 }
  );
}

// واستبدل هذا السطر:
paymentUrl: result.paymentUrl || result.redirectUrl,
```

### 2. تحديث صفحة الدفع
في ملف `src/app/payment/checkout/page.tsx`:

```typescript
// استبدل هذا الكود:
const testUrl = `/payment/test?transactionId=${result.transactionId}&amount=${amount}`;
router.push(testUrl);

// بهذا الكود:
window.location.href = result.paymentUrl;
```

### 3. تحديث إعدادات البوابة
في ملف `src/lib/areeba-config.ts`:

```typescript
// استبدل البيانات التجريبية بالبيانات الحقيقية:
export const AREBA_CONFIG = {
  API_KEY: 'YOUR_REAL_API_KEY',
  MERCHANT_ID: 'YOUR_REAL_MERCHANT_ID',
  USERNAME: 'YOUR_REAL_USERNAME',
  PASSWORD: 'YOUR_REAL_PASSWORD',
  BASE_URL: 'https://gateway.areebapayment.com/api/v3', // أو URL الإنتاج
  // ... باقي الإعدادات
};
```

### 4. إزالة صفحة الاختبار (اختياري)
يمكنك حذف ملف `src/app/payment/test/page.tsx` في الإنتاج.

### 5. اختبار الإنتاج
- تأكد من أن جميع URLs صحيحة
- اختبر مع مبالغ صغيرة أولاً
- تأكد من أن callback URL يعمل بشكل صحيح

## ملاحظات مهمة:

1. **الأمان**: لا تضع بيانات الإنتاج في الكود، استخدم متغيرات البيئة
2. **الاختبار**: اختبر النظام جيداً قبل النشر
3. **المراقبة**: راقب logs النظام للتأكد من عمله بشكل صحيح
4. **النسخ الاحتياطي**: احتفظ بنسخة من الكود التجريبي

## متغيرات البيئة المطلوبة:

```env
AREBA_API_KEY=your_real_api_key
AREBA_MERCHANT_ID=your_real_merchant_id
AREBA_USERNAME=your_real_username
AREBA_PASSWORD=your_real_password
AREBA_BASE_URL=https://gateway.areebapayment.com/api/v3
```
