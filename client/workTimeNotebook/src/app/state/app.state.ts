import * as workTimeNoteStore from './workTimeNote';
import { ActionReducerMap } from '@ngrx/store';


export interface AppState {
    workTimeNote: workTimeNoteStore.WorkTimeNote
}

export const initialState: AppState = {
    workTimeNote: workTimeNoteStore.initialState
}

export const reducers: ActionReducerMap<AppState> = {
    workTimeNote: workTimeNoteStore.reducer
}

export const effects: Array<any> = [
    workTimeNoteStore.WorkTimeNoteEffects
];

export const getNotyfication = (s: AppState) => s.workTimeNote.notyfication;
export const getItems = (s: AppState) => s.workTimeNote.items;
