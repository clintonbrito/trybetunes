import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    isSearchButtonDisabled: true,
    search: [],
  };

  componentDidMount() {
    this.onSearchClick();
  }

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
      // search: target.value,
    }, () => this.validationFields(value));
    // console.log([name], value);
  };

  onSearchClick = async () => {
    // event.preventDefault();
    const { search } = this.state;
    const fetchAlbum = await searchAlbumsAPI(search);
    // const result = await fetchAlbum.json();
    console.log(await fetchAlbum);
    this.setState({
      search: fetchAlbum,
    });
  };

  render() {
    const { isSearchButtonDisabled, name } = this.state;
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
            value={ name }
          />
          <button
            data-testid="search-artist-button"
            disabled={ isSearchButtonDisabled }
            onClick={ this.onSearchClick }
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
