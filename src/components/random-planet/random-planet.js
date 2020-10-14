import React, { Component } from 'react';
import propTypes from 'prop-types';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/';

import './random-planet.css';
import ErrorIndicator from '../error-indicator';

export default class RandomPlanet extends Component {

  SwapiService = new SwapiService();
  static propTypes = {
    updateInterval: propTypes.number
  }
  static defaultProps = {
    updateInterval: 10000
  }
  
  state = {
    planet: {},
    loading: true,
    error: false,
    interval: null,
  };

  componentDidMount() {
    const { updateInterval } = this.props;
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({planet, loading: false})
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  }

  updatePlanet = () => {
    const id = Math.floor(Math.random()*25) + 2 ;
    this.SwapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  };

  render() {
    const {planet, loading, error} = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator/> : null
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet}/> : null;


    return (
      <div className="random-planet jumbtron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    )
  }
}

const PlanetView = ({planet}) => {
  const {id, population, rotationPeriod, diameter, name} = planet;

  return (
    <>
      <img className="planet-image"
            alt="planet"
            src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diametr</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </>
  )
}

