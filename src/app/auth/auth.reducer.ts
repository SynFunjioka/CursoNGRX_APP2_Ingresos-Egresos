import { Action, createReducer, on } from '@ngrx/store';
import { UserDoc } from '../models/user.model';
import * as authActions from './auth.actions';

export interface State{
  user: UserDoc | null;
}

export const initialState:State = {
  user: null
};


const _authReducer = createReducer(
  initialState,
  on(authActions.setUser, (state, {user}) => ({...state, user: {...user}} )),
  on(authActions.unsetUser, (state) => ({...state, user: null})),
);


export function authReducer(state: any, action: Action) {
  return _authReducer(state, action);
}
