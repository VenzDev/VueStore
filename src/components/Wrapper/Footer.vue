<template>
  <footer>
    <div class="contactContainer">
      <h4>Contact</h4>
      <p>Questions? Go ahead.</p>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <input type="text" placeholder="Subject" />
      <input type="text" placeholder="Message" />
      <button>Send</button>
    </div>
    <div class="aboutContainer">
      <h4>About</h4>
      <a href="#">About us</a>
      <a href="#">We're hiring</a>
      <a href="#">Support</a>
      <a href="#">Find store</a>
      <a href="#">Shipment</a>
      <a href="#">Gift card</a>
      <a href="#">return</a>
      <a href="#">Help</a>
    </div>
    <div class="storeInfoContainer">
      <h4>Store</h4>
      <p><i class="fa fa-map-marker"></i>company Name</p>
      <p><i class="fa fa-phone"></i>00441123123</p>
      <p><i class="fa fa-envelope"></i>ex@mail.com</p>
      <h4>We accept</h4>
      <p><i class="fa fa-cc-amex"></i>Amex</p>
      <p><i class="fa fa-credit-card"></i>CreditCard</p>
      <div class="socialContainer">
        <i class="fa fa-facebook-official"></i>
        <i class="fa fa-instagram"></i>
        <i class="fa fa-snapchat"></i>
        <i class="fa fa-pinterest-p"></i>
        <i class="fa fa-twitter"></i>
        <i class="fa fa-linkedin"></i>
      </div>
    </div>
    <div class="author">Template from W3Schools</div>
  </footer>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
footer {
  display: flex;
  flex-wrap: wrap;
  background-color: #f1f1f1;
  padding-top: 2rem;
  font-family: $font-primary;

  @media screen and (max-width: 540px) {
    justify-items: center;
  }

  h4 {
    padding: 1rem 0;
    font-size: 1.2rem;
    font-weight: normal;
  }

  p {
    font-size: 0.8rem;
  }

  & .contactContainer {
    flex: 0 0 33.33%;
    padding: 0 1rem;
    text-align: center;

    @media screen and (max-width: 540px) {
      flex: 1 0 50%;
    }

    input,
    button {
      display: block;
      width: 100%;
    }

    input {
      padding: 0.5rem;
      border: 1px solid #ccc;
      margin: 0.5rem 0;
    }

    button {
      color: white;
      background-color: black;
      border: none;
      padding: 0.6rem 0;
    }
  }
  & .aboutContainer {
    flex: 0 0 33.33%;
    text-align: center;
    padding-bottom: 2rem;

    @media screen and (max-width: 540px) {
      flex: 1 0 50%;
    }

    & a {
      font-size: 0.8rem;
      padding: 0.5rem;
      display: block;
      text-decoration: underline;
      color: black;
    }
  }
  & .storeInfoContainer {
    flex: 0 0 33.33%;

    @media screen and (max-width: 540px) {
      flex: 1 0 100%;
      text-align: center;
      padding-bottom: 1rem;
    }

    p {
      padding: 0.5rem 0;

      i {
        width: 25px;
      }
    }

    & .socialContainer {
      font-size: 1.2rem;

      & i {
        margin-right: 5px;
      }
    }
  }

  & .author {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 100%;
    height: 70px;
    padding: 1.5rem 0;
    background-color: black;
    color: white;
  }
}
</style>
