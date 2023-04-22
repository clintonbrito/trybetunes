import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    isSearchButtonDisabled: true,
  };

  validationFields = (characters) => {
    const minCharacters = 2;
    const validationInput = characters.length >= minCharacters;

    this.setState({
      isSearchButtonDisabled: !validationInput,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validationFields(value));
  };

  render() {
    const { name, isSearchButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Pesquise no Billify 🎼</h1>
        <form>
          <input
            type="text"
            name="searchInput"
            data-testid="search-artist-input"
            placeholder="Nome do artista"
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            disabled={ isSearchButtonDisabled }
            onClick={ () => onLoginClick(name) }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
