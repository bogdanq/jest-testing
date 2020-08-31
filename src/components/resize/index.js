import React from "react";

export class Resize extends React.Component {
  state = {
    width: 0,
    value: "value",
  };

  componentDidMount() {
    this.handleChangeTitle();
    window.addEventListener("resize", this.handleWidth);
  }

  componentDidUpdate() {
    this.handleChangeTitle();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWidth);
  }

  handleChangeTitle = () => {
    document.title = this.state.value;
  };

  handleWidth = () => {
    this.setState({
      width: window.innerWidth,
    });
  };

  render() {
    return <div>{this.state.width}</div>;
  }
}
