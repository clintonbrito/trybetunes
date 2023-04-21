import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
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

  onLoginButtonClick = async (name) => {
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
        <h1>TrybeTunes 🎵</h1>
        <main>
          <Switch>
            <Route exact path="/" component={ Login }>
              {isLoaded
                ? (<Redirect to="/search" />)
                : <Login
                    isLoading={ isLoading }
                    onLoginButtonClick={ this.onLoginButtonClick }
                  />}
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
