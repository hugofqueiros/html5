import { h, Component } from 'preact';
import style from './style';

export default class Banner extends Component {
    render() {
        return (
            <div class={style.Banner}>
                <div class={style.Banner__body}>
                    <h1 class={style.Banner__title}>
                        Beach
                    </h1>
                    <h2 class={style.Banner__subtitle}>
                        The best beach in the world
                    </h2>
                </div>
                <img src="./assets/images/banner-image.jpg" />
            </div>
        );
    }
}
