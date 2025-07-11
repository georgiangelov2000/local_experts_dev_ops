export const initialState = {
    activeTab: 'profile',
}

export function userProfileReducer(state, action) {
    switch (action.type) {
        case 'SET_ACTIVE_TAB':
            return { ...state, activeTab: action.payload };

        default:
            return state;
    }
}
