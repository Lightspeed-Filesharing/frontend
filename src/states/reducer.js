
const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_FILES':
            return {
                ...state,
                files: action.payload
            };
        case 'SET_KEY':
            return {
                ...state,
                key: action.payload
            };
        case 'SET_SODIUM':
            return {
                ...state,
                sodium: action.payload
            };
        case 'SET_ENCRYPTEDDATA':
            return {
                ...state,
                encryptedData: action.payload
            };
        case 'SET_OPTIONS':
            return {
                ...state,
                settings: action.payload
            };
        case 'SET_STAGE':
            return {
                ...state,
                stage: action.payload
            }
        default:
            return state;
    }
};

export default Reducer;
