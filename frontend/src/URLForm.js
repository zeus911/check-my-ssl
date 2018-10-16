import React, { Component } from 'react';

class URLForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionNeeded: null,
      daysUntilSSLExpiry: null,
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    fetch("http://localhost:5000/check-ssl")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            actionNeeded: result.action_needed,
            daysUntilSSLExpiry: result.days_until_ssl_expiry,
          })
        }
      )
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            URL:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p>Days until SSL expiry: {this.state.daysUntilSSLExpiry}</p>
      </div>
    )
  }
}

export default URLForm;
