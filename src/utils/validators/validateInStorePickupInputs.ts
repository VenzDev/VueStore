import UserInStoreModel from "@/store/models/UserInStoreModel";

export interface ErrorInStorePickupModel {
  name: string | null;
  surname: string | null;
  phone: string | null;
}

const phoneReg = new RegExp("[0-9]{9}");
const nameReg = new RegExp(
  "^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ][A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ'. -]{0,19}$"
);
const surnameReg = new RegExp(
  "^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ][A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ'. -]{0,39}$"
);

export const validatePhone = (phoneNumber: string) => {
  let error: string | null = null;
  if (!phoneReg.test(phoneNumber)) error = "Invalid value";
  if (phoneNumber.length === 0) error = "Input cannot be empty";
  if (phoneNumber.length > 9) error = "Too long value";
  return error;
};

export const validateName = (text: string) => {
  let error: string | null = null;
  if (!nameReg.test(text)) error = "Invalid value";
  if (text.length === 0) error = "Input cannot be empty";
  if (text.length > 20) error = "Too long value";
  return error;
};

export const validateSurname = (text: string) => {
  let error: string | null = null;
  if (!surnameReg.test(text)) error = "Invalid value";
  if (text.length === 0) error = "Input cannot be empty";
  if (text.length > 40) error = "Too long value";
  return error;
};

export const validateInStorePickupInputs = (userInputs: UserInStoreModel) => {
  const error: ErrorInStorePickupModel = {
    name: null,
    surname: null,
    phone: null
  };
  const { name, surname, phone } = userInputs;

  error.name = validateName(name);
  error.surname = validateSurname(surname);
  error.phone = validatePhone(phone);

  if (error.name === null && error.surname === null && error.phone === null) {
    return { isValid: true, error };
  } else {
    return { isValid: false, error };
  }
};
