export const initialState = {
    activeTab: 'basic',
}

export function userProfileReducer(state, action) {
    switch (action.type) {
        case 'SET_ACTIVE_TAB':
            return { ...state, activeTab: action.payload };

        default:
            return state;
    }
}
