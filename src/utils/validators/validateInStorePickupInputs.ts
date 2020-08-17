import UserInStoreModel from "@/store/models/UserInStoreModel";

export interface ErrorInStorePickupModel {
  name: string | null;
  surname: string | null;
  phone: string | null;
}

const phoneReg = new RegExp("[0-9]{9}");

export const validatePhone = (phoneNumber: string) => {
  return phoneReg.test(phoneNumber);
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
