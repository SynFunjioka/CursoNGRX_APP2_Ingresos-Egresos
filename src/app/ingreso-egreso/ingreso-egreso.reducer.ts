import { Action, createReducer, on } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { setItems, unsetItems } from './ingreso-egreso.actions';

export interface AppStateWithIngreso extends AppState{
  ingresosEgresos: State
}

export interface State{
  items: IngresoEgreso[];
}

export const initialState: State = {
  items: []
};


const _ingresoEgresoReducer = createReducer(
  initialState,
  on(setItems, (state, {items}) => ({...state, items: [...items]})),
  on(unsetItems, (state) => ({...state, items: []})),
);


export function ingresoEgresoReducer(state: any, action: Action) {
  return _ingresoEgresoReducer(state, action);
}
