import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    isLoading: false,
    favorite: false,
  };

  handleFavoriteSongs = async (musicObj) => {
    await addSong(musicObj);
    this.setState({
      isLoading: false,
    });
  };

  onCheckboxChange = ({ target }) => {
    console.log(target.checked);
    const { name } = target;
    const { music } = this.props;
    this.setState({
      isLoading: true,
      [name]: target.checked,
    }, () => {
      if (target.checked === true) {
        this.handleFavoriteSongs(music);
      }
    });
  };

  render() {
    const {
      trackName,
      trackNumber,
      previewUrl,
      trackId,
    } = this.props;

    const {
      isLoading,
      favorite,
    } = this.state;

    return isLoading ? <Loading /> : (
      <div>
        <h4>{ trackName }</h4>
        <h4>{ trackNumber }</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="favorite"
            id={ trackId }
            onChange={ this.onCheckboxChange }
            checked={ favorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  artistId: PropTypes.string,
  artistName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  collectionId: PropTypes.string,
  collectionName: PropTypes.string,
  collectionPrice: PropTypes.string,
  releaseDate: PropTypes.string,
  trackCount: PropTypes.string,
}.isRequired;
