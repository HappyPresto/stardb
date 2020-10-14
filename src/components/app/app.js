import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import './app.css';
import SwapiService from '../../services/swapi-service';
import { SwapiServiceProvider } from '../swapi-service-context';

import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { StarshipDetails } from '../sw-components';

export default class App extends Component {
  swapiService = new SwapiService();

  state = {

  };

  render () {
    return (
      <SwapiServiceProvider value={this.swapiService} >
        <Router>
          <div className="stardb-app">
            <Header />

            <RandomPlanet/>
            <br />
            <Route path="/" 
              render={() => <h2>Welcome to StarDB</h2>} 
              exact
            />
            <Route path="/people/:id?" component={PeoplePage} />
            <Route path="/planets" component={PlanetsPage} />
            <Route path="/starships" exact component={StarshipsPage} />
            <Route path="/starships/:id" 
                  render={({match, location, history}) => {
                    const {id} = match.params;
                    return <StarshipDetails itemId={id} />
                    } 
                  }
            />
          </div>
        </Router>
      </SwapiServiceProvider>
    );
  }
};