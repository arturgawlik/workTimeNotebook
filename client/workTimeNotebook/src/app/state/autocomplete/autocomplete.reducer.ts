import * as actions from './autocomplete.actions';
import { Autocomplete } from './autocomplete.state';


export function reducer(state: Autocomplete, action: actions.AutocompleteAction): any {
    switch (action.type) {
        case actions.SET_AUTOCOMPLETE_TYPES: {
            return {
                ...state,
                types: action.payload
            }
        }
        case actions.SET_AUTOCOMPLETE_CUSTOMERS: {
            return {
                ...state,
                customers: action.payload
            }
        }
        case actions.SET_AUTOCOMPLETE_DESCRIPTIONS: {
            return {
                ...state,
                descriptions: action.payload
            }
        }
        case actions.SET_AUTOCOMPLETE_URLS: {
            return {
                ...state,
                urls: action.payload
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}
