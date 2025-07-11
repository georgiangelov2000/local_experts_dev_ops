export const initialState = {
    provider: null,
    related: [],
    loading: true,
    activeTab: 'Profile',
    showContact: false,
  };
  
  export function providerReducer(state, action) {
    switch (action.type) {
      case 'SET_LOADING':
        return { ...state, loading: action.payload };
      case 'SET_PROVIDER':
        return { ...state, provider: action.payload };
      case 'SET_RELATED':
        return { ...state, related: action.payload };
      case 'SET_ACTIVE_TAB':
        return { ...state, activeTab: action.payload };
      case 'TOGGLE_CONTACT':
        return { ...state, showContact: !state.showContact };
      default:
        return state;
    }
  }
  