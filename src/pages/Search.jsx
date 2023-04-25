import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumSearched from '../components/AlbumSearched';
import AlbumNotFound from '../components/AlbumNotFound';

export default class Search extends Component {
  state = {
    isSearchButtonDisabled: true,
    search: [],
    searchInput: '',
    isLoading: false,
    isLoaded: false,
    artistName: '',
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
    this.setState(
      {
        [name]: value,
      },
      () => this.validationFields(value),
    );
  };

  onSearchClick = async (event) => {
    event.preventDefault();

    this.setState({
      isLoading: true,
    });

    const { searchInput } = this.state;
    const result = await searchAlbumsAPI(searchInput);
    this.setState({
      search: result,
      isLoading: false,
      isLoaded: true,
      searchInput: '',
      artistName: searchInput,
    });
  };

  render() {
    const {
      isSearchButtonDisabled,
      searchInput,
      search,
      isLoading,
      isLoaded,
      // artistName,
      // collectionId,
      // collectionName,
      // collectionPrice,
      // artworkUrl100,
      artistName,
    } = this.state;

    return isLoading ? (
      <Loading />
    ) : (
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
            value={ searchInput }
          />
          <button
            data-testid="search-artist-button"
            disabled={ isSearchButtonDisabled }
            onClick={ this.onSearchClick }
            type="submit"
          >
            Pesquisar
          </button>
        </form>
        <section>
          {/* { search.length === 0 && <AlbumNotFound /> } */}
          {isLoaded
            && (search.length === 0 ? (
              <AlbumNotFound />
            ) : (
              <div>
                <p>{`Resultado de álbuns de: ${artistName}`}</p>
                {search.map((album) => (
                  <AlbumSearched
                    key={ album.collectionId }
                    artistName={ album.artistName }
                    collectionId={ album.collectionId }
                    collectionName={ album.collectionName }
                    collectionPrice={ album.collectionPrice }
                    artworkUrl100={ album.artworkUrl100 }
                  />
                ))}
              </div>
            ))}
        </section>
      </div>
    );
  }
}

// {
//   /* <div>
// <p>{`Resultado de álbuns de: ${artistName}`}</p>
// {
//   search.map((album) => (
//     <AlbumSearched
//       key={ album.collectionId }
//       artistName={ album.artistName }
//       collectionId={ album.collectionId }
//       collectionName={ album.collectionName }
//       collectionPrice={ album.collectionPrice }
//       artworkUrl100={ album.artworkUrl100 }
//     />))
// }
// </div> */
// }
