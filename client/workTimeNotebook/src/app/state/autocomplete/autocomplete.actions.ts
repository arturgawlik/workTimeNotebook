import { Action } from '@ngrx/store';

export const SET_AUTOCOMPLETE = 'Set Autocomplete';

export class SetAutocomplete implements Action {
    readonly type: string = SET_AUTOCOMPLETE;

    constructor(public payload: any) {
    }
}

export type AutocompleteAction = SetAutocomplete;
