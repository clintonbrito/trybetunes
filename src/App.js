import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Favorites from './pages/Favorites';
import { createUser } from './services/userAPI';

class App extends React.Component {
  state = {
    isLoading: false,
    isLoaded: false,
  };

  onLoginClick = async (name) => {
    this.setState({
      isLoading: true,
    });
    await createUser({ name });
    this.setState({
      isLoading: false,
      isLoaded: true,
    });
  };

  render() {
    const { isLoading, isLoaded } = this.state;

    return (
      <div>
        <main>
          <Link to="/search"><h1>TrybeTunes 🎵</h1></Link>
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
        </main>
      </div>
    );
  }
}

export default App;
