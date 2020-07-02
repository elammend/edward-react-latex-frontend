import React from "react";
import Title from "./Title";
import Login from "./Login";
import Signup from "./UserContainer";
import UserContainer from "./UserContainer";
import WorkArea from "./WorkArea";
import { Alert } from "simple-react-alert";
require("./tabStyles.css");
class App extends React.Component {
  render() {
    return (
      <div>
        <Title></Title>
        <UserContainer></UserContainer>
        <WorkArea></WorkArea>
      </div>
    );
  }
}

export default App;
