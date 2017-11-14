import React from 'react';
import App from './App';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminsListPage from './pages/AdminsListPage';
// import UsersListPage, { loadData} from './pages/UsersListPage';

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true
      },
      {
        ...AdminsListPage,
        path: '/admins'
      },
      {
          // component: UsersListPage
          // loadData
        ...UsersListPage,
        path: '/users'
      },
      {
        ...NotFoundPage
      }
    ]
  }
];

// import { Route } from 'react-router-dom';
// import Home from './components/Home';

// export default () => {
//     return (
//         <div>
//             <Route exact path="/" component={Home} />
//         </div>
//     )
// }
