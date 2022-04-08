import React, { useContext , createContext, useReducer } from 'react';

const UserContext = createContext();

const user = { foundUser: null , encodedToken : null };

const UserProvider = ({children}) => {

    const userStateUpdater = (state, action) => {
        switch(action.type) {
            case 'LOGIN': 
                return { ...state, ...action.payload };
            case 'LOGOUT':
                return { ...state , ...user };
            case 'ADDTOHISTORY': 
                return { ...state, foundUser : action.payload };
            case 'REMOVEFROMHISTORY': 
                return { ...state, foundUser : action.payload };
            case 'CLEARHISTORY': 
                return { ...state, foundUser : action.payload };
            case 'ADDTOLIKES': 
                return { ...state, foundUser : action.payload };
            case 'REMOVEFROMLIKES': 
                return { ...state, foundUser : action.payload };
            case 'ADDTOWATCHLATER': 
                return { ...state, foundUser : action.payload };
            case 'REMOVEFROMWATCHLATER': 
                return { ...state, foundUser : action.payload };
            case 'ADDPLAYLIST': 
                return { ...state, foundUser : action.payload };
            case 'REMOVEPLAYLIST': 
                return { ...state, foundUser : action.payload };
            case 'ADDVIDEOTOPLAYLIST': 
                return { ...state, foundUser : action.payload };
            case 'REMOVEVIDEOFROMPLAYLIST': 
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
