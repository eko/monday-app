import React, { createContext, useContext, useReducer } from 'react';
import { Projects } from '../panes'
import { STATE_CHANGE_PANE, STATE_CHANGE_PROJECT } from './types'

export const StateContext = createContext();

const initialState = {
    pane: <Projects />,
    project: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case STATE_CHANGE_PANE:
            return {
                ...state,
                pane: action.pane
            };

        case STATE_CHANGE_PROJECT:
            return {
                ...state,
                pane: action.pane,
                project: action.project
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
