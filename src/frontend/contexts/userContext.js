import React, { useContext , createContext, useReducer } from 'react';

const UserContext = createContext();

const user = { foundUser: null , encodedToken : null };

const UserProvider = ({children}) => {

    const userStateUpdater = (state, action) => {
        switch(action.type) {
            case 'LOG_IN': 
                return { ...state, ...action.payload };
            case 'LOG_OUT':
                return { ...state , ...user };
            case 'ADD_TO_HISTORY': 
            case 'REMOVE_FROM_HISTORY': 
            case 'CLEAR_HISTORY': 
            case 'ADD_TO_LIKES': 
            case 'REMOVE_FROM_LIKES': 
            case 'ADD_TO_WATCH_LATER': 
            case 'REMOVE_FROM_WATCH_LATER': 
            case 'ADD_PLAY_LIST': 
            case 'REMOVE_PLAY_LIST': 
            case 'ADD_VIDEO_TO_PLAY_LIST': 
            case 'REMOVE_VIDEO_FROM_PLAY_LIST': 
                return { ...state, foundUser : action.payload };
            default:
                return { ...state};
        }
    }

    const [userState,userDispatcher] = useReducer(userStateUpdater,user);

    return (
        <UserContext.Provider value={{ userState , userDispatcher }}>
            { children }
        </UserContext.Provider>
    );
}

const useUser = () => useContext(UserContext);

export { useUser , UserProvider };
