import React from "react";
import { Document, Page } from "react-pdf";
import { Form, TextArea } from "semantic-ui-react";
import PDFViewer from "./PDFViewer";
import { Modal, Button, Header, Icon } from "semantic-ui-react";

class WorkArea extends React.Component {
  state = {
    loggedInStatus: "not logged in! log in to compile!",
    fileURL:
      "https://elasticbeanstalk-us-east-2-757174149823.s3.us-east-2.amazonaws.com/homework.pdf",
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  sendCompile = async () => {
    const latexText = document.getElementById("textArea").value;
    const url = "http://localhost:3000/api/v1/compile";
    //localStorage.removeItem("token");
    const bearer = "Bearer " + sessionStorage.getItem("token");
    console.log("printing token");
    console.log(bearer);
    const options = {
      method: "POST",

      credentials: "include",
      headers: {
        Authorization: bearer,
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        text: latexText,
      }),
    };

    const response = await fetch(url, options);

    console.log(response);
    console.log(response.status);

    if (response.status === 201) {
      console.log("success");
      const res = await response.json();
      this.setState({ fileURL: res.data.message }, () => {
        console.log(this.state.fileURL);
        console.log(res.data.errorMessage);
      });
    } else {
      console.log("fail");
      this.handleOpen();
    }
  };

  sendEmail = async () => {
    const latexText = document.getElementById("textArea").value;
    const url = "http://localhost:3000/api/v1/email";
    //localStorage.removeItem("token");
    const bearer = "Bearer " + sessionStorage.getItem("token");

    const options = {
      method: "POST",

      credentials: "include",
      headers: {
        Authorization: bearer,
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };

    const response = await fetch(url, options);

    console.log(response);
    console.log(response.status);

    if (response.status === 201) {
      console.log("success");
      const res = await response.json();
    } else {
      console.log("fail");
      this.handleOpen();
    }
  };

  render() {
    return (
      <div class="ui segment" style={{ height: 800 }}>
        <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          basic
          size="small"
        >
          <Header icon="browser" content={this.state.signInStatus} />
          <Modal.Content>
            <h3>{this.state.loggedInStatus}</h3>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" onClick={this.handleClose} inverted>
              <Icon name="checkmark" /> Got it
            </Button>
          </Modal.Actions>
        </Modal>

        <button class="ui primary button" onClick={this.sendCompile}>
          compile
        </button>
        <button class="ui button" onClick={this.sendEmail}>
          Send to my email!
        </button>
        <div class="ui two column very relaxed grid">
          <div class="column">
            <Form>
              <TextArea
                id="textArea"
                style={{ height: 740 }}
                placeholder="Type LaTeX in here!"
              />
            </Form>
          </div>
          <div class="column">
            {/* <p>pdf should go here</p> */}
            {/* <Document file={this.state.fileObject}>
              <Page pageNumber={1} scale={1} />
            </Document> */}
            <PDFViewer incomingURL={this.state.fileURL}></PDFViewer>
          </div>
        </div>
      </div>
    );
  }
}

export default WorkArea;
