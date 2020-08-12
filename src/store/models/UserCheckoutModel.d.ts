import DeliveryModel from "./DeliveryModel";
import UserCourierModel from "./UserCourierModel";
import UserInStoreModel from "./UserInStoreModel";
import PaymentMethod from "./PaymentMethod";

export default interface UserCheckoutModel {
  deliveryMethod: DeliveryModel | null;
  userAddressData: UserCourierModel | UserInStoreModel | null;
  paymentMethod: PaymentMethod | null;
}
