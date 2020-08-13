<template>
  <transition name="fade">
    <Modal v-if="isModalOpen">
      <div class="modalContainer">
        <div class="shopAddress">
          <h2>Shop Address</h2>
          <p>142 Sherwood Lane</p>
          <p>Brooklyn, NY 11220</p>
        </div>
        <div class="inputs">
          <div>
            <p>Name</p>
            <input v-model="user.name" type="text" placeholder="Name" />
            <p v-if="error.name" class="error">{{ error.name }}</p>
          </div>
          <div>
            <p>Surname</p>
            <input v-model="user.surname" type="text" placeholder="Surname" />
            <p v-if="error.surname" class="error">{{ error.surname }}</p>
          </div>
          <div>
            <p>Phone Number</p>
            <input
              type="text"
              v-model="user.phone"
              @keypress="onlyNumber"
              placeholder="Phone"
            />
            <p v-if="error.phone" class="error">{{ error.phone }}</p>
          </div>
          <div class="buttons">
            <button @click="handleClose">
              Close
            </button>
            <button @click="handleSubmit">Confirm</button>
          </div>
        </div>
      </div>
    </Modal>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import Modal from "@/components/Modal.vue";
import {
  ErrorInStorePickupModel,
  validateInStorePickupInputs
} from "@/utils/validateRules";
import shopCart from "@/store/modules/shopCart";
import DeliveryModel from "@/store/models/DeliveryModel";
import UserInStoreModel from "@/store/models/UserInStoreModel";

@Component({ components: { Modal } })
export default class InStorePickupModal extends Vue {
  @Prop() isModalOpen!: boolean;
  @Prop() selectedMethod!: DeliveryModel;
  @Prop() handleModal!: Function;
  @Prop() handleSelect!: Function;
  user: UserInStoreModel = {
    name: "",
    surname: "",
    phone: ""
  };
  error: ErrorInStorePickupModel = { name: null, surname: null, phone: null };

  //Check if input for phone contains only number and max 9 digits
  onlyNumber($event) {
    const keyCode = $event.keyCode ? $event.keyCode : $event.which;
    if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
      $event.preventDefault();
    }
    if (this.user.phone.length === 9) $event.preventDefault();
  }

  clearErrorMessages() {
    this.error = { name: null, surname: null, phone: null };
  }

  handleClose() {
    this.handleSelect(null);
    shopCart.setPaymentMethod(null);
    shopCart.setUserData(null);
    shopCart.setDeliveryMethod(null);
    this.handleModal();
  }

  handleSubmit() {
    this.clearErrorMessages();
    const { isValid, error } = validateInStorePickupInputs(this.user);

    if (isValid) {
      shopCart.setUserData(this.user);
      shopCart.setDeliveryMethod(this.selectedMethod);
      this.handleModal();
    } else {
      this.error = error;
    }
  }

  //Clear Error Messages on modal show
  @Watch("isModalOpen")
  clearMessagesOnOpen() {
    if (this.isModalOpen) {
      document.documentElement.style.overflow = "hidden";
      this.clearErrorMessages();
      shopCart.setPaymentMethod(null);
      shopCart.setUserData(null);
      shopCart.setDeliveryMethod(null);
    } else document.documentElement.style.overflow = "auto";
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";

.modalContainer {
  font-family: $font-primary;
  & .shopAddress {
    margin: 1rem;
  }
  & .inputs {
    width: 400px;
    margin: 0 2rem;

    @media screen and (max-width: 700px) {
      width: 300px;
    }

    & p {
      margin-left: 1rem;
      font-size: 0.8rem;
    }

    & input {
      display: block;
      border: 1px solid black;
      width: 100%;
      font-size: 1rem;
      margin: 0.5rem auto;
      padding: 0.5rem 1rem;
    }
    & .buttons {
      display: flex;
      margin: 0 auto;
      width: 100%;

      & button {
        flex-basis: 50%;
        padding: 0.5rem 1rem;
        font-family: $font-secondary;
        font-size: 1rem;
        border: none;
        cursor: pointer;
      }
      & button:nth-child(2) {
        background-color: black;
        color: white;
      }
    }

    & .error {
      font-size: 0.8rem;
      color: red;
      font-weight: bold;
      margin-bottom: 1rem;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
