import {h, Component} from 'preact';
import Container from '../../components/container'

import style from './style';

export default class Profile extends Component {
    state = {
        time: Date.now(),
        count: 10
    };

    updateTime = () => {
        this.setState({time: Date.now()});
    };

    increment = () => {
        this.setState({count: this.state.count + 1});
    };

    componentDidMount() {
        this.timer = setInterval(this.updateTime, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render({user}, {time, count}) {
        return (
            <Container>
                <div class={style.profile}>
                    <h1>Profile: {user}</h1>
                    <p>This is the user profile for a user named {user}.</p>

                    <div>Current time: {new Date(time).toLocaleString()}</div>

                    <p>
                        <button onClick={this.increment}>Click Me</button>
                        {' '}
                        Clicked {count} times.
                    </p>
                </div>
            </Container>
        );
    }
}
