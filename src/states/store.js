import React, {createContext, useReducer} from "react";
import Reducer from './reducer'


const initialState = {
    files: null,
    sodium: null,
    key: null,
    encryptedData: [],
    options: null,
    settings: null,
    stage: 1,
    error: null
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;