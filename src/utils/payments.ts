import PaymentMethod from "@/store/models/PaymentMethod";

export const BANK_TRANSFER = 0;
export const BLIK = 1;
export const CREDIT_CARD = 2;

export const payments: Array<PaymentMethod> = [
  { id: BANK_TRANSFER, name: "Bank transfer" },
  { id: BLIK, name: "Blik" },
  { id: CREDIT_CARD, name: "Credit Card" }
];
