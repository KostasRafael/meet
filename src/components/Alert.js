import { Component } from "react";

class Alert extends Component {
  constructor(props) {
    // Within this methode, you initiate the state of the Alert component
    super(props); // calls the constructor() methode of the Component class. Like this, the Alert component has access to all the properies and methods of the Component.
    this.color = null;
    this.bgColor = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: this.bgColor,
      borderWidth: "2px",
      borderStyle: "solid",
      fontWeight: "bolder",
      borderRadius: "7px",
      borderColor: this.color,
      textAlign: "center",
      fontSize: "12px",
      margin: "10px 0",
      padding: "10px",
    };
  };

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "rgb(0, 0, 255)"; // blue
    this.bgColor = "rgb(220, 220, 255)"; // light blue
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "rgb(255, 0, 0)";
    this.bgColor = "rgb(160, 40, 40)";
  }
}

export { InfoAlert, ErrorAlert };
