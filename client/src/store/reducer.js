const initialState = {
    user: {},
    roster: [],
    jobs: []
}

const reducer = (state=initialState, action) => {
    if(action.type === 'SET_USER') {
        return {
            ...state,
            user: action.user
        }
    } else if(action.type === 'SET_COURIER_ROSTER') {
        return {
            ...state,
            roster: action.roster
        }
    } else if(action.type === 'SET_JOBS') {
        return {
            ...state,
            jobs: action.jobs
        }
    }
    return state
}

export default reducer