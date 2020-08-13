import DeliveryModel from "@/store/models/DeliveryModel";

export const IN_STORE_PICKUP = "In-store Pickup";
export const STANDARD_COURIER = "Standard Courier";
export const COLLECT_ON_DELIVERY = "Collect on Delivery";

export const methods: Array<DeliveryModel> = [
  { id: 0, name: IN_STORE_PICKUP, timeInfo: "1-2 days", price: "$0" },
  { id: 1, name: STANDARD_COURIER, timeInfo: "2-3 days", price: "$6.99" },
  {
    id: 2,
    name: COLLECT_ON_DELIVERY,
    timeInfo: "1-2 days",
    price: "$12.99"
  }
];
