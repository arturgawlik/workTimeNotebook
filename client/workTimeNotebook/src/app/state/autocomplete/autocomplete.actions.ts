import { Action } from '@ngrx/store';

export const SET_AUTOCOMPLETE_TYPES = 'Set Autocomplete Types';
export const SET_AUTOCOMPLETE_CUSTOMERS = 'Set Autocomplete Customers';
export const SET_AUTOCOMPLETE_DESCRIPTIONS = 'Set Autocomplete Descriptions';
export const SET_AUTOCOMPLETE_URLS = 'Set Autocomplete Urls';

export class SetAutocompleteTypes implements Action {
    readonly type: string = SET_AUTOCOMPLETE_TYPES;

    constructor(public payload: any) {
    }
}

export class SetAutocompleteCustomers implements Action {
    readonly type: string = SET_AUTOCOMPLETE_CUSTOMERS;

    constructor(public payload: any) {
    }
}

export class SetAutocompleteDescriptions implements Action {
    readonly type: string = SET_AUTOCOMPLETE_DESCRIPTIONS;

    constructor(public payload: any) {
    }
}

export class SetAutocompleteUrls implements Action {
    readonly type: string = SET_AUTOCOMPLETE_URLS;

    constructor(public payload: any) {
    }
}

export type AutocompleteAction = SetAutocompleteTypes
                                | SetAutocompleteCustomers
                                | SetAutocompleteDescriptions
                                | SetAutocompleteUrls;
