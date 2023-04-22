import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
        { isLoading ? <Loading /> : <div data-testid="header-user-name">{name}</div> }
        <div>
          <Link to="/search">
            <div data-testid="link-to-search">Pesquisa</div>
          </Link>
          <Link to="/favorites">
            <div data-testid="link-to-favorites">Favoritos</div>
          </Link>
          <Link to="/profile">
            <div data-testid="link-to-profile">Perfil</div>
          </Link>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  isLoading: PropTypes.bool,
}.isRequired;
