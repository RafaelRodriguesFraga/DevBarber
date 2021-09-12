import React, {createContext, ReactNode, useReducer} from "react";
import {UserReducer} from "./userReducer";
import { UserState, USER_INITIAL_STATE } from "./userState";

type UserProps = {
    children: ReactNode;
}

let initialState = USER_INITIAL_STATE;

export const UserContext = createContext({} as any);

export const UserProvider =  ({children}: UserProps) => {
    const [state, dispatch] = useReducer(UserReducer, initialState);

    return(
        <UserContext.Provider value={{state, dispatch}}>
        {children}
    </UserContext.Provider>
    )
   
}

