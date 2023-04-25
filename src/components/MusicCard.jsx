import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { trackName, trackNumber, previewUrl } = this.props;

    return (
      <div>
        <h4>{ trackName }</h4>
        <h4>{ trackNumber }</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          <code>audio</code>
        </audio>
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
