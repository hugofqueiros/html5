/**
 * Created by hugo.queiros on 01/06/16.
 */

// Container.js - the file that defines the container of the route itself

import React, { PropTypes as T } from 'react'
import Map, {GoogleApiWrapper} from 'google-maps-react';

import {searchNearby} from 'utils/googleApiHelpers'

import Header from 'components/Header/Header';
import Sidebar from 'components/Sidebar/Sidebar';

import styles from './styles.module.css';

export class Container extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            places: [],
            pagination: null,
            location: {
                lat: 40.43807216375375,
                lng: -3.6795366500000455
            },
            initialCenter: {
                lat: 40.43807216375375,
                lng: -3.6795366500000455
            },
            center: {
                lat: 40.43807216375375,
                lng: -3.6795366500000455
            }
        }
    }

    // When the map is ready and mounted
    onReady(mapProps, map) {
        const {google} = this.props;

        const opts = {
            //location: map.center,
            location: {
                lat: 40.43807216375375,
                lng: -3.6795366500000455
            },
            initialCenter: {
                lat: 40.43807216375375,
                lng: -3.6795366500000455
            },
            radius: '500',
            types: ['cafe']
        };

        searchNearby(google, map, opts)
            .then((results, pagination) => {
                this.setState({
                    places: results,
                    pagination
                })
            })
            .catch((status) => {
                console.log('error fetching nearby', status)
            })
    }

    onMapMove() {}

    onMarkerClick(item) {
        const {push} = this.context.router;
        const {place} = item;
        push(`/map/detail/${place.place_id}`)
    }

    render() {
        let children = null;
        if (this.props.children) {
            children = React.cloneElement(this.props.children, {
                google: this.props.google,
                places: this.state.places,
                loaded: this.props.loaded,
                router: this.context.router,
                onMove: this.onMapMove.bind(this),
                onMarkerClick: this.onMarkerClick.bind(this),
                zoom: this.props.zoom
            })
        }

        return (
            <Map
                google={this.props.google}
                onReady={this.onReady.bind(this)}
                visible={false}
                className={styles.wrapper}>
                <Header />

                <Sidebar
                    title={'Restaurants'}
                    onListItemClick={this.onMarkerClick.bind(this)}
                    places={this.state.places} />

                <div className={styles.content}>
                    {children}
                </div>

            </Map>
        )
    }
}

//export default Container;

/*
Container.contextTypes = {
    router: React.PropTypes.object
};
*/

Container.contextTypes = {
    router: T.object
};


//__GAPI_KEY__
export default GoogleApiWrapper({
    apiKey: __GAPI_KEY__,
    version: '3.24'
})(Container);


/*<Map
 google={this.props.google} />*/

/*export default GoogleApiWrapper({
 apiKey: 'AIzaSyD7_56swk0dn8bblgn1zvYEMjf9G04kumA'
 })(Container)*/
