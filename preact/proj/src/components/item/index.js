import {h, Component} from 'preact';
import Stars from '../stars';

import style from './style.less';

export default class Item extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        const { imageUrl, title, description, rating, price } = this.props;

        return (
            <div class={style.Item}>
                <div class={style.Item__image}>
                    <img src={imageUrl} />
                </div>
                <div class={style.Item__body}>
                    <div class={style.Item__title}>
                        {title}
                    </div>
                    <div class={style.Item__rating}>
                        <Stars value={rating} />
                    </div>
                    <div class={style.Item__description}>
                        <em>{description}</em>
                    </div>
                    <div class={style.Item__price}>
                        {price}
                    </div>
                    <div class={style.Item__details}>
                        View more details
                    </div>
                </div>
            </div>
        );
    }
}
