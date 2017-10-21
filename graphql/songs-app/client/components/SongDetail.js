import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
    render() {
        console.log(this.props);
        const {song} = this.props.data;

        if (!song) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <Link to="/">Back</Link>
                <h3>{song.title}</h3>
                <span>{song.id}</span>
                <LyricList lyrics={song.lyrics} />
                <LyricCreate songId={this.props.params.id} />
            </div>
        );
    }
}
// to integrate the named query, PROPS go to the graphql help and pass them after to the SongDetail
// it's a normal pattern
export default graphql(fetchSong, {
    options: (props) => {
        return {
            variables: { id: props.params.id } // params.id comes from react router 
        }
    }
})(SongDetail);