# Expo Italia - Visa Application System

نظام طلبات التأشيرة الإيطالية لمعرض إكسبو إيطاليا 2026

## الميزات

- ✅ نظام مصادقة آمن باستخدام Firebase
- ✅ نموذج طلب تأشيرة شامل
- ✅ نظام دفع متكامل مع بوابة أريبا
- ✅ واجهة مستخدم حديثة ومتجاوبة
- ✅ دعم اللغة العربية والإنجليزية
- ✅ نظام إدارة الملفات والمستندات

## التقنيات المستخدمة

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Payment**: Areeba Payment Gateway
- **Deployment**: Vercel

## الإعداد والتشغيل

### المتطلبات
- Node.js 18+ 
- npm أو yarn

### التثبيت
```bash
# استنساخ المشروع
git clone [repository-url]
cd expoitalia

# تثبيت التبعيات
npm install

# تشغيل المشروع في وضع التطوير
npm run dev
```

### متغيرات البيئة
أنشئ ملف `.env.local` وأضف المتغيرات التالية:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Areeba Payment Gateway
AREBA_MERCHANT_ID=your_merchant_id
AREBA_API_KEY=your_api_key
AREBA_USERNAME=your_username
AREBA_PASSWORD=your_password
```

## النشر على Vercel

1. اربط المشروع مع GitHub
2. استورد المشروع في Vercel
3. أضف متغيرات البيئة في إعدادات Vercel
4. قم بنشر المشروع

## البنية

```
src/
├── app/                    # صفحات التطبيق
│   ├── api/               # API Routes
│   ├── login/             # صفحة تسجيل الدخول
│   ├── visa-application/  # نموذج طلب التأشيرة
│   ├── application-review/# مراجعة الطلب
│   ├── payment/           # صفحات الدفع
│   └── receipt/           # صفحة الإيصال
├── contexts/              # React Contexts
├── hooks/                 # Custom Hooks
└── lib/                   # المكتبات والإعدادات
```

## الدعم

للحصول على الدعم التقني، يرجى التواصل مع:
- البريد الإلكتروني: enquiry@expostandservice.com

## الرخصة

© 2025 Expo Italia. جميع الحقوق محفوظة.