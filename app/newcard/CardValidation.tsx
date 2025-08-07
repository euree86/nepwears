import { Alert } from 'react-native';

export type CardType = 'visa' | 'mastercard' | 'amex' | 'discover';

export const detectCardType = (number: string): CardType | null => {
  const cleaned = number.replace(/\D/g, '');

  if (cleaned.startsWith('4')) return 'visa';
  if (cleaned.startsWith('5') || (cleaned.startsWith('2') && cleaned.length >= 2 && parseInt(cleaned.substring(0, 4)) >= 2221 && parseInt(cleaned.substring(0, 4)) <= 2720)) return 'mastercard';
  if (cleaned.startsWith('34') || cleaned.startsWith('37')) return 'amex';
  if (cleaned.startsWith('6011') || cleaned.startsWith('65') || (cleaned.startsWith('644') || cleaned.startsWith('645') || cleaned.startsWith('646') || cleaned.startsWith('647') || cleaned.startsWith('648') || cleaned.startsWith('649'))) return 'discover';

  return null;
};

export const validateCardNumber = (number: string, cardType: CardType): boolean => {
  const cleaned = number.replace(/\D/g, '');
  const expectedLength = cardType === 'amex' ? 15 : 16;
  if (cleaned.length !== expectedLength) return false;

  // Luhn algorithm
  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);
    if (isNaN(digit)) return false;

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

export const formatCardNumberInput = (number: string, cardType: CardType | null): string => {
  const cleaned = number.replace(/\D/g, '');
  const maxLength = cardType === 'amex' ? 15 : 16;
  const truncated = cleaned.slice(0, maxLength);

  if (cardType === 'amex') {
    // AMEX: XXXX XXXXXX XXXXX
    return truncated.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3').trim();
  } else {
    // Others: XXXX XXXX XXXX XXXX
    return truncated.replace(/(\d{4})/g, '$1 ').trim();
  }
};

export const formatCardNumberForDisplay = (number: string, cardType: CardType | null): string => {
  const cleaned = number.replace(/\D/g, '');
  
  if (cleaned.length <= 4) {
    return cleaned.replace(/(\d{4})/g, '$1 ').trim();
  }

  const maxLength = cardType === 'amex' ? 15 : 16;
  const lastFour = cleaned.slice(-4);
  const maskedLength = maxLength - 4;
  
  if (cardType === 'amex') {
    // AMEX: **** ****** XXXXX
    const maskedPart = '**** ****** ';
    return maskedPart + lastFour;
  } else {
    // Others: **** **** **** XXXX
    const maskedPart = '**** **** **** ';
    return maskedPart + lastFour;
  }
};

export const formatExpiryDateInput = (text: string): string => {
  const cleaned = text.replace(/\D/g, '').slice(0, 4);

  if (cleaned.length >= 2) {
    const month = cleaned.slice(0, 2);
    const year = cleaned.slice(2);
    const validMonth = Math.max(1, Math.min(12, parseInt(month) || 1));
    return `${validMonth.toString().padStart(2, '0')}${year ? '/' + year : ''}`;
  }

  return cleaned;
};

export const validateExpiryDate = (date: string): boolean => {
  if (date.length !== 5) return false;

  const [monthStr, yearStr] = date.split('/');
  if (!monthStr || !yearStr) return false;

  const expMonth = parseInt(monthStr, 10);
  const expYear = parseInt(yearStr, 10);

  if (isNaN(expMonth) || isNaN(expYear)) return false;
  if (expMonth < 1 || expMonth > 12) return false;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
    return false;
  }

  return true;
};

export const formatCardholderName = (text: string): string => {
  return text
    .replace(/[^a-zA-Z\s'-]/g, '')
    .slice(0, 30)
    .toUpperCase()
    .replace(/\s+/g, ' ')
    .trim();
};

export const formatSecurityCode = (text: string, cardType: CardType | null): string => {
  const cleaned = text.replace(/\D/g, '');
  const maxLength = cardType === 'amex' ? 4 : 3;
  return cleaned.slice(0, maxLength);
};

interface CardDetails {
  cardholderName: string;
  cardNumber: string;
  cardType: CardType | null;
  expiryDate: string;
  securityCode: string;
}

export const validateAndSubmitCard = ({
  cardholderName,
  cardNumber,
  cardType,
  expiryDate,
  securityCode,
}: CardDetails): boolean => {
  if (!cardType) {
    Alert.alert('Invalid Card', 'Please enter a valid Visa, Mastercard, American Express, or Discover card.');
    return false;
  }

  if (!cardholderName || cardholderName.trim().length < 2) {
    Alert.alert('Invalid Name', 'Please enter a valid cardholder name');
    return false;
  }

  const cleanedCardNumber = cardNumber.replace(/\D/g, '');
  const expectedLength = cardType === 'amex' ? 15 : 16;

  if (cleanedCardNumber.length !== expectedLength) {
    Alert.alert('Invalid Card Number', `Please enter a valid ${expectedLength}-digit card number`);
    return false;
  }

  if (!validateCardNumber(cleanedCardNumber, cardType)) {
    Alert.alert('Invalid Card Number', 'The card number you entered is not valid');
    return false;
  }

  if (!expiryDate || expiryDate.length !== 5 || !validateExpiryDate(expiryDate)) {
    Alert.alert('Invalid Expiry Date', 'Please enter a valid expiry date (MM/YY)');
    return false;
  }

  const expectedCvvLength = cardType === 'amex' ? 4 : 3;
  if (!securityCode || securityCode.length !== expectedCvvLength) {
    Alert.alert('Invalid Security Code', `Please enter a valid ${expectedCvvLength}-digit security code`);
    return false;
  }

  Alert.alert('Success', 'Card added successfully!', [
    { text: 'OK', style: 'default' }
  ]);
  return true;
};
