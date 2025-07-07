export const initialServiceState = {
    categories: [],
    cities: [],
    providers: [],
    pagination: {},
    loading: true,
    viewMode: 'grid',
    serviceCategories: [],
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
                filters: action.payload.filters,
                viewMode: action.payload.viewMode,
                loading: false
            };

        case 'FETCH_ERROR':
            return { ...state, loading: false };

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

        default:
            return state;
    }
}