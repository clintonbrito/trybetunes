import React, { Component } from 'react';
import Header from '../components/Header';

export default class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Olá Album</h1>
      </div>
    );
  }
}
