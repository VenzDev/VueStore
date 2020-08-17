import UserCourierModel from "@/store/models/UserCourierModel";

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
const nameReg = new RegExp(
  "^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ][A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ'. -]{0,19}$"
);
const surnameReg = new RegExp(
  "^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ][A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ'. -]{0,39}$"
);
const streetReg = new RegExp(
  "^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ][A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ'. -]{0,39}$"
);

const homeNumberReg = new RegExp("[0-9a-zA-Z]{1,5}");
const zipCodeReg = new RegExp("[0-9]{2}-[0-9]{3}");

const validatePhone = (phoneNumber: string) => {
  let error: string | null = null;
  if (!phoneReg.test(phoneNumber.trim())) error = "Invalid value";
  if (phoneNumber.trim().length === 0) error = "Input cannot be empty";
  if (phoneNumber.trim().length > 9) error = "Too long value";
  return error;
};

const validateZipCode = (zipCode: string) => {
  let error: string | null = null;
  if (!zipCodeReg.test(zipCode.trim())) error = "zipCode must be (xx-yyy)";
  if (zipCode.trim().length === 0) error = "Input cannot be empty";
  if (zipCode.trim().length > 6) error = "Too long value";
  return error;
};

const validateName = (text: string) => {
  let error: string | null = null;
  if (!nameReg.test(text.trim())) error = "Invalid value";
  if (text.trim().length === 0) error = "Input cannot be empty";
  if (text.trim().length > 20) error = "Too long value";
  return error;
};

const validateSurname = (text: string) => {
  let error: string | null = null;
  if (!surnameReg.test(text.trim())) error = "Invalid value";
  if (text.trim().length === 0) error = "Input cannot be empty";
  if (text.trim().length > 40) error = "Too long value";
  return error;
};

const validateStreetAndCity = (text: string) => {
  let error: string | null = null;
  if (!streetReg.test(text.trim())) error = "Invalid value";
  if (text.trim().length === 0) error = "Input cannot be empty";
  if (text.trim().length > 40) error = "Too long value";
  return error;
};

const validateHomeNumber = (text: string) => {
  let error: string | null = null;
  if (!homeNumberReg.test(text.trim())) error = "Invalid value";
  if (text.trim().length === 0) error = "Input cannot be empty";
  if (text.trim().length > 5) error = "Too long value";
  return error;
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

  error.name = validateName(name);
  error.surname = validateSurname(surname);
  error.street = validateStreetAndCity(street);
  error.homeNumber = validateHomeNumber(homeNumber);
  error.zipCode = validateZipCode(zipCode);
  error.city = validateStreetAndCity(city);
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
