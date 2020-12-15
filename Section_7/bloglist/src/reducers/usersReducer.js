import userService from '../services/users'

const reducer = (state = null, action) => {
    switch (action.type) {
        case 'GET_USERS':
            return state = action.data

        default:
            return state
    }
}

export const getUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({
            type: 'GET_USERS',
            data: users
        })
    }
}

export default reducer