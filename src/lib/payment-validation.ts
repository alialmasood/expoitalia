// دوال التحقق من صحة بيانات الدفع

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// التحقق من رقم البطاقة الائتمانية
export function validateCardNumber(cardNumber: string): ValidationResult {
  const errors: string[] = [];
  
  // إزالة المسافات والشرطات
  const cleanNumber = cardNumber.replace(/[\s-]/g, '');
  
  if (!cleanNumber) {
    errors.push('رقم البطاقة مطلوب');
    return { isValid: false, errors };
  }
  
  if (!/^\d+$/.test(cleanNumber)) {
    errors.push('رقم البطاقة يجب أن يحتوي على أرقام فقط');
    return { isValid: false, errors };
  }
  
  if (cleanNumber.length < 13 || cleanNumber.length > 19) {
    errors.push('رقم البطاقة غير صحيح');
    return { isValid: false, errors };
  }
  
  // التحقق من خوارزمية Luhn
  if (!validateLuhnAlgorithm(cleanNumber)) {
    errors.push('رقم البطاقة غير صحيح');
    return { isValid: false, errors };
  }
  
  return { isValid: true, errors: [] };
}

// التحقق من تاريخ الانتهاء
export function validateExpiryDate(expiryDate: string): ValidationResult {
  const errors: string[] = [];
  
  if (!expiryDate) {
    errors.push('تاريخ الانتهاء مطلوب');
    return { isValid: false, errors };
  }
  
  // التحقق من التنسيق MM/YY
  const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!dateRegex.test(expiryDate)) {
    errors.push('تاريخ الانتهاء يجب أن يكون بالتنسيق MM/YY');
    return { isValid: false, errors };
  }
  
  const [month, year] = expiryDate.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  const cardYear = parseInt(year) + 2000;
  const cardMonth = parseInt(month);
  
  if (cardYear < currentDate.getFullYear() || 
      (cardYear === currentDate.getFullYear() && cardMonth < currentMonth)) {
    errors.push('البطاقة منتهية الصلاحية');
    return { isValid: false, errors };
  }
  
  return { isValid: true, errors: [] };
}

// التحقق من رمز الأمان CVV
export function validateCVV(cvv: string): ValidationResult {
  const errors: string[] = [];
  
  if (!cvv) {
    errors.push('رمز الأمان مطلوب');
    return { isValid: false, errors };
  }
  
  if (!/^\d{3,4}$/.test(cvv)) {
    errors.push('رمز الأمان يجب أن يكون 3 أو 4 أرقام');
    return { isValid: false, errors };
  }
  
  return { isValid: true, errors: [] };
}

// التحقق من اسم حامل البطاقة
export function validateCardholderName(name: string): ValidationResult {
  const errors: string[] = [];
  
  if (!name || name.trim().length === 0) {
    errors.push('اسم حامل البطاقة مطلوب');
    return { isValid: false, errors };
  }
  
  if (name.trim().length < 2) {
    errors.push('اسم حامل البطاقة قصير جداً');
    return { isValid: false, errors };
  }
  
  if (!/^[a-zA-Z\u0600-\u06FF\s]+$/.test(name)) {
    errors.push('اسم حامل البطاقة يجب أن يحتوي على أحرف فقط');
    return { isValid: false, errors };
  }
  
  return { isValid: true, errors: [] };
}

// التحقق من البريد الإلكتروني
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];
  
  if (!email) {
    errors.push('البريد الإلكتروني مطلوب');
    return { isValid: false, errors };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push('البريد الإلكتروني غير صحيح');
    return { isValid: false, errors };
  }
  
  return { isValid: true, errors: [] };
}

// التحقق من المبلغ
export function validateAmount(amount: number): ValidationResult {
  const errors: string[] = [];
  
  if (!amount || amount <= 0) {
    errors.push('المبلغ يجب أن يكون أكبر من صفر');
    return { isValid: false, errors };
  }
  
  if (amount < 1000) {
    errors.push('المبلغ أقل من الحد الأدنى المسموح');
    return { isValid: false, errors };
  }
  
  if (amount > 10000000) {
    errors.push('المبلغ أكبر من الحد الأقصى المسموح');
    return { isValid: false, errors };
  }
  
  return { isValid: true, errors: [] };
}

// التحقق الشامل من بيانات الدفع
export function validatePaymentData(data: {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  email: string;
  amount: number;
}): ValidationResult {
  const allErrors: string[] = [];
  
  const cardNumberResult = validateCardNumber(data.cardNumber);
  const expiryResult = validateExpiryDate(data.expiryDate);
  const cvvResult = validateCVV(data.cvv);
  const nameResult = validateCardholderName(data.cardholderName);
  const emailResult = validateEmail(data.email);
  const amountResult = validateAmount(data.amount);
  
  allErrors.push(
    ...cardNumberResult.errors,
    ...expiryResult.errors,
    ...cvvResult.errors,
    ...nameResult.errors,
    ...emailResult.errors,
    ...amountResult.errors
  );
  
  return {
    isValid: allErrors.length === 0,
    errors: allErrors
  };
}

// خوارزمية Luhn للتحقق من صحة رقم البطاقة
function validateLuhnAlgorithm(cardNumber: string): boolean {
  let sum = 0;
  let isEven = false;
  
  // العمل من اليمين إلى اليسار
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i));
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}

// تنسيق رقم البطاقة للعرض
export function formatCardNumber(cardNumber: string): string {
  const cleanNumber = cardNumber.replace(/[\s-]/g, '');
  const formatted = cleanNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
  return formatted;
}

// تنسيق تاريخ الانتهاء للعرض
export function formatExpiryDate(expiryDate: string): string {
  const cleanDate = expiryDate.replace(/\D/g, '');
  if (cleanDate.length >= 2) {
    return cleanDate.substring(0, 2) + '/' + cleanDate.substring(2, 4);
  }
  return cleanDate;
}
