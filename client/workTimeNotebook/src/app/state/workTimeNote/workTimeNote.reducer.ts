import * as actions from './workTimeNote.actions';
import { COMPLETE_INIT_WORK_TIME_NOTE, COMPLETE_ADD_WORK_TIME_NOTE } from './workTimeNote.actions';
import { WorkTimeNote } from './workTimeNote.state';



export function reducer(state: WorkTimeNote, action: actions.WorkTimeNoteAction): any {
    switch(action.type) {
        case COMPLETE_INIT_WORK_TIME_NOTE: {
            state.items = action.payload;
            return {
                ...state
            }
        }
        case COMPLETE_ADD_WORK_TIME_NOTE: {
            state.items.push(action.payload);
            return {
                ...state
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}
