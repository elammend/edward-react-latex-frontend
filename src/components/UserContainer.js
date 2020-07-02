import React from "react";
import Login from "./Login";
import { Tab } from "semantic-ui-react";
import Signup from "./Signup";

const panes = [
  {
    menuItem: "login",
    render: () => (
      <Tab.Pane>
        <Login></Login>
      </Tab.Pane>
    ),
  },
  {
    menuItem: "sign up",
    render: () => (
      <Tab.Pane>
        <Signup />
      </Tab.Pane>
    ),
  },
];
class UserContainer extends React.Component {
  render() {
    return <Tab panes={panes} />;
  }
}

export default UserContainer;
