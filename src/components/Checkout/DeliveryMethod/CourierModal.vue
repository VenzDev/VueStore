<template>
  <transition name="fade">
    <Modal v-if="isModalOpen">
      <div class="modalContainer">
        <h2>{{ selectedMethod.name }}</h2>
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
            <p>Street</p>
            <input v-model="user.street" type="text" placeholder="Street" />
            <p v-if="error.street" class="error">{{ error.street }}</p>
          </div>
          <div>
            <p>Home number</p>
            <input
              v-model="user.homeNumber"
              type="text"
              placeholder="Home number"
            />
            <p v-if="error.homeNumber" class="error">{{ error.homeNumber }}</p>
          </div>
          <div class="zipCode">
            <div class="zipCode_input">
              <p>Zip code</p>
              <input
                v-model="user.zipCode"
                @keypress="handleZipCode"
                type="text"
                placeholder="Zip Code"
              />
            </div>
            <div class="city_input">
              <p>City</p>
              <input v-model="user.city" type="text" placeholder="City" />
            </div>
            <div>
              <p v-if="error.zipCode" class="error">
                {{ error.zipCode }}
              </p>
              <p v-if="error.city" class="error">{{ error.city }}</p>
            </div>
          </div>
          <div>
            <p>Home number</p>
            <input
              @keypress="onlyNumber"
              type="text"
              v-model="user.phone"
              placeholder="Phone"
            />
            <p v-if="error.phone" class="error">{{ error.phone }}</p>
          </div>
          <div class="buttons">
            <button @click="handleClose">Close</button>
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
import DeliveryModel from "@/store/models/DeliveryModel";
import shopCart from "@/store/modules/shopCart";
import {
  validateCourierInputs,
  ErrorCourierModel
} from "@/utils/validateRules";
import UserCourierModel from "@/store/models/UserCourierModel";

@Component({ components: { Modal } })
export default class DeliveryMethod extends Vue {
  @Prop() isModalOpen!: boolean;
  @Prop() selectedMethod!: DeliveryModel;
  @Prop() handleModal!: Function;
  @Prop() handleSelect!: Function;
  user: UserCourierModel = {
    name: "",
    surname: "",
    street: "",
    homeNumber: null,
    zipCode: "",
    city: "",
    phone: ""
  };

  error: ErrorCourierModel = {
    name: null,
    surname: null,
    street: null,
    homeNumber: null,
    zipCode: null,
    city: null,
    phone: null
  };

  //Check if input for zipCode contains only number and exactly 6 characters
  //This method add "-" when input have minimum 2 characters
  handleZipCode($event) {
    const eventLength = $event.target.value.length;
    const keyCode = $event.keyCode ? $event.keyCode : $event.which;

    if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
      $event.preventDefault();
    }
    if (eventLength == 2) {
      this.user.zipCode = $event.target.value[0] + $event.target.value[1] + "-";
    }
    if (eventLength > 2) {
      this.user.zipCode =
        $event.target.value[0] +
        $event.target.value[1] +
        "-" +
        $event.target.value.substring(3, $event.target.value.length);
    }
    if (eventLength === 6) $event.preventDefault();
  }

  //Check if input for phone contains only number and exactly 9 digits
  onlyNumber($event) {
    const keyCode = $event.keyCode ? $event.keyCode : $event.which;
    if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
      $event.preventDefault();
    }
    if (this.user.phone.length === 9) $event.preventDefault();
  }

  clearErrorMessages() {
    this.error = {
      name: null,
      surname: null,
      phone: null,
      street: null,
      homeNumber: null,
      zipCode: null,
      city: null
    };
  }

  handleSubmit() {
    const { isValid, error } = validateCourierInputs(this.user);

    if (isValid) {
      shopCart.setUserData(this.user);
      shopCart.setDeliveryMethod(this.selectedMethod);
      this.handleModal();
    } else {
      this.error = error;
    }
  }

  handleClose() {
    this.handleSelect(null);
    shopCart.setPaymentMethod(null);
    shopCart.setUserData(null);
    shopCart.setDeliveryMethod(null);
    this.handleModal();
  }

  //Clear Error Messages on modal show
  @Watch("isModalOpen")
  clearMessagesOnOpen() {
    if (this.isModalOpen) {
      this.clearErrorMessages();
      shopCart.setPaymentMethod(null);
      shopCart.setUserData(null);
      shopCart.setDeliveryMethod(null);

      document.documentElement.style.overflow = "hidden";
    } else document.documentElement.style.overflow = "auto";
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";

.modalContainer {
  font-family: $font-primary;
  & h2 {
    margin-bottom: 1rem;
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

    & .zipCode {
      display: flex;
      flex-wrap: wrap;

      & .zipCode_input {
        flex-basis: 35%;
      }

      & .city_input {
        flex-basis: 65%;
      }
    }

    & input {
      display: block;
      border: 1px solid black;
      width: 100%;
      font-size: 1rem;
      padding: 0.5rem 1rem;
      margin-bottom: 0.5rem;
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
