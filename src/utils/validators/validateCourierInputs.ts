import UserCourierModel from "@/store/models/UserCourierModel";
import validate from "./validateFunction";

export interface ErrorCourierModel {
  name: string | null;
  surname: string | null;
  street: string | null;
  homeNumber: string | null;
  zipCode: string | null;
  phone: string | null;
  city: string | null;
}
const phoneReg = new RegExp("[0-9]{9}");
const nameReg = new RegExp("^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ][A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ'. -]{0,19}$");
const surnameReg = new RegExp("^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ][A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ'. -]{0,39}$");
const streetAndCityReg = new RegExp("^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ][A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ'. -]{0,39}$");

const homeNumberReg = new RegExp("[0-9a-zA-Z]{1,5}");
const zipCodeReg = new RegExp("[0-9]{2}-[0-9]{3}");

export const validatePhone = (phoneNumber: string) => validate(phoneReg, phoneNumber, 9, "Phone number");

export const validateZipCode = (zipCode: string) => validate(zipCodeReg, zipCode, 6, "Zip code");

export const validateName = (name: string) => validate(nameReg, name, 20, "Name");

export const validateSurname = (surname: string) => validate(surnameReg, surname, 40, "Surname");

export const validateStreet = (street: string) => validate(streetAndCityReg, street, 40, "Street");

export const validateCity = (city: string) => validate(streetAndCityReg, city, 40, "City");

export const validateHomeNumber = (homeNumber: string) => validate(homeNumberReg, homeNumber, 40, "Home number");

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
  const { name, surname, street, homeNumber, zipCode, phone, city } = userInputs;

  error.name = validateName(name);
  error.surname = validateSurname(surname);
  error.street = validateStreet(street);
  error.homeNumber = validateHomeNumber(homeNumber);
  error.zipCode = validateZipCode(zipCode);
  error.city = validateCity(city);
  error.phone = validatePhone(phone);

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
