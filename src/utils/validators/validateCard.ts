import CardModel from "@/store/models/CardModel";

const blikReg = new RegExp("[0-9]{6}");
const expirationCardReg = new RegExp("^[01][0-9]{1}/[2-9][0-9]");
const nameReg = new RegExp(
  "^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ][A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ'. -]{0,25}$"
);
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
    let digit = +cardNumber[i];
    if (doubleDigit) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    s += digit;
    doubleDigit = !doubleDigit;
  }
  return s % 10 == 0;
};
export const validateName = (name: string) => {
  let error: string | null = null;
  if (!nameReg.test(name)) error = "Invalid name";
  else if (name.length === 0) error = "Name cannot be empty";
  else if (name.length > 25) error = "Invalid name";
  return error;
};
export const validateSecurityCode = (securityCode: string) => {
  let error: string | null = null;
  if (!securityCodeReg.test(securityCode)) error = "Invalid security code";
  else if (securityCode.length === 0) error = "Security code cannot be empty";
  else if (securityCode.length > 4) error = "Invalid security code";
  return error;
};
export const validateCardNumber = (cNum: string) => {
  let error: string | null = null;
  console.log(cNum);
  if (cNum.length === 0) {
    error = "Card number cannot be empty";
  } else {
    //Card recognition
    //Support for American Express, Visa, MasterCard, Discover, Diners Club, JCB
    if (
      !(
        (checkLuhn(cNum) &&
          cNum.length == 16 &&
          (cNum[0] == "4" ||
            (cNum[0] == "5" &&
              parseInt(cNum[1]) >= 1 &&
              parseInt(cNum[1]) <= 5) ||
            cNum.indexOf("6011") == 0 ||
            cNum.indexOf("65") == 0)) ||
        (cNum.length == 15 &&
          (cNum.indexOf("34") == 0 || cNum.indexOf("37") == 0)) ||
        (cNum.length == 13 && cNum[0] == "4")
      )
    )
      error = "Invalid card number";
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
      if (
        !(parseInt(cardDate[0]) >= currentMonth && parseInt(cardDate[0]) <= 12)
      )
        error = "Card has expired";
    } else error = "Card has expired";
  }
  if (expirationNumber.trim().length === 0)
    error = "Expiration cannot be empty";

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

  if (
    !error.name &&
    !error.expirationNumber &&
    !error.cardNumber &&
    !error.securityCode
  ) {
    return { isValid: true, error };
  } else return { isValid: false, error };
};
