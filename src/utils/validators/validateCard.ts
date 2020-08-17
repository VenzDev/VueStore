import CardModel from "@/store/models/CardModel";

const blikReg = new RegExp("[0-9]{6}");
const expirationCardReg = new RegExp("[0-9]{2}/[0-9]{2}");

export interface ErrorCard {
  name: string | null;
  cardNumber: string | null;
  expirationNumber: string | null;
  securityCode: string | null;
}

const checkLuhn = (cardNumber: string): boolean => {
  //delete spaces from string
  const cNum = cardNumber.split(" ").join("");

  let s = 0;
  let doubleDigit = false;
  for (let i = cNum.length - 1; i >= 0; i--) {
    let digit = +cNum[i];
    if (doubleDigit) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    s += digit;
    doubleDigit = !doubleDigit;
  }
  return s % 10 == 0;
};

export const validateBlik = (blik: string) => {
  return blikReg.test(blik);
};

export const validateCardNumber = (cardNumber: string) => {
  const cNum = cardNumber.split(" ").join("");

  let error: string | null = null;
  if (!checkLuhn(cNum)) {
    error = "Invalid card Number";
    return { isNumberValid: false, cardNumberError: error };
  }
  //American Express: Starting with 34 or 37, length 15 digits.
  if (
    (cNum.indexOf("34") === 0 || cNum.indexOf("37") === 0) &&
    cNum.length !== 15
  )
    error = "American Express card must contain exactly 15 digits";

  //Visa: Starting with 4, length 13 or 16 digits.
  if (cNum[0] === "4" && cNum.length !== 13 && cNum.length !== 16)
    error = "Visa card must contain exactly 13 or 16 digits";

  //MasterCard: Starting with 51-55 and 222100-272099, length 16 digits.
  const _51_55 =
    parseInt(cNum[0] + cNum[1]) >= 51 && parseInt(cNum[0] + cNum[1]) <= 55;
  const _222100_272099 =
    parseInt(cNum.substring(0, 6)) >= 222100 &&
    parseInt(cNum.substring(0, 6)) <= 272099;

  if ((_51_55 || _222100_272099) && cNum.length !== 16)
    error = "MasterCard card must contain exactly 16 digits";

  if (error) {
    return { isNumberValid: false, cardNumberError: error };
  } else {
    return { isNumberValid: true, cardNumberError: error };
  }
};
const phoneReg = new RegExp("[0-9]{9}");

export const validatePhone = (phoneNumber: string) => {
  return phoneReg.test(phoneNumber);
};

export const validateExpirationCard = (expirationNumber: string) => {
  return expirationCardReg.test(expirationNumber);
};

export const validateCard = (cardInputs: CardModel) => {
  const error: ErrorCard = {
    name: null,
    expirationNumber: null,
    cardNumber: null,
    securityCode: null
  };
  const { name, expirationNumber, cardNumber, securityCode } = cardInputs;
  if (name.trim().length === 0) error.name = "Name cannot be empty";
  //if (!validateCardNumber(cardNumber))
  //  error.cardNumber = "Card Number must contain exactly 16 digits";
  if (cardNumber.trim().length === 0)
    error.cardNumber = "Card Number cannot be empty";
  if (!validateExpirationCard(expirationNumber))
    error.expirationNumber = "Expiration must be (MM/YY)";
  if (expirationNumber.trim().length === 0)
    error.expirationNumber = "Expiration number cannot be empty";
  if (securityCode.trim().length === 0)
    error.securityCode = "Security Code cannot be empty";

  const { isNumberValid, cardNumberError } = validateCardNumber(cardNumber);
  if (!isNumberValid) error.cardNumber = cardNumberError;

  if (
    !error.name &&
    !error.expirationNumber &&
    !error.cardNumber &&
    !error.securityCode
  ) {
    return { isValid: true, error };
  } else return { isValid: false, error };
};
