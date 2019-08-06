import React, { createContext, useContext, useReducer } from 'react';
import { Projects } from '../panes'

export const StateContext = createContext();

const initialState = {
    pane: <Projects />,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'changePane':
            return {
                ...state,
                pane: action.newPane
            };

        default:
            return state;
    }
}

export const StateProvider = ({ children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
