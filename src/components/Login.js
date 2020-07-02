import React from "react";
import { Modal, Button, Header, Icon } from "semantic-ui-react";
import { withAlert } from "react-alert";
import { openAlert } from "simple-react-alert";

class Login extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",

    signInStatus: "sign-in succeeded",
    signinStatusMessage: "you are now logged in",
    visibleState: "visible",
  };

  loginRequest = async () => {
    console.log("I am here");
    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";
    const url = "https://markdown-backend.herokuapp.com/api/v1/users/login";
    const options = {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    };

    // console.log(options);
    const response = await fetch(url, options);
    const data = await response.json();
    // console.log(data);
    // console.log("cookie! ");
    // console.log(response.cookie);
    // console.log(data.token);
    // console.log(response.status);

    if (response.status === 200) {
      sessionStorage.setItem("token", data.token);
      const bearer = sessionStorage.getItem("token");
      console.log("printing token");
      console.log(sessionStorage.getItem("token"));
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
          signinStatusMessage: "Login failed",
        },
        this.handleOpen()
      );
    }
  };

  onEmailInputChange = (event) => {
    this.setState({ email: event.target.value }, () =>
      console.log(this.state.email)
    );
  };
  onPasswordInputChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    const alert = this.props.alert;
    return (
      <div class="ui vertical menu aligned center">
        <form class="ui form">
          <div class="field">
            <input
              onChange={this.onEmailInputChange}
              type="text"
              id="loginEmail"
              placeholder="email"
            ></input>
          </div>

          <div class="field">
            <input
              onChange={this.onPasswordInputChange}
              type="password"
              name="password"
              id="loginPassword"
              placeholder="password"
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
        <button onClick={this.loginRequest} class="ui button ">
          log in
        </button>
      </div>
    );
  }
}

export default Login;
