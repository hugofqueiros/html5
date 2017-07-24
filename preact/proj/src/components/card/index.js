import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import style from './style';

export default class Card extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, children } = this.props;

        return (
            <section class={style.Card}>
                <h2>{title}</h2>
                {children}
            </section>
        );
    }
}

Card.PropTypes = {
    title: PropTypes.string
};

