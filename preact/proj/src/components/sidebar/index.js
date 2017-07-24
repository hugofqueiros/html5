import {h, Component} from 'preact';
import {Link} from 'preact-router/match';

import SidebarItem from './SidebarItem';

import style from './style';

export default class Sidebar extends Component {
    render() {
        return (
            <aside className={style.Sidebar}>
                <ul>
                    <SidebarItem />
                    <SidebarItem />
                </ul>
            </aside>
        );
    }
}
