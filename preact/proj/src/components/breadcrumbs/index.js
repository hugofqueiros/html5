import { h } from 'preact';
import style from './style';

export const Breadcrumbs = ({ breadcrumbs = [] }) => (
    <ol class={style.breadcrumbs}>
        { breadcrumbs.map(crumb => (
            <li class={style.crumb}>
                <a href={crumb.url} class={style.crumbLink}>
                    { crumb.name }
                </a>
            </li>
        )) }
    </ol>
);
