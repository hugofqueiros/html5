import { h, Component } from 'preact';
import style from './style';

export default class Container extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        const {children} = this.props;

        return (
            <section class={style.Container}>
                {children}
            </section>
        )
    }
}
