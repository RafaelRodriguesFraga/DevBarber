import { ReactNode } from 'react';
import { UserState } from './userState';
import {UserTypes} from './userTypes';

type UserAction = {
    type: UserTypes;
    payload: any;    
}

export const UserReducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case UserTypes.SET_AVATAR:
      return {...state, avatar: action.payload.avatar};
      
    default:
      return state;
  }
};
