import UserInStoreModel from "@/store/models/UserInStoreModel";
import validate from "./validateFunction";

export interface ErrorInStorePickupModel {
  name: string | null;
  surname: string | null;
  phone: string | null;
}

const phoneReg = new RegExp("[0-9]{9}");
const nameReg = new RegExp("^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ][A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ'. -]{0,19}$");
const surnameReg = new RegExp("^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ][A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ'. -]{0,39}$");

export const validatePhone = (phoneNumber: string) => validate(phoneReg, phoneNumber, 9, "Phone number");

export const validateName = (name: string) => validate(nameReg, name, 20, "Name");

export const validateSurname = (surname: string) => validate(surnameReg, surname, 40, "Surname");

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
