import React, { Component } from 'react';
import Header from '../components/Header';

export default class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <Header />
        <h1>Not Found</h1>
      </div>
    );
  }
}
