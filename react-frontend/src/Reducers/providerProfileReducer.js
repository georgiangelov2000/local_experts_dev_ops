export const initialState = {
    activeTab: 'basic',
}

export function providerProfileReducer(state, action) {
    switch (action.type) {
        case 'SET_ACTIVE_TAB':
            return { ...state, activeTab: action.payload };

        default:
            return state;
    }
}
