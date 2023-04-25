import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  state = {
    albumInfo: {},
    albumMusics: [],
  };

  componentDidMount() {
    this.getMusicsArr();
  }

  getMusicsArr = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    this.setState({
      albumInfo: result[0],
      albumMusics: result.slice(1),
    });
  };

  render() {
    const {
      albumInfo,
      albumMusics,
    } = this.state;

    return (
      <div>
        <Header />
        <div data-testid="page-album">
          <h2 data-testid="artist-name">{ albumInfo.artistName }</h2>
          <h2 data-testid="album-name">{ albumInfo.collectionName }</h2>
          {albumMusics.map((music) => (
            <div key={ music.trackId }>
              <MusicCard
                previewUrl={ music.previewUrl }
                trackName={ music.trackName }
                trackNumber={ music.trackNumber }
                trackId={ music.trackId }
                music={ music }
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
}.isRequired;
