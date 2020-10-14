import React, { Component } from 'react';
import ItemList from '../item-list';
//import PlanetDetails from '../planet-details';

import './planet-page.css';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import Row from '../row';

export default class PlanetPage extends Component {
    swapiService = new SwapiService();

    state = {
        selectedPlanet: 3,
        hasError: false
    }

    componentDidCatch(error, info) {
        this.setState({
            hasError: true
        })
    }

    onPlanetSelected = (id) => {
        this.setState({
            selectedPlanet: id
        });
      };

    render() {
        if (this.state.hasError) return <ErrorIndicator/>

        const itemList = (
            <ItemList 
                onItemSelected={this.onPlanetSelected}
                getData={this.swapiService.getAllPlanets}
                // renderItem={({name, gender, birthYear}) => `${name} ${gender} ${birthYear}`}
            >
                {(item) => (
                    `${item.name}`
                )}
            </ItemList>
        );
        const planetDetails = (
            <></>
            //<PlanetDetails planetId={this.state.selectedPlanet}/>
        );

        return (
            <Row left={itemList} right={planetDetails} />
        )
    }
}