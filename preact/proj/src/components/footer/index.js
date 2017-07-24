import { h, Component } from 'preact';
import style from './style';

export default class Footer extends Component {
    render() {
        return (
            <div class={style.Footer}>
                <p>© 2017 Hugo Queiros - All rights reserved.</p>
            </div>
        )
    }
};
