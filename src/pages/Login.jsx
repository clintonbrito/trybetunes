import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from '../components/Loading';
// import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    name: '',
    isLoginButtonDisabled: true,
  };

  validationFields = (characters) => {
    const minCharacters = 3;
    const validationInput = characters.length >= minCharacters;

    this.setState({
      isLoginButtonDisabled: !validationInput,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validationFields(value));
  };

  render() {
    const { name, isLoginButtonDisabled } = this.state;
    const { onLoginClick, isLoading } = this.props;
    return (
      <div data-testid="page-login">
        {isLoading ? (<Loading />)
          : (
            <form>
              <label htmlFor="name">
                <input
                  type="text"
                  name="name"
                  id="name"
                  data-testid="login-name-input"
                  placeholder="Insira aqui o seu login"
                  onChange={ this.handleChange }
                  value={ name }
                />
              </label>
              <button
                data-testid="login-submit-button"
                disabled={ isLoginButtonDisabled }
                onClick={ () => onLoginClick(name) }
              >
                Entrar
              </button>
            </form>)}
      </div>
    );
  }
}

Login.propTypes = {
  onLoginClick: PropTypes.func,
  isLoading: PropTypes.bool,
}.isRequired;
