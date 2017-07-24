import {h, Component} from 'preact';

import style from './style.less';

export default class Stars extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        const { value } = this.props;

        const stars = () => {
            let temp = [];

            for (let i = 0; i < 5; i++) {
                let x = <img src={`./assets/icons/star-${(i < value) ? 'on' : 'off'}.svg`} />
                temp.push(x);
            }
            return temp;
        };

        return (
            <div class={style.Stars}>
                {stars()}
            </div>
        );
    }
}
