import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    this.validationUser();
  }

  validationUser = async () => {
    const callUser = await getUser();
    this.setState({
      isLoading: false,
      name: callUser.name,
    });
  };

  render() {
    const { name, isLoading } = this.state;
    return (
      <header data-testid="header-component" className="header">
        { isLoading ? <Loading /> : <p data-testid="header-user-name">{name}</p> }
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  isLoading: PropTypes.bool,
}.isRequired;
