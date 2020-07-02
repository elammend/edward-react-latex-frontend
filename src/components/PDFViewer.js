import React, { useRef } from "react";
import WebViewer from "@pdftron/pdfjs-express";
import ReactDOM from "react-dom";
import PDF from "react-pdf-js";

export default class PDFViewer extends React.Component {
  state = {};
  handlePrevious = this.handlePrevious.bind(this);
  handleNext = this.handleNext.bind(this);
  onDocumentComplete = this.onDocumentComplete.bind(this);

  onDocumentComplete(pages) {
    this.setState({ page: 1, pages });
  }

  handlePrevious() {
    this.setState({ page: this.state.page - 1 });
  }

  handleNext() {
    this.setState({ page: this.state.page + 1 });
  }

  renderPagination() {
    return (
      <>
        <button onClick={this.handlePrevious}>&lt;</button>
        <button onClick={this.handleNext}>&gt;</button>
      </>
    );
  }

  render() {
    console.log("pdf is rendering");
    let pagination = null;

    if (this.state.pages) {
      pagination = this.renderPagination();
    }
    return (
      <div class="container">
        <PDF
          file={this.props.incomingURL}
          page={this.state.page}
          onDocumentComplete={this.onDocumentComplete}
        />
        {pagination}
      </div>
    );
  }
}
