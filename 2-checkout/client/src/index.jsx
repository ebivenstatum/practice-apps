import React from "react";
import ReactDOM from "react-dom";
const axios = require('axios');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      session_cookie: JSON.stringify(document.cookie, undefined, "\t"),
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

    this.handleFormOneBackButton = this.handleFormOneBackButton.bind(this);
    this.handleFormOneNextButton = this.handleFormOneNextButton.bind(this);

    this.handleFormTwoBackButton = this.handleFormTwoBackButton.bind(this);
    this.handleFormTwoNextButton = this.handleFormTwoNextButton.bind(this);

    this.handleFormThreeBackButton = this.handleFormThreeBackButton.bind(this);
    this.handleFormThreeNextButton = this.handleFormThreeNextButton.bind(this);

    this.handleReviewBackButton = this.handleReviewBackButton.bind(this);
    this.handleReviewEndButton = this.handleReviewEndButton.bind(this);

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

  handleFormOneBackButton(event) {
    event.preventDefault();
    this.setState({ landing: true, formOne: false });
  }

  handleFormOneNextButton(event) {
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

  handleFormTwoBackButton(event) {
    event.preventDefault();
    this.setState({ formOne: true, formTwo: false});
  }

  handleFormTwoNextButton(event) {
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

  handleFormThreeBackButton(event) {
    event.preventDefault();
    this.setState({ formTwo: true, formThree: false });
  }

  handleFormThreeNextButton(event) {
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

  handleReviewBackButton(event) {
    event.preventDefault();
    this.setState({formThree: true, review: false});
  }

  handleReviewEndButton(event) {
    // also needs to send data to server and reset the state of all the form values
    event.preventDefault();

    let submissionData = {
      session_cookie: this.state.session_cookie,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      address_one: this.state.address_one,
      address_two: this.state.address_two,
      city: this.state.city,
      state: this.state.state,
      address_zip: this.state.address_zip,
      phone_number: this.state.phone_number,
      credit_card_number: this.state.credit_card_number,
      expiry_date: this.state.expiry_date,
      cvv: this.state.cvv,
      billing_zip: this.state.billing_zip
    };

    axios
      .post('/checkout', submissionData)
      .then(() => {
        this.setState({
          review: false,
          landing: true,
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
          billing_zip: ''
        });
      })
      .catch(err => {
        console.log(err);
      });

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
          <h2>User Information</h2>
          <br></br>
          <form>
            <label>Name: <input type="text" value={this.state.name} onChange={this.handleNameChange} required /></label>
            <br></br>
            <label>Email: <input type="text" value={this.state.email} onChange={this.handleEmailChange} required /></label>
            <br></br>
            <label>Password: <input type="text" value={this.state.password} onChange={this.handlePasswordChange} required /></label>
          </form>
          <br></br>
          <button onClick={this.handleFormOneBackButton}>Back</button>
          <button onClick={this.handleFormOneNextButton}>Next</button>
        </div>
      )
    } else if (this.state.formTwo) {
      return (
        <div>
          <h2>Address Information</h2>
          <br></br>
          <form>
            <label>Address Line 1: <input type="text" value={this.state.address_one} onChange={this.handleAddressOneChange} required /></label>
            <br></br>
            <label>Address Line 2 (enter "null" if not applicable): <input type="text" value={this.state.address_two} onChange={this.handleAddressTwoChange} required /></label>
            <br></br>
            <label>City: <input type="text" value={this.state.city} onChange={this.handleCityChange} required /></label>
            <br></br>
            <label>State: <input type="text" value={this.state.state} onChange={this.handleStateChange} required /></label>
            <br></br>
            <label>Zip Code: <input type="text" value={this.state.address_zip} onChange={this.handleAddressZipChange} required /></label>
            <br></br>
            <label>Phone Number: <input type="text" value={this.state.phone_number} onChange={this.handlePhoneNumberChange} required /></label>
          </form>
          <br></br>
          <button onClick={this.handleFormTwoBackButton}>Back</button>
          <button onClick={this.handleFormTwoNextButton}>Next</button>
        </div>
      )
    } else if (this.state.formThree) {
      return (
        <div>
          <h2>Billing Information</h2>
          <b2></b2>
          <form>
            <label>Credit Card Number: <input type="text" value={this.state.credit_card_number} onChange={this.handleCreditCardNumberChange} required /></label>
            <br></br>
            <label>Expires: <input type="text" value={this.state.expiry_date} onChange={this.handleExpiryDateChange} required /></label>
            <br></br>
            <label>CVV: <input type="text" value={this.state.cvv} onChange={this.handleCVVChange} required /></label>
            <br></br>
            <label>Zip Code: <input type="text" value={this.state.billing_zip} onChange={this.handleBillingZipChange} required /></label>
          </form>
          <br></br>
          <button onClick={this.handleFormThreeBackButton}>Back</button>
          <button onClick={this.handleFormThreeNextButton}>Next</button>
        </div>
      )
    } else if (this.state.review) {
      return (
        <div>
          <div>
            <h2>Review Information</h2>
            <br></br>
            <p>Name: {this.state.name}</p>
            <br></br>
            <p>Email: {this.state.email}</p>
            <br></br>
            <p>Password: {this.state.password}</p>
            <br></br>
            <p>Address Line 1: {this.state.address_one}</p>
            <br></br>
            <p>Address Line 2: {this.state.address_two}</p>
            <br></br>
            <p>City: {this.state.city}</p>
            <br></br>
            <p>State: {this.state.state}</p>
            <br></br>
            <p>Zip Code: {this.state.address_zip}</p>
            <br></br>
            <p>Phone Number: {this.state.phone_number}</p>
            <br></br>
            <p>Credit Card Number: {this.state.credit_card_number}</p>
            <br></br>
            <p>Expires: {this.state.expiry_date}</p>
            <br></br>
            <p>CVV: {this.state.cvv}</p>
            <br></br>
            <p>Zip Code: {this.state.billing_zip}</p>
            <br></br>

          </div>
           <button onClick={this.handleReviewBackButton}>Back</button>
          <button onClick={this.handleReviewEndButton}>Place Order</button>
        </div>
      )
    }

  }

}

ReactDOM.render(< App />, document.getElementById("root"));
