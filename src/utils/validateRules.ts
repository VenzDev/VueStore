import UserInStoreModel from "@/store/models/UserInStoreModel";
import UserCourierModel from "@/store/models/UserCourierModel";
import CardModel from "@/store/models/CardModel";

const phoneReg = new RegExp("[0-9]{9}");
const zipCodeReg = new RegExp("[0-9]{2}-[0-9]{3}");
const blikReg = new RegExp("[0-9]{6}");
const cardNumberReg = new RegExp("[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}");
const expirationCardReg = new RegExp("[0-9]{2}/[0-9]{2}");

export interface ErrorInStorePickupModel {
  name: string | null;
  surname: string | null;
  phone: string | null;
}

export interface ErrorCourierModel {
  name: string | null;
  surname: string | null;
  street: string | null;
  homeNumber: string | null;
  zipCode: string | null;
  phone: string | null;
  city: string | null;
}

export interface ErrorCard {
  name: string | null;
  cardNumber: string | null;
  expirationNumber: string | null;
  securityCode: string | null;
}

export const validatePhone = (phoneNumber: string) => {
  return phoneReg.test(phoneNumber);
};

export const validateZipCode = (zipCode: string) => {
  return zipCodeReg.test(zipCode);
};

export const validateBlik = (blik: string) => {
  return blikReg.test(blik);
};

export const validateCardNumber = (cardNumber: string) => {
  return cardNumberReg.test(cardNumber);
};

export const validateExpirationCard = (expirationNumber: string) => {
  return expirationCardReg.test(expirationNumber);
};

export const validateInStorePickupInputs = (userInputs: UserInStoreModel) => {
  const error: ErrorInStorePickupModel = {
    name: null,
    surname: null,
    phone: null
  };
  const { name, surname, phone } = userInputs;
  if (name.trim().length === 0) error.name = "Name cannot be empty";
  if (surname.trim().length === 0) error.surname = "Surname cannot be empty";
  if (phone.trim().length === 0) error.phone = "Phone number cannot be empty";
  if (!validatePhone(phone))
    error.phone = "Phone number must contain exactly 9 digits";

  if (error.name === null && error.surname === null && error.phone === null) {
    return { isValid: true, error };
  } else {
    return { isValid: false, error };
  }
};

export const validateCourierInputs = (userInputs: UserCourierModel) => {
  const error: ErrorCourierModel = {
    name: null,
    surname: null,
    street: null,
    homeNumber: null,
    zipCode: null,
    phone: null,
    city: null
  };
  const {
    name,
    surname,
    street,
    homeNumber,
    zipCode,
    phone,
    city
  } = userInputs;

  if (name.trim().length === 0) error.name = "Name cannot be empty";
  if (surname.trim().length === 0) error.surname = "Surname cannot be empty";
  if (street.trim().length === 0) error.street = "Street cannot be empty";
  if (homeNumber === null) error.homeNumber = "Home number cannot be empty";
  if (!validateZipCode(zipCode)) error.zipCode = "ZipCode must be (xx-yyy)";
  if (zipCode.trim().length === 0) error.zipCode = "ZipCode cannot be empty";
  if (city.trim().length === 0) error.city = "City cannot be empty";
  if (phone.trim().length === 0) error.phone = "Phone number cannot be empty";
  if (!validatePhone(phone))
    error.phone = "Phone number must contain exactly 9 digits";

  if (
    error.name === null &&
    error.surname === null &&
    error.phone === null &&
    error.city === null &&
    error.homeNumber === null &&
    error.zipCode === null &&
    error.street === null
  ) {
    return { isValid: true, error };
  } else {
    return { isValid: false, error };
  }
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
  if (!validateCardNumber(cardNumber))
    error.cardNumber = "Card Number must contain exactly 16 digits";
  if (cardNumber.trim().length === 0)
    error.cardNumber = "Card Number cannot be empty";
  if (!validateExpirationCard(expirationNumber))
    error.expirationNumber = "Expiration must be (MM/YY)";
  if (expirationNumber.trim().length === 0)
    error.expirationNumber = "Expiration number cannot be empty";
  if (securityCode.trim().length === 0)
    error.securityCode = "Security Code cannot be empty";

  if (
    !error.name &&
    !error.expirationNumber &&
    !error.cardNumber &&
    !error.securityCode
  ) {
    return { isValid: true, error };
  } else return { isValid: false, error };
};
