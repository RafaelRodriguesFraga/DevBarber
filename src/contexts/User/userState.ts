import react from "react";
import { User } from "../../models/user";

export interface UserState {
    user: User | undefined;
}

export const USER_INITIAL_STATE: UserState = {
    user: undefined
}