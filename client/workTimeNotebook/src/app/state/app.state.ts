import * as workTimeNoteStore from './workTimeNote';
import * as autocompleteStore from './autocomplete';
import { ActionReducerMap } from '@ngrx/store';


export interface AppState {
    workTimeNote: workTimeNoteStore.WorkTimeNote,
    autocomplete: autocompleteStore.AutoComplete
}

export const initialState: AppState = {
    workTimeNote: workTimeNoteStore.initialState,
    autocomplete: autocompleteStore.initialState
}

export const reducers: ActionReducerMap<AppState> = {
    workTimeNote: workTimeNoteStore.reducer,
    autocomplete:autocompleteStore.reducer
}

export const effects: Array<any> = [
    workTimeNoteStore.WorkTimeNoteEffects
];

export const getNotyfication = (s: AppState) => s.workTimeNote.notyfication;
export const getItems = (s: AppState) => s.workTimeNote.items;
export const getAutocompleteTypes = (s: AppState) => s.autocomplete.types;
export const getAutocompleteCustomers = (s: AppState) => s.autocomplete.customers;
export const getAutocompleteDescriptions = (s: AppState) => s.autocomplete.descriptions;
export const getAutocompleteUrls = (s: AppState) => s.autocomplete.urls;
