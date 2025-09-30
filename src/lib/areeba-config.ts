// إعدادات بوابة الدفع أريبا
export const AREEBA_CONFIG = {
  MERCHANT_ID: 'IQ3093980103',
  API_KEY: 'TESTKEYIQ3093980103',
  BASE_URL: 'https://gateway.areebapayment.com/api/v3',
  AUTH: {
    USERNAME: 'Ali.112233445566',
    PASSWORD: 'Zxxznmmn@123'
  }
};

// إنشاء معرف معاملة فريد
export const generateTransactionId = () => {
  return `TXN${Date.now()}`;
};

// إنشاء Basic Auth للبوابة
export const getBase64Auth = () => {
  const credentials = `${AREEBA_CONFIG.AUTH.USERNAME}:${AREEBA_CONFIG.AUTH.PASSWORD}`;
  return Buffer.from(credentials).toString('base64');
};

// إنشاء URL كامل
export const getFullUrl = (path: string): string => {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${path}`;
  }
  // للاستخدام في الخادم
  return `http://localhost:3000${path}`;
};

// البيانات التجريبية للاختبار
export const TEST_CARD_DATA = {
  cardNumber: '5123450000000008',
  expiryDate: '01/39',
  cvv: '123',
  cardholderName: 'test'
};
