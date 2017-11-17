export const FETCH_USERS = 'fetch_users';

// whenever you are using async awai, babel assumes that there is something
// called a regenerator runtime defined inside of the working environment
// arguments from thunk (we added axios, so the last arg is actually an axios instance)
// you can only use this axios instance (api) to call our own api, you can't used it to call for example, instagram api, you would have to import the axios and make it normally
export const fetchUsers = () => async (dispatch, getState, api) => {
    //const res = await axios.get('http://react-ssr-api.herokuapp.com-users)
    const res = await api.get('/users');

    dispatch({
        type: FETCH_USERS,
        payload: res
    });
};

export const FETCH_CURRENT_USER = 'fetch_current_user';
// dispatch, getState, axios
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
    const res = await api.get('/current_user');

    dispatch({
        type: FETCH_CURRENT_USER,
        payload: res
    });
};

export const FETCH_ADMINS = 'fetch_admins';
export const fetchAdmins = () => async (dispatch, getState, api) => {
    const res = await api.get('/admins');

    dispatch({
        type: FETCH_ADMINS,
        payload: res
    });
};
