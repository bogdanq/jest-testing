import React from "react";

export class Counter extends React.Component {
  state = {
    count: 0,
  };

  handleClick = () => {
    this.setState((state) => ({
      count: state.count + 1,
    }));
  };

  handleReset = (count) => {
    this.setState({ count });
  };

  render() {
    return (
      <div className="counter">
        <h1>{this.state.count}</h1>
        <button className="increment" onClick={this.handleClick}>
          +1
        </button>
        <button
          className="reset"
          onClick={() => {
            this.handleReset(10);
          }}
        >
          reset to 10
        </button>
      </div>
    );
  }
}
