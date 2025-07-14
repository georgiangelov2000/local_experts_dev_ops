export const initialServiceState = {
    categories: [],
    cities: [],
    providers: [],
    pagination: {},
    loading: true,
    viewMode: 'grid',
    serviceCategories: [],
    likes: [],
    dislikes: [],
    favourites: [],
    sortOptions: [
        { value: 'promoted', label: 'Promoted First' },
        { value: 'reviews_desc', label: 'Reviews: High to Low' },
        { value: 'reviews_asc', label: 'Reviews: Low to High' },
        { value: 'views_desc', label: 'Views: High to Low' },
        { value: 'views_asc', label: 'Views: Low to High' },
        { value: 'likes_desc', label: 'Likes: High to Low' },
        { value: 'likes_asc', label: 'Likes: Low to High' }
    ],
    filters: {
        city_alias: "",
        category_alias: "",
        service_category_alias: "",
        term: "",
        sort: ""
    },
    filtered: [],
    appliedFilters: {}
};


export function serviceReducer(state, action) {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true };

        case 'FETCH_SUCCESS':
            return {
                ...state,
                categories: action.payload.categories,
                cities: action.payload.cities,
                providers: action.payload.providers,
                pagination: action.payload.pagination,
                serviceCategories: action.payload.serviceCategories,
                filtered: action.payload.filtered,
                filters: {
                    ...action.payload.filters,
                    ...action.payload.paramsObj
                },
                viewMode: action.payload.viewMode,
                loading: false
            };

        case 'FETCH_ERROR':
            return { ...state, loading: false };

        case 'SET_USER_ACTIONS':
            return {
                ...state,
                likes: action.payload.likes || [],
                dislikes: action.payload.dislikes || [],
                favourites: action.payload.favourites || []
            };
        case 'UPDATE_FILTER':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...action.payload
                }
            };
        case "CLEAR_FILTERS":
            return {
                ...state,
                filters: {
                    city_alias: "",
                    category_alias: "",
                    service_category_alias: "",
                    term: "",
                    sort: ""
                },
                appliedFilters: {}
            };
        case 'APPLY_FILTERS':
            return {
                ...state,
                appliedFilters: { ...state.filters }
            };
        case 'SET_FAVOURITES':
            return {
                ...state,
                favourites: action.payload.favourites,
            };
        case 'TOGGLE_FAVOURITE': {
            const id = action.payload.id;
            const isFav = state.favourites.includes(id);
            return {
                ...state,
                favourites: isFav
                    ? state.favourites.filter(favId => favId !== id)
                    : [...state.favourites, id],
            };
        }
        default:
            return state;
    }
}