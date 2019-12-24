import * as actions from './autocomplete.actions';
import { Autocomplete } from './autocomplete.state';


export function reducer(state: Autocomplete, action: actions.AutocompleteAction): any {
    switch (action.type) {
        case actions.SET_AUTOCOMPLETE: {
            return {
                ...action.payload
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}
