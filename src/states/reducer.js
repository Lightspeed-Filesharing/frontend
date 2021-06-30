const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_FILES":
      return {
        ...state,
        files: action.payload,
      };
    case "SET_KEY":
      return {
        ...state,
        key: action.payload,
      };
    case "SET_SODIUM":
      return {
        ...state,
        sodium: action.payload,
      };
    case "SET_ENCRYPTEDDATA":
      return {
        ...state,
        encryptedData: action.payload,
      };
    case "SET_STAGE":
      return {
        ...state,
        stage: action.payload,
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };
    case "SET_SALT":
      return {
        ...state,
        salt: action.payload,
      };
    case "SET_RESPONSE":
      return {
        ...state,
        response: action.payload,
      };
    case "SET_MESSAGE":
      return {
        ...state,
        message: action.payload,
      };
      case "SET_LONGLINK":
        return {
          ...state,
          longLink: action.payload,
        };
    case "SET_DELETEONOPEN":
        return {
            ...state,
            deleteOnOpen: action.payload,
        };
    case "SET_LIMITDOWNLOADS":
        return {
            ...state,
            limitDownloads: action.payload,
        };
    default:
      return state;
  }
};

export default Reducer;
