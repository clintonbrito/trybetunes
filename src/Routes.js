import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { createUser } from './services/userAPI';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Favorites from './pages/Favorites';
import searchAlbumsAPI from './services/searchAlbumsAPI';

export default class Routes extends Component {
  state = {
    isLoading: false,
    isLoaded: false,
    albums: [],
  };

  onLoginClick = async (name) => {
    const { searchInput } = this.state;
    this.setState({
      isLoading: true,
    });
    await createUser({ name });
    this.setState({
      isLoading: false,
      isLoaded: true,
    });

    const fetchAlbum = await searchAlbumsAPI(searchInput);
    const result = fetchAlbum.json();
    this.setState({
      albums: result,
    });
  };

  render() {
    const { isLoading, isLoaded } = this.state;

    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Login }>
            {isLoaded
              ? (<Redirect to="/search" />)
              : <Login isLoading={ isLoading } onLoginClick={ this.onLoginClick } />}
          </Route>
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </div>
    );
  }
}
