# دليل نشر مشروع Expo Italia على Vercel

## الخطوة 1: رفع المشروع على GitHub

### 1.1 إنشاء مستودع جديد على GitHub
1. اذهب إلى [GitHub](https://github.com)
2. اضغط على "New repository"
3. أدخل اسم المستودع: `expoitalia`
4. اختر "Public" أو "Private" حسب تفضيلك
5. **لا** تضع علامة على "Initialize this repository with README"
6. اضغط "Create repository"

### 1.2 ربط المشروع المحلي مع GitHub
```bash
# إضافة المستودع البعيد
git remote add origin https://github.com/[YOUR_USERNAME]/expoitalia.git

# رفع الكود إلى GitHub
git branch -M main
git push -u origin main
```

## الخطوة 2: نشر المشروع على Vercel

### 2.1 تسجيل الدخول إلى Vercel
1. اذهب إلى [Vercel](https://vercel.com)
2. اضغط "Sign Up" أو "Login"
3. اختر "Continue with GitHub"

### 2.2 استيراد المشروع
1. في لوحة تحكم Vercel، اضغط "New Project"
2. اختر المستودع `expoitalia` من قائمة المستودعات
3. اضغط "Import"

### 2.3 إعداد المشروع
- **Project Name**: `expoitalia` (أو أي اسم تفضله)
- **Framework Preset**: Next.js (سيتم اكتشافه تلقائياً)
- **Root Directory**: `./` (افتراضي)
- **Build Command**: `npm run build` (افتراضي)
- **Output Directory**: `.next` (افتراضي)

## الخطوة 3: إعداد متغيرات البيئة

### 3.1 متغيرات Firebase (مطلوبة)
في قسم "Environment Variables" في Vercel، أضف:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDg8GCpZUsg0RiUJdcLsS-C1XPaBp0MaZI
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ktvisa-3ac7f.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ktvisa-3ac7f
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ktvisa-3ac7f.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1069684648681
NEXT_PUBLIC_FIREBASE_APP_ID=1:1069684648681:web:b010d1e3b499a929cc9e78
```

### 3.2 متغيرات بوابة الدفع (اختيارية)
```
AREBA_MERCHANT_ID=IQ3093980103
AREBA_API_KEY=TESTKEYIQ3093980103
AREBA_USERNAME=Ali.112233445566
AREBA_PASSWORD=Zxxznmmn@123
```

### 3.3 إعداد المتغيرات
1. لكل متغير، اختر البيئات: `Production`, `Preview`, `Development`
2. اضغط "Save"

## الخطوة 4: النشر

### 4.1 نشر المشروع
1. اضغط "Deploy"
2. انتظر حتى تكتمل عملية البناء (3-5 دقائق)
3. ستحصل على رابط للموقع المنشور

### 4.2 رابط الموقع
بعد النشر الناجح، ستحصل على رابط مثل:
```
https://expoitalia-[random-string].vercel.app
```

## الخطوة 5: اختبار الموقع المنشور

### 5.1 اختبار الوظائف الأساسية
1. **صفحة تسجيل الدخول**: `/login`
2. **نموذج طلب التأشيرة**: `/visa-application`
3. **مراجعة الطلب**: `/application-review`
4. **صفحات الدفع**: `/payment/checkout`

### 5.2 اختبار المصادقة
1. أنشئ حساب جديد باستخدام البريد الإلكتروني الجديد
2. تأكد من عمل Firebase Authentication
3. اختبر تسجيل الدخول والخروج

## الخطوة 6: الإعدادات المتقدمة

### 6.1 نطاق مخصص (اختياري)
1. في لوحة تحكم Vercel، اذهب إلى "Domains"
2. أضف النطاق المخصص الخاص بك
3. اتبع تعليمات إعداد DNS

### 6.2 تحديثات تلقائية
- كل مرة تدفع تغييرات جديدة إلى GitHub، سيتم نشرها تلقائياً على Vercel
- يمكنك مراقبة عمليات النشر في لوحة تحكم Vercel

## استكشاف الأخطاء

### مشاكل شائعة وحلولها:

1. **خطأ في البناء**:
   - تحقق من أن جميع التبعيات مثبتة في `package.json`
   - تأكد من عدم وجود أخطاء في TypeScript

2. **مشاكل Firebase**:
   - تأكد من صحة متغيرات البيئة
   - تحقق من إعدادات Firebase Console

3. **مشاكل الدفع**:
   - تأكد من صحة بيانات بوابة أريبا
   - تحقق من URLs في إعدادات البوابة

## الدعم

للحصول على المساعدة:
- **Vercel Docs**: https://vercel.com/docs
- **GitHub Docs**: https://docs.github.com
- **Firebase Docs**: https://firebase.google.com/docs

---

## ملاحظات مهمة

⚠️ **أمان البيانات**: 
- لا تشارك متغيرات البيئة مع أي شخص
- استخدم قيم الاختبار في البيئة التطويرية فقط

✅ **النسخ الاحتياطي**:
- احتفظ بنسخة احتياطية من الكود على GitHub
- راجع إعدادات Firebase بانتظام

🚀 **الأداء**:
- Vercel يحسن الأداء تلقائياً
- استخدم Vercel Analytics لمراقبة الأداء
