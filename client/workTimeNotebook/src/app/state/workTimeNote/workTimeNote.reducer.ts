import * as actions from './workTimeNote.actions';
import { COMPLETE_INIT_WORK_TIME_NOTE } from './workTimeNote.actions';



export function reducer(state: any, action: actions.WorkTimeNoteAction): any {
    switch(action.type) {
        case COMPLETE_INIT_WORK_TIME_NOTE: {
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
