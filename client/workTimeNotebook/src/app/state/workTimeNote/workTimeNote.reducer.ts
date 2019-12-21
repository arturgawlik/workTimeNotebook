import * as actions from './workTimeNote.actions';
import { COMPLETE_INIT_WORK_TIME_NOTE, COMPLETE_ADD_WORK_TIME_NOTE, ERROR_ADD_WORK_TIME_NOTE } from './workTimeNote.actions';
import { WorkTimeNote } from './workTimeNote.state';



export function reducer(state: WorkTimeNote, action: actions.WorkTimeNoteAction): any {
    switch (action.type) {
        case COMPLETE_INIT_WORK_TIME_NOTE: {
            state.items = action.payload;
            return {
                ...state
            }
        }
        case COMPLETE_ADD_WORK_TIME_NOTE: {
            return {
                items: [...state.items, action.payload],
                notyfication: { type: 'success', message: 'Item sucessfull saved.' }
            }
        }
        case ERROR_ADD_WORK_TIME_NOTE: {
            return {
                ...state,
                notyfication: { type: 'danger', message: 'Error saving item.' }
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}
