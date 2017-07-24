import {h, Component} from 'preact';
import {Link} from 'preact-router/match';
import style from './SidebarItem';

export default class SidebarItem extends Component {
    render() {
        return (
            <li className="SidebarItem">Item</li>
        );
    }
}
