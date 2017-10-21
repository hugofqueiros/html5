import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricList extends Component {
    onLike(id, likes) {
        console.log(id);
        this.props.mutate({
            variables: {id},
            // guess response even before you get the reply from the backend so ui updates instantly, and doesn't have to wait for the backend response
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id,
                    __typename: 'LyricTyoe',
                    likes: likes + 1
                }
            }
        })
    }

    renderLyrics() {
        return this.props.lyrics.map(({id, content, likes}) => {
            return (
                <li key={id} className="collection-item">
                    {content}

                    <div className="vote-box">
                        <i className="material-icons" onClick={() => this.onLike(id, likes)}>thumb_up</i>
                        {likes}
                    </div>
                </li>
            )
        })
    }

    render() {
        return (
            <ul className="collection">
                {this.renderLyrics()}
            </ul>
        );
    }
}

const mutation = gql`
mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);