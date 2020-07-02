import React from "react";
import { Modal, Button, Header, Icon } from "semantic-ui-react";
import { withAlert } from "react-alert";
import { openAlert } from "simple-react-alert";

class Signup extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",

    signInStatus: "sign-in succeeded",
    signinStatusMessage: "you are now logged in",
    visibleState: "visible",
  };

  signupRequest = async () => {
    console.log(this.state);
    const url = "https://markdown-backend.herokuapp.com/api/v1/users/signup";
    document.getElementById("signupName").value = "";
    document.getElementById("signupEmail").value = "";
    document.getElementById("signupPassword").value = "";
    document.getElementById("signupConfirmPassword").value = "";
    const options = {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        passwordConfirm: this.state.confirmPassword,
      }),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    console.log(response.status);

    if (response.status === 201) {
      sessionStorage.setItem("token", data.token);
      this.setState(
        {
          signInStatus: "Success!",
          signinStatusMessage: "You are now logged in",
        },
        this.handleOpen()
      );
    } else {
      this.setState(
        {
          signInStatus: "Failure!",
          signinStatusMessage: "Account already exists",
        },
        this.handleOpen()
      );
    }
  };

  onNameInputChange = (event) => {
    this.setState({ name: event.target.value }, () =>
      console.log(this.state.name)
    );
  };
  onEmailInputChange = (event) => {
    this.setState({ email: event.target.value }, () =>
      console.log(this.state.email)
    );
  };
  onPasswordInputChange = (event) => {
    this.setState({ password: event.target.value }, () =>
      console.log(this.state.password)
    );
  };
  onConfirmPasswordInputChange = (event) => {
    this.setState({ confirmPassword: event.target.value }, () =>
      console.log(this.state.confirmPassword)
    );
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    const alert = this.props.alert;
    return (
      <div class="ui vertical menu aligned center">
        <form id="signupForm" class="ui form">
          <div class="field">
            <input
              type="text"
              id="signupName"
              placeholder="name"
              onChange={this.onNameInputChange}
            ></input>
          </div>

          <div class="field">
            <input
              onChange={this.onEmailInputChange}
              type="text"
              id="signupEmail"
              placeholder="email"
            ></input>
          </div>

          <div class="field">
            <input
              onChange={this.onPasswordInputChange}
              type="password"
              name="password"
              id="signupPassword"
              placeholder="password"
            ></input>
          </div>

          <div class="field">
            <input
              onChange={this.onConfirmPasswordInputChange}
              type="password"
              name="password"
              id="signupConfirmPassword"
              placeholder="confirm password"
            ></input>
          </div>
        </form>

        <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          basic
          size="small"
        >
          <Header icon="browser" content={this.state.signInStatus} />
          <Modal.Content>
            <h3>{this.state.signinStatusMessage}</h3>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" onClick={this.handleClose} inverted>
              <Icon name="checkmark" /> Got it
            </Button>
          </Modal.Actions>
        </Modal>
        <button onClick={this.signupRequest} class="ui button ">
          sign up
        </button>
      </div>
    );
  }
}

export default Signup;
