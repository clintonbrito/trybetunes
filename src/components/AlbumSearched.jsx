import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class AlbumSearched extends Component {
  render() {
    const {
      // artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      // releaseDate,
      // trackCount,
    } = this.props;

    return (
      <Link to={ `/album/${collectionId}` }>
        <div
          data-testid={ `link-to-album-${collectionId}` }
          key={ collectionId }
        >
          <h3>{ artistName }</h3>
          <h3>{ collectionName }</h3>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h3>
            US$
            {' '}
            { collectionPrice }
          </h3>
        </div>
      </Link>
    );
  }
}

AlbumSearched.propTypes = {
  artistId: PropTypes.string,
  artistName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  collectionId: PropTypes.string,
  collectionName: PropTypes.string,
  collectionPrice: PropTypes.string,
  releaseDate: PropTypes.string,
  trackCount: PropTypes.string,
}.isRequired;
