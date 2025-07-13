export const initialState = {
  provider: null,
  related: [],
  relatedCount: 0,
  reviews: {
    data: [],
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0
  },
  loading: true,
  reviewsLoading: false,
  reviewsError: null,
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
    
    case 'SET_RELATED_COUNT':
      return { ...state, relatedCount: action.payload };
    
    case 'SET_REVIEWS':
      return { ...state, reviews: action.payload };
    
    case 'SET_REVIEWS_LOADING':
      return { ...state, reviewsLoading: action.payload };
    
    case 'SET_REVIEWS_ERROR':
      return { ...state, reviewsError: action.payload };
    
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    
    case 'TOGGLE_CONTACT':
      return { ...state, showContact: !state.showContact };
    
    case 'RESET_REVIEWS_STATE':
      return {
        ...state,
        reviewsLoading: false,
        reviewsError: null
      };
    
    default:
      return state;
  }
}
  