import React from 'react'

class Button extends React.Component {
  render() {
    return (
      <div className="b-button">
        <button onClick={this.onClick}>Вычислить</button>
      </div>
    );
  }
}

export default Button;
