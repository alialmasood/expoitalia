# URLs بوابة أريبا للاستدعاء

## URLs المطلوبة لبوابة أريبا:

### 1. Success URL (صفحة النجاح)
```
https://yourdomain.com/payment/success
```

### 2. Cancel URL (صفحة الإلغاء)
```
https://yourdomain.com/payment/cancel
```

### 3. Error URL (صفحة الخطأ)
```
https://yourdomain.com/payment/error
```

### 4. Callback URL (للاستدعاء الآلي)
```
https://yourdomain.com/api/payment/callback
```

## ملاحظات مهمة:

1. **استبدال yourdomain.com** بالمجال الفعلي للموقع
2. **HTTPS مطلوب** في الإنتاج
3. **URLs يجب أن تكون متاحة** من الإنترنت
4. **Callback URL** يجب أن يقبل POST و GET requests

## للاختبار المحلي:

يمكن استخدام ngrok أو خدمة مشابهة لجعل localhost متاحاً من الإنترنت:

```bash
# تثبيت ngrok
npm install -g ngrok

# تشغيل ngrok
ngrok http 3000
```

ثم استخدام الـ URL الذي يحصل عليه ngrok في إعدادات بوابة أريبا.

## مثال على URLs للاختبار:

```
https://abc123.ngrok.io/payment/success
https://abc123.ngrok.io/payment/cancel
https://abc123.ngrok.io/payment/error
https://abc123.ngrok.io/api/payment/callback
```
