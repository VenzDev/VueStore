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
            <input :class="{ error: error.name }" v-model="user.name" type="text" placeholder="Name" />
            <p v-if="error.name" class="error">{{ error.name }}</p>
          </div>
          <div>
            <p>Surname</p>
            <input :class="{ error: error.surname }" v-model="user.surname" type="text" placeholder="Surname" />
            <p v-if="error.surname" class="error">{{ error.surname }}</p>
          </div>
          <div>
            <p>Phone Number</p>
            <input
              type="text"
              :class="{ error: error.phone }"
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
  validateInStorePickupInputs,
  validateName,
  validateSurname
} from "@/utils/validators/validateInStorePickupInputs";
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
    const reg = /[0-9]/;
    if (!reg.test($event.key)) {
      $event.preventDefault();
      return;
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

  removeSpaces() {
    this.user.name = this.user.name.trim();
    this.user.surname = this.user.surname.trim();
    this.user.phone = this.user.phone.trim();
  }

  handleSubmit() {
    this.clearErrorMessages();
    this.removeSpaces();
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
  @Watch("user.name")
  watchName() {
    this.error.name = validateName(this.user.name);
  }
  @Watch("user.surname")
  watchSurname() {
    this.error.surname = validateSurname(this.user.surname);
  }
  @Watch("user.phone")
  watchPhone() {
    if (this.user.phone.trim().length === 0) this.error.phone = "Phone cannot be empty";
    else if (this.user.phone.trim().length > 9) this.error.phone = "Invalid value";
    else this.error.phone = null;
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
      @include input;
    }
    & .buttons {
      display: flex;
      margin: 0 auto;
      width: 100%;

      & button {
        flex-basis: 50%;
        @include button-primary;
      }
      & button:nth-child(2) {
        background-color: black;
        color: white;
      }
    }

    & .error {
      @include error;
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
