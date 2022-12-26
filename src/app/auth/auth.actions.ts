import { createAction, props } from '@ngrx/store';
import { UserDoc } from '../models/user.model';

export const setUser = createAction(
  '[Auth] Set user',
  props<{user: UserDoc}>()
);

export const unsetUser = createAction(
  '[Auth] Unset user');
