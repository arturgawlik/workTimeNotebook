import * as workTimeNoteStore from './workTimeNote';
import { ActionReducerMap } from '@ngrx/store';


export interface AppState {
    workTimeNotes: workTimeNoteStore.WorkTimeNote[]
}

export const initialState: AppState = {
    workTimeNotes: workTimeNoteStore.initialState
}

export const reducers: ActionReducerMap<AppState> = {
    workTimeNotes: workTimeNoteStore.reducer
}

export const effects: Array<any> = [
    workTimeNoteStore.WorkTimeNoteEffects
];
