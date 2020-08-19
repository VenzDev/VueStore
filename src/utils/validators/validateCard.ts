import CardModel from "@/store/models/CardModel";
import validate from "./validateFunction";

const blikReg = new RegExp("[0-9]{6}");
const expirationCardReg = new RegExp("^[01][0-9]{1}/[2-9][0-9]");
const nameReg = new RegExp("^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ][A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ'. -]{0,25}$");
const securityCodeReg = new RegExp("[0-9]{2,4}");

export const validateBlik = (blik: string) => {
  return blikReg.test(blik);
};

export interface ErrorCard {
  name: string | null;
  cardNumber: string | null;
  expirationNumber: string | null;
  securityCode: string | null;
}

const checkLuhn = (cardNumber: string): boolean => {
  let s = 0;
  let doubleDigit = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i]);
    if (doubleDigit) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    s += digit;
    doubleDigit = !doubleDigit;
  }
  return s % 10 == 0;
};

export const validateName = (name: string) => validate(nameReg, name, 25, "Name");

export const validateSecurityCode = (securityCode: string) =>
  validate(securityCodeReg, securityCode, 4, "Security Code");

export const validateCardNumber = (cNum: string) => {
  let error: string | null = null;
  if (cNum.length === 0) {
    error = "Card number cannot be empty";
  } else {
    //Card recognition
    //Support for American Express, Visa, MasterCard, Discover, Diners Club, JCB, maestro
    const _2digitsPrefix = parseInt(cNum.substring(0, 2));
    const _3digitsPrefix = parseInt(cNum.substring(0, 3));
    const _4digitsPrefix = parseInt(cNum.substring(0, 4));
    const _6digitsPrefix = parseInt(cNum.substring(0, 6));

    const americanExpress = (_2digitsPrefix == 34 || _2digitsPrefix == 37) && cNum.length === 15;

    const visa = parseInt(cNum[0]) == 4 && (cNum.length == 13 || cNum.length == 16 || cNum.length == 19);

    const masterCard =
      ((_2digitsPrefix >= 51 && _2digitsPrefix <= 55) || (_6digitsPrefix >= 222100 && _6digitsPrefix <= 272099)) &&
      cNum.length === 16;

    const discover =
      (_4digitsPrefix === 6011 ||
        (_6digitsPrefix >= 622126 && _6digitsPrefix <= 622925) ||
        (_3digitsPrefix >= 644 && _3digitsPrefix <= 649) ||
        _2digitsPrefix === 65) &&
      (cNum.length === 16 || cNum.length === 19);

    const dinersClub =
      (_2digitsPrefix === 36 && cNum.length === 14) ||
      (_2digitsPrefix === 54 && cNum.length === 16) ||
      (_3digitsPrefix >= 300 && _3digitsPrefix <= 305 && cNum.length === 14);

    const jcb = _4digitsPrefix >= 3528 && _4digitsPrefix <= 3589 && (cNum.length === 16 || cNum.length === 19);

    const maestro =
      (_4digitsPrefix === 5018 ||
        _4digitsPrefix === 5020 ||
        _4digitsPrefix === 5038 ||
        _4digitsPrefix === 5893 ||
        _4digitsPrefix === 6304 ||
        _4digitsPrefix === 6759 ||
        _4digitsPrefix === 6761 ||
        _4digitsPrefix === 6762 ||
        _4digitsPrefix === 6763) &&
      (cNum.length === 14 || cNum.length === 16);

    if (!(checkLuhn(cNum) && (americanExpress || visa || masterCard || discover || dinersClub || jcb || maestro)))
      error = "Invalid credit card number";
  }
  if (cNum.length > 20) error = "Invalid card Number";
  return error;
};

export const validateExpirationCard = (expirationNumber: string) => {
  let error: string | null = null;
  if (!expirationCardReg.test(expirationNumber)) error = "Invalid expiration";
  else {
    const maxValidYear = 10;
    const date = new Date();
    const currentYear = date.getFullYear() - 2000;
    const currentMonth = date.getMonth() + 1;

    const cardDate = expirationNumber.split("/");

    if (parseInt(cardDate[1]) > currentYear) {
      if (
        !(
          parseInt(cardDate[1]) <= currentYear + maxValidYear &&
          parseInt(cardDate[0]) >= 0 &&
          parseInt(cardDate[0]) <= 12
        )
      )
        error = "Invalid expiration";
    } else if (parseInt(cardDate[1]) === currentYear) {
      if (!(parseInt(cardDate[0]) >= currentMonth && parseInt(cardDate[0]) <= 12)) error = "Card has expired";
    } else error = "Card has expired";
  }
  if (expirationNumber.trim().length === 0) error = "Expiration cannot be empty";

  return error;
};

export const validateCard = (cardInputs: CardModel) => {
  const error: ErrorCard = {
    name: null,
    expirationNumber: null,
    cardNumber: null,
    securityCode: null
  };
  const { name, expirationNumber, cardNumber, securityCode } = cardInputs;

  error.expirationNumber = validateExpirationCard(expirationNumber);
  error.securityCode = validateSecurityCode(securityCode);
  error.name = validateName(name);

  //security code requires removing spaces beetween numbers
  error.cardNumber = validateCardNumber(
    cardNumber
      .trim()
      .split(" ")
      .join("")
  );

  if (!error.name && !error.expirationNumber && !error.cardNumber && !error.securityCode) {
    return { isValid: true, error };
  } else return { isValid: false, error };
};
