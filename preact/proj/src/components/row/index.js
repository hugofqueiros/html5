import {h, Component} from 'preact';
import style from './style.less';

export default class Row extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { children } = this.props;

        return (
            <div class={style.Row}>
                {children}
            </div>
        );
    }
}
