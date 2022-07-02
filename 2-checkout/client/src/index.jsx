import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      address_one: '',
      address_two: '',
      city: '',
      state: '',
      address_zip: '',
      phone_number: '',
      credit_card_number: '',
      expiry_date: '',
      cvv: '',
      billing_zip: '',
      landing: true,
      formOne: false,
      formTwo: false,
      formThree: false,
      review: false
    }

    this.handleLandingButton = this.handleLandingButton.bind(this);
    this.handleFormOneButton = this.handleFormOneButton.bind(this);
    this.handleFormTwoButton = this.handleFormTwoButton.bind(this);
    this.handleFormThreeButton = this.handleFormThreeButton.bind(this);
    this.handleReviewButton = this.handleReviewButton.bind(this);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.handleAddressOneChange = this.handleAddressOneChange.bind(this);
    this.handleAddressTwoChange = this.handleAddressTwoChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleAddressZipChange = this.handleAddressZipChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);

    this.handleCreditCardNumberChange = this.handleCreditCardNumberChange.bind(this);
    this.handleExpiryDateChange = this.handleExpiryDateChange.bind(this);
    this.handleCVVChange = this.handleCVVChange.bind(this);
    this.handleBillingZipChange = this.handleBillingZipChange.bind(this);
  }

  handleLandingButton(event) {
    event.preventDefault();
    this.setState({ landing: false, formOne: true });
  }

  handleFormOneButton(event) {
    event.preventDefault();
    this.setState({ formOne: false, formTwo: true });
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }
  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleFormTwoButton(event) {
    event.preventDefault();
    this.setState({ formTwo: false, formThree: true });
  }

  handleAddressOneChange(event) {
    this.setState({ address_one: event.target.value });
  }
  handleAddressTwoChange(event) {
    this.setState({ address_two: event.target.value });
  }
  handleCityChange(event) {
    this.setState({ city: event.target.value });
  }
  handleStateChange(event) {
    this.setState({ state: event.target.value });
  }
  handleAddressZipChange(event) {
    this.setState({ address_zip: event.target.value });
  }
  handlePhoneNumberChange(event) {
    this.setState({ phone_number: event.target.value });
  }

  handleFormThreeButton(event) {
    event.preventDefault();
    this.setState({ formThree: false, review: true });
  }

  handleCreditCardNumberChange(event) {
    this.setState({ credit_card_number: event.target.value });
  }
  handleExpiryDateChange(event) {
    this.setState({ expiry_date: event.target.value });
  }
  handleCVVChange(event) {
    this.setState({ cvv: event.target.value });
  }
  handleBillingZipChange(event) {
    this.setState({ billing_zip: event.target.value });
  }

  handleReviewButton(event) {
    // also needs to send data to server and reset the state of all the form values
    event.preventDefault();
    axios
      .post()
      .then(() => {
        this.setState({ review: false, landing: true });
      })
      .catch(err => {
        console.log(err);
      })

  }

  render() {

    if (this.state.landing) {
      return (
        <div>
          <button onClick={this.handleLandingButton}>Checkout</button>
        </div>
      )
    } else if (this.state.formOne) {
      return (
        <div>
          <form>
            <label>Name: <input type="text" value={this.state.name} /></label>
            <br></br>
            <label>Email: <input type="text" value={this.state.email} /></label>
            <br></br>
            <label>Password: <input type="text" value={this.state.password} /></label>
          </form>
          <br></br>
          <button onClick={this.handleFormOneButton}>Next</button>
        </div>
      )
    } else if (this.state.formTwo) {
      return (
        <div>
          <form>
            <label>Address Line 1: <input type="text" value={this.state.address_one} /></label>
            <br></br>
            <label>Address Line 2: <input type="text" value={this.state.address_two} /></label>
            <br></br>
            <label>City: <input type="text" value={this.state.city} /></label>
            <br></br>
            <label>State: <input type="text" value={this.state.state} /></label>
            <br></br>
            <label>Zip Code: <input type="text" value={this.state.address_zip} /></label>
            <br></br>
            <label>Phone Number: <input type="text" value={this.state.phone_number} /></label>
          </form>
          <br></br>
          <button onClick={this.handleFormTwoButton}>Next</button>
        </div>
      )
    } else if (this.state.formThree) {
      return (
        <div>
          <form>
            <label>Credit Card Number: <input type="text" value={this.state.credit_card_number} /></label>
            <br></br>
            <label>Expiry Date: <input type="text" value={this.state.expiry_date} /></label>
            <br></br>
            <label>CVV: <input type="text" value={this.state.cvv} /></label>
            <br></br>
            <label>Zip Code: <input type="text" value={this.state.billing_zip} /></label>
          </form>
          <br></br>
          <button onClick={this.handleFormThreeButton}>Next</button>
        </div>
      )
    } else if (this.state.review) {
      return (
        <div>
          <button onClick={this.handleReviewButton}>Place Order</button>
        </div>
      )
    }

  }

}

ReactDOM.render(< App />, document.getElementById("root"));

/*  return (

      <div>>
        <h1>Welcome to Checkout!</h1>
        <p>
          <code>Page Cookie: {JSON.stringify(document.cookie, undefined, "\t")}</code>
        </p>

      </div>

    )*/
