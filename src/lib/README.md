# نظام الدفع - بوابة أريبا

## نظرة عامة
تم تطبيق نظام دفع متكامل باستخدام بوابة أريبا للدفع في مشروع Expo Italia، بنفس منطق المشروع السابق الناجح.

## الملفات المُنشأة

### 1. إعدادات البوابة
- `src/lib/areeba-config.ts` - يحتوي على جميع إعدادات بوابة أريبا

### 2. API Routes
- `src/app/api/payment/initiate/route.ts` - بدء عملية الدفع
- `src/app/app/api/payment/callback/route.ts` - استقبال إشعارات البوابة

### 3. صفحات الدفع
- `src/app/payment/checkout/page.tsx` - صفحة إدخال بيانات الدفع
- `src/app/payment/success/page.tsx` - صفحة نجاح الدفع
- `src/app/payment/cancel/page.tsx` - صفحة إلغاء الدفع
- `src/app/payment/error/page.tsx` - صفحة خطأ الدفع

### 4. التحقق من البيانات
- `src/lib/payment-validation.ts` - دوال التحقق من صحة بيانات الدفع

## التدفق (بنفس منطق المشروع السابق)

### المرحلة الأولى: بدء الدفع
1. **المستخدم يضغط على "Complete Payment"** في صفحة application-review
2. **يتم توجيهه لصفحة الدفع** `/payment/checkout` مع البيانات المطلوبة
3. **المستخدم يدخل بيانات البطاقة** مع التحقق الفوري من صحة البيانات

### المرحلة الثانية: إنشاء المعاملة
4. **إرسال طلب للبوابة** عبر `/api/payment/initiate`
5. **إنشاء معرف فريد** `TXN${timestamp}`
6. **تحضير البيانات** للبوابة مع URLs الصحيحة

### المرحلة الثالثة: التواصل مع بوابة أريبا
7. **إرسال POST** إلى `/transaction/{API_KEY}/debit`
8. **استخدام Basic Auth** مع بيانات المصادقة
9. **معالجة الاستجابة** والتحقق من `returnType === 'REDIRECT'`

### المرحلة الرابعة: توجيه المستخدم
10. **توجيه المستخدم لبوابة أريبا** عبر `result.redirectUrl`
11. **استكمال الدفع** في بوابة أريبا الرسمية

### المرحلة الخامسة: معالجة النتائج
12. **النجاح** → `/payment/success` مع تفاصيل المعاملة
13. **الإلغاء** → `/payment/cancel` مع رقم المعاملة  
14. **الخطأ** → `/payment/error` مع رسالة الخطأ

### المرحلة السادسة: Callback
15. **استقبال إشعار** في `/api/payment/callback`
16. **معالجة الحالات** SUCCESS/FAILED/CANCELLED
17. **تحديث النظام** حسب نتيجة الدفع

## البيانات التجريبية للاختبار

```
رقم البطاقة: 5123 4500 0000 0008
تاريخ الانتهاء: 01/39
رمز الأمان: 123
اسم حامل البطاقة: test
```

## الميزات

- ✅ التحقق من صحة رقم البطاقة (خوارزمية Luhn)
- ✅ التحقق من تاريخ انتهاء البطاقة
- ✅ تنسيق تلقائي لرقم البطاقة وتاريخ الانتهاء
- ✅ معالجة شاملة للأخطاء
- ✅ واجهة مستخدم جميلة ومتجاوبة
- ✅ دعم اللغة العربية
- ✅ البيانات التجريبية للاختبار
- ✅ استقبال إشعارات البوابة (Callback)

## الأمان

- جميع البيانات محمية بتشفير SSL
- لا يتم حفظ بيانات البطاقة الائتمانية
- التحقق من صحة البيانات قبل الإرسال
- معالجة آمنة لاستجابات البوابة

## الاستخدام

```typescript
// بدء عملية دفع جديدة
const response = await fetch('/api/payment/initiate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: 50000,
    description: 'دفع رسوم التأشيرة',
    customerEmail: 'user@example.com',
    customerName: 'اسم المستخدم'
  })
});

// معالجة الاستجابة
const result = await response.json();
if (result.success && result.paymentUrl) {
  // توجيه المستخدم لبوابة الدفع
  window.location.href = result.paymentUrl;
}
```

## التفاصيل التقنية

### Endpoint بوابة أريبا:
```
POST https://gateway.areebapayment.com/api/v3/transaction/{API_KEY}/debit
```

### البيانات المرسلة:
```json
{
  "merchantTransactionId": "TXN1234567890",
  "amount": "50000",
  "currency": "IQD",
  "successUrl": "https://yourdomain.com/payment/success?transactionId=TXN1234567890&amount=50000&currency=IQD",
  "cancelUrl": "https://yourdomain.com/payment/cancel?transactionId=TXN1234567890",
  "errorUrl": "https://yourdomain.com/payment/error?transactionId=TXN1234567890",
  "callbackUrl": "https://yourdomain.com/api/payment/callback"
}
```

### الاستجابة المتوقعة:
```json
{
  "returnType": "REDIRECT",
  "redirectUrl": "https://gateway.areebapayment.com/payment/checkout/...",
  "merchantTransactionId": "TXN1234567890"
}
```

## ملاحظات مهمة

1. **بيانات الاختبار**: النظام يستخدم بيانات اختبار من أريبا
2. **المبلغ**: يتم تمرير المبلغ بالدينار العراقي (IQD)
3. **التحقق**: جميع البيانات يتم التحقق منها قبل الإرسال
4. **الأخطاء**: يتم عرض رسائل خطأ واضحة باللغة العربية
